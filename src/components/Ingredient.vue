<template>
    <div class="ingredient">
            <b-row cols="2">
                <b-col v-for="(ingredient, idx) in ingredients" :key="idx" class="mb-3">
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
    </div>
</template>

<script>
import { db } from '@/firebaseConfig'

export default {
    name: 'Ingredient',
    props: ['categoryId', 'addedIngredients', 'searchedIngredients'],
    data() {
        return {
            category: '',
            unit: '',
            unitState: null,
        }
    },
    firestore() {
        return {
            category: db.collection('categories').doc(this.categoryId),
        }
    },
    computed: {
        ingredients() {
            if (this.category.ingredients) {
                return this.searchedIngredients.filter(el => 
                    JSON.parse(JSON.stringify(this.category.ingredients)).includes(el)
                )
            }
            return this.category.ingredients
        },
    },
    methods: {
        add(ingredient) {
            this.addedIngredients[ingredient] += 0.5
        },
        reduce(ingredient) {
            this.addedIngredients[ingredient] -= 0.5
        },
        disableReduce(ingredient) {
            return this.addedIngredients[ingredient] === 0
        },
    },
}
</script>
