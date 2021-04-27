<template>
    <div class="add-ingredient">
        <b-card-group deck>
            <b-card>
                <b-form-input type="text" placeholder="Search ingredients..." v-model="searchText"></b-form-input>
                    <b-tabs pills card vertical id="category-menu">
                        <b-tab title="All Categories" active>
                            <b-row cols="2">
                                <b-col v-for="(ingredient, idx) in searchedIngredients" :key="idx" class="mb-3">
                                    <b-input-group>
                                        <b-form-input :value="ingredient" disabled></b-form-input>
                                        <template #append>
                                            <b-button
                                                variant="outline-success"
                                                v-b-tooltip.hover title="Add 0.5 kg/time"
                                                @click="add(ingredient)"
                                            >
                                                <b-icon icon="plus-circle"></b-icon>
                                            </b-button>
                                            <b-button 
                                                variant="outline-danger" 
                                                v-b-tooltip.hover title="Reduce 0.5 kg/time"
                                                :disabled="disableReduce(ingredient)"
                                                @click="reduce(ingredient)"
                                            >
                                                <b-icon icon="dash-circle"></b-icon>
                                            </b-button>
                                        </template>
                                    </b-input-group>
                                </b-col>
                            </b-row>
                        </b-tab>
                        <b-tab v-for="category in categories" :key="category.id" :title="category.category_name">
                            <Ingredient :categoryId="category.id" :addedIngredients="addedIngredients" :searchedIngredients="searchedIngredients"/>
                        </b-tab>
                    </b-tabs>
                    <b-button id="submit-plan" variant="outline-danger" @click="submitPlan">Submit Store Plan</b-button>
                    <!-- No ingredients alert -->
                    <b-alert
                        :show="dismissCountDown"
                        dismissible
                        variant="danger"
                        @dismissed="dismissCountDown=0"
                        @dismiss-count-down="countDownChanged"
                        style="margin-bottom:55px"
                    >
                    <h4 style="text-align: center;">You did not add any ingredients!</h4>
                        <b-progress
                            variant="warning"
                            :max="dismissSecs"
                            :value="dismissCountDown"
                            height="4px"
                        ></b-progress>
                    </b-alert>
                    <b-button id="dot" variant="outline-success" v-b-modal=modalName>
                        <b-icon style="width:30px;height:30px" icon="cart-check"></b-icon>
                    </b-button>
            </b-card>
        </b-card-group>
        <!-- shopping card modal -->
        <b-modal :id="modalName" ref="modal" title="You have added the following ingredients:" hide-footer>
            <b-row cols="2">
                <b-col v-for="(unit, ingredient) in cartIngredient" :key="ingredient" class="mb-3">
                    <b-input-group v-if="unit !== 0">
                        <b-form-input :value="compute(unit, ingredient)" disabled></b-form-input>
                    </b-input-group>
                </b-col>
            </b-row>
            <b-button variant="outline-info" class="mt-3" block @click="$bvModal.hide(modalName)">OK</b-button>
        </b-modal>
    </div>
</template>

<script>
import { db } from '@/firebaseConfig'
import Ingredient from './Ingredient'

export default {
    components: { Ingredient },
    name: 'addIngredient',
    props: ['planId', 'storeName'],
    data() {
        return {
            categories: [],
            plan:[],
            dismissSecs: 5,
            dismissCountDown: 0,
            cartIngredient: '',
            searchText: '',
        }
    },
    firestore() {
        return {
            categories: db.collection('categories').orderBy('category_name'),
            plan: db.collection('plans').doc(this.planId)
        }
    },
    computed: {
        ingredients() {
            return [].concat.apply([], this.categories.map(el => el.ingredients))
        },
        addedIngredients() {
            const addedIngredients = {}
            this.ingredients.forEach(el=> addedIngredients[el]=0)
            return addedIngredients
        },
        searchedIngredients() {
            return this.ingredients.filter(el => 
                el.toLowerCase().includes(this.searchText.toLowerCase())
            )
        },
        modalName() {
            return this.storeName + '-shopping-cart-modal'
        }
    },
    watch: {
        addedIngredients: function(val) {
            this.cartIngredient = val
        }
    },
    methods: {
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        compute(unit, ingredient) {
            return ingredient + " * " + unit + 'kg'
        },
        add(ingredient) {
            this.addedIngredients[ingredient] += 0.5
        },
        reduce(ingredient) {
            this.addedIngredients[ingredient] -= 0.5
        },
        disableReduce(ingredient) {
            return this.addedIngredients[ingredient] === 0
        },
        submitPlan() {
            const units = Object.values(this.cartIngredient)
            const ingredients = Object.keys(this.cartIngredient)
            if (units.every(el => el === 0)) {
                this.dismissCountDown = this.dismissSecs
                return
            }
            const store = this.plan.stores[this.storeName]
            const items = store.items
            const added = Object.keys(items)
            const plan = ingredients.filter(el => {
                if (this.cartIngredient[el] !== 0) {
                    return el
                }
            })
            /**
             * update unit if planed ingredient already in store;
             * otherwise create new item
             */
            const stores = this.plan.stores
            plan.forEach(el => {
                if (added.includes(el)) {
                    stores[this.storeName].items[el]['quantity'] = this.cartIngredient[el] + items[el]['quantity']
                    db.collection('plans').doc(this.planId).update({
                        stores: stores
                    })
                } else {
                    stores[this.storeName].items[el] = {
                        quantity: this.cartIngredient[el],
                        isBought: false,
                    }
                    db.collection('plans').doc(this.planId).update({
                        stores: stores
                    })
                }
            });
            // TODO: redirect to this store plan tab
        },
    },
}
</script>

<style scoped>
.add-ingredient {
    margin: 15px;
    padding: 30px;
    border-radius: 15px;
    background-color: white;
}

#dot {
    height: 55px;
    width: 55px;
    border-radius: 50%;
    position: absolute;
    bottom: 10px;
    right: 10px;
}

#category-menu {
    padding-right: 0px;
    margin: 15px 0 55px 0px;
    padding: 8px 15px;
    border-radius: 15px;
    background-color: #bee5eb;
}

#choose-ingredient {
    margin: 15px;
    padding: 30px;
    border-radius: 15px;
    background-color:  #bee5eb;
    position: relative;
}

#submit-plan {
    position: absolute;
    bottom: 10px;
    height: 45px;
}
</style>
