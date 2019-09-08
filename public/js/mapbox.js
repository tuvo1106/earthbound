/* eslint-disable */
const locations = JSON.parse(document.getElementById('map').dataset.locations)

mapboxgl.accessToken =
  'pk.eyJ1IjoidHV2bzExMDYiLCJhIjoiY2swYmw2azdkMHZrcTNtcWxhZDA1eTJuZCJ9.puiViLqEkfEvMA66Ctj1vQ'
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/tuvo1106/ck0bl93lv426v1co4ustsc9pp',
  scrollZoom: false
})

const bounds = new mapboxgl.LngLatBounds()
locations.forEach(loc => {
  // create marker
  const el = document.createElement('div')
  el.className = 'marker'
  // add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom'
  })
    .setLngLat(loc.coordinates)
    .addTo(map)
  // Add popup
  new mapboxgl.Popup({
    offset: 30
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map)

  // extend map bounds to include current location
  bounds.extend(loc.coordinates)
})

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100
  }
})
