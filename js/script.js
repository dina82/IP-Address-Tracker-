let map = L.map('map').setView([51, -.08], 13);
let tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'copy rght Dina',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map)
let marker
marker = L.marker([51, -.08]).addTo(map)

function getAddress(e) {
    e.preventDefault()
    let ipUserSearch = e.target.children[0].value.split('.')
    let apiUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=at_8Tq08nNDamIEheixbtKMZpSJwKHYA&ipAddress=${ipUserSearch[0]}.${ipUserSearch[1]}.${ipUserSearch[2]}.${ipUserSearch[3]}`
    let ipAddress = await fetch(apiUrl)
        .then(data => data.json())
        .then(response => response)
    let { ip, location: { city, timezone }, isp } = ipAddress
    let outPutIpSearch = [ip, city, timezone, isp]
    document.querySelectorAll('li h2').forEach((item, i) => {
        item.innerHTML = outPutIpSearch[i]
    });
    let newlat = new L.LatLng(ipAddress.location.lat, ipAddress.location.lng)
    marker.setLatLng(newlat)
    map.setView([ipAddress.location.lat, ipAddress.location.lng])
}
document.querySelector('#iPAddress').addEventListener('submit', getAddress)