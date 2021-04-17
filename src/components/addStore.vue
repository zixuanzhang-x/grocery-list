<template>
  <div class="store" fluid="lg">
    <b-container>
      <h3 style="text-align: center;">Add a nearby grocery store</h3>
      <b-card-group deck>
        <b-card>
          <div v-if="errMsg">
            Sorry, the following error occurred: {{ errMsg }}
          </div>
          <div v-if="loadingLocation">
            We are getting your location...
          </div>
          <div v-if="!errMsg&&!loadingLocation">
            <form onsubmit="return false">
              <b-row>
                <b-col sm="6">
                  <b-form-select v-model="radius" :options="options">
                    <template #first>
                      <b-form-select-option :value="null" disabled>Select Radius</b-form-select-option>
                    </template>
                  </b-form-select>
                </b-col>
                <b-col sm="6">
                  <b-button variant="outline-primary" @click="findNearbyStore">
                    Find stores within <span style="color:red">{{radius}}km</span>
                  </b-button>
                </b-col>
              </b-row>
            </form>
            <b-row style="margin-top:16px">
              <b-col sm="6">
                <b-form-input type="text" id="autocomplete" :disabled="!displayingMap"
                  placeholder="Enter a store name"></b-form-input>
              </b-col>
              <b-col sm="6">
                <b-button variant="outline-success" @click="addStore">Add new store</b-button>
              </b-col>
            </b-row>
            <div ref="map" style="weight:600px;height:400px;margin-top:10px"></div>
          </div>
        </b-card>
      </b-card-group>
    </b-container>


  </div>
</template>

<script>
import { getNearbyStore, getCurrentPosition } from '@/utils/locatingUtil'
import { loadedGoogleMapsAPI } from '@/main'
import { db } from '@/firebaseConfig'

export default {
  name: 'addStore',
  props: ['planId'],
  data() {
    return {
      errMsg: null,
      storeName: null,
      storeVicinity: null,
      loadingLocation: false,
      displayingMap: false,
      stores: [],
      markers: [],
      latitude: 0,
      longitude: 0,
      radius: 2,
      options: [
        { value: 2, text: '2km' },
        { value: 5, text: '5km' },
        { value: 8, text: '8km' },
      ],
    }
  },
  created() {
    if (!('geolocation' in navigator)) {
      this.errMsg = 'Geolocation is not available.'
      return
    }
    this.loadingLocation = true
    getCurrentPosition(this.setPosition, this.setErrMsg)
    if (this.latitude && this.longitude && this.radius) {
      this.findNearbyStore()
    }
  },
  methods: {
    findNearbyStore() {
      getNearbyStore(this.latitude, this.longitude, this.radius*1000).then(res => {
        this.stores = JSON.parse(JSON.stringify(res.results))
        this.displayGoogleMaps()
      }).catch(err => {
        this.errMsg = err
      })
    },
    displayGoogleMaps() {
      loadedGoogleMapsAPI.then(() => {
        // Locate google maps to current position
        const google = window.google
        const infoWindow = new google.maps.InfoWindow()
        var map = new google.maps.Map(this.$refs['map'], {
          zoom: 14,
          center: new google.maps.LatLng(this.latitude, this.longitude),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        })

        this.displayingMap = true
        // Bound to fit all markers
        if (this.stores.length != 0) {
          const latlng = this.stores.map(el => 
            new google.maps.LatLng(el.geometry.location.lat, el.geometry.location.lng)
          )
          const latlngbounds = new google.maps.LatLngBounds()
          for (var i = 0; i < latlng.length; i++) {
              latlngbounds.extend(latlng[i])
          }
          map.fitBounds(latlngbounds)
        }
        // Display all markers
        this.stores.forEach(el => {
          const marker = new google.maps.Marker({
            position: new google.maps.LatLng(el.geometry.location.lat, el.geometry.location.lng),
            map: map
          })
          this.markers.push(marker)
          // Display info window when clicked
          google.maps.event.addListener(marker, 'click', () => {
            infoWindow.setContent(
              `<h5>${el.name}</h5><p>${el.vicinity}</p>`
            )
            infoWindow.open(map, marker)
            this.storeName = el.name
            this.storeVicinity = el.vicinity
          })
        })
        // Set autocomplete input
        const input = document.getElementById('autocomplete')
        const center = { lat: this.latitude, lng: this.longitude }
        const defaultBounds = {
          north: center.lat + this.radius*0.01,
          south: center.lat - this.radius*0.01,
          east: center.lng + this.radius*0.01,
          west: center.lng - this.radius*0.01,
        }
        const options = {
          fields: ['formatted_address', 'geometry', 'name'],
          bounds: defaultBounds,
          types: ['establishment'],
          origin: center,
          strictBounds: true,
        }

        const autocomplete = new google.maps.places.Autocomplete(input, options)
        autocomplete.bindTo('bounds', map)
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (!place.geometry || !place.geometry.location) {
            window.alert("No details available for input: '" + place.name + "'");
            return;
          }

          const marker = this.markers.filter(el => 
            el.position.lat() == place.geometry.location.lat() &&
            el.position.lng() == place.geometry.location.lng()
          )
          // Bound to viewport and display info window
          if (marker.length == 1) {
            if (place.geometry.viewport) {
              map.fitBounds(place.geometry.viewport);
            } else {
              map.setCenter(place.geometry.location);
              map.setZoom(17);
            }

            console.log(marker, marker.length);
            infoWindow.setContent(
              `<h5>${place.name}</h5><p>${place.formatted_address}</p>`
            )
            infoWindow.open(map, marker[0])
          }
        })
      })
    },
    setPosition(pos) {
      this.loadingLocation = false
      this.latitude = pos.coords.latitude
      this.longitude = pos.coords.longitude
    },
    setErrMsg(err) {
      this.loadingLocation = false
      this.errMsg = err.message
    },
    addStore() {
      const newStore = {
        store_name: this.storeName,
        store_address: this.storeVicinity,
      }
      db.collection('plans').doc(this.planId).collection('stores').add(newStore)
      // TODO: redirect to this store tab
    },
  },
}
</script>

<style scoped>
.store {
  margin: 15px;
  padding: 30px;
  border-radius: 15px;
  background-color: white;
}
</style>
