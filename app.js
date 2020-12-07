// On Load Function
$(() => {
// Declare Global Variables
let curLat= null
let curLong = null
const zipCodeTest = /^\d{5}$/
let curZip = null

// Start by getting user location coordinates or display zip code input
navigator.geolocation.getCurrentPosition((position) => {
    // If access is granted to current location, code below will run
    curLat = position.coords.latitude
    curLong = position.coords.longitude
    let pinpointed = $('<div>').addClass('input-item bar').text('Identified')
    $('#searching').addClass('none')
    $('#loc-cont').append(pinpointed)
    $('form').on('submit', setInputValuesAndSearch)
    },
    (error) => {
    // If locatoin data access is denied, code below will run & zip code input will appear
        $('.none').toggleClass('none')
        $('#searching').addClass('none')
        $('form').on('submit', setInputValuesAndSearch)
        // Maybe change this to a modal
        console.log("User didn't allow current location to be accessed. Please enter a zip code.")
    }
);

// Get input values when form is submitted and perform appropriate search function
const setInputValuesAndSearch = () => {
    $('#results-cont').empty()
    let fuelType = $('#fuel-type-input').val()
    let radius = $('#range-slider').val()
    curZip = $('#location-input').val()
    if (curLat && curLong) {
        searchByCoordinates(curLat, curLong, fuelType, radius)
    } else if (zipCodeTest.test(curZip)) {
        searchByZip(curZip, fuelType, radius)
    } else {
        alert("Please enter a 5 digit Postal Code")
        event.preventDefault()
    }
}

// AJAX fuel search by current location (lat & long) function
const searchByCoordinates = (curLat, curLong, fuelType, radius) => {
    event.preventDefault()
    $.ajax({
        url: `https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=nobIa8uA9o0Vu32ocLEdOCpQcv0DB5nYBrvYNB0F&latitude=${curLat}&longitude=${curLong}&fuel_type=${fuelType}&limit=10&access_code=public&radius=${radius}`,
    }).then(
        (data) => {
            // When the search succeeds, display results in the DOM
            $('#output-cont').removeClass('invis')
            for (let i = 0; i < data.fuel_stations.length; i++) {
                const outputRow = $(`<div id="${i}">`).addClass('output-row')
                const stationName = $('<div>').addClass('output-item name').text(data.fuel_stations[i].station_name)
                const city = $('<div>').addClass('output-item city').text(data.fuel_stations[i].city)
                const distanceAway = $('<div>').addClass('output-item distance').text(`${data.fuel_stations[i].distance.toFixed(1)} mi`)
                const price = $('<div>').addClass('output-item price').text(data.fuel_stations[i].ev_pricing || "unknown")
                const streetAdd = (data.fuel_stations[i].street_address).replace(/[\s]/g, '+')
                const directionsURL = `https://www.google.com/maps/dir/?api=1&destination=${streetAdd}`
                const mapView= $(`<a href="${directionsURL}" target="_blank">`).addClass('output-item map').text('MAP')
                outputRow.append(stationName).append(city).append(distanceAway).append(price).append(mapView)
                $('#results-cont').append(outputRow).append($('<hr>'))
            }
            console.log(data)
        },
        (error) => {
            console.log(error)
        }
    )
}
// AJAX Alternative Fuel Search by Zip Code Function
const searchByZip = (curZip, fuelType, radius) => {
    event.preventDefault()
    $.ajax({
        url: `https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=nobIa8uA9o0Vu32ocLEdOCpQcv0DB5nYBrvYNB0F&location=${curZip}&fuel_type=${fuelType}&limit=10&access_code=public&radius=${radius}`,
    }).then(
        (data) => {
            $('#output-cont').removeClass('invis')
            for (let i = 0; i < data.fuel_stations.length; i++) {
                const outputRow = $(`<div id="${i}">`).addClass('output-row')
                const stationName = $('<div>').addClass('output-item name').text(data.fuel_stations[i].station_name)
                const city = $('<div>').addClass('output-item city').text(data.fuel_stations[i].city)
                const distanceAway = $('<div>').addClass('output-item distance').text(`${data.fuel_stations[i].distance.toFixed(1)} mi`)
                const price = $('<div>').addClass('output-item price').text(data.fuel_stations[i].ev_pricing || "unknown")
                const streetAdd = (data.fuel_stations[i].street_address).replace(/[\s]/g, '+')
                const directionsURL = `https://www.google.com/maps/dir/?api=1&destination=${streetAdd}`
                const mapView= $(`<a href="${directionsURL}" target="_blank">`).addClass('output-item map').text('MAP')
                outputRow.append(stationName).append(city).append(distanceAway).append(price).append(mapView)
                $('#results-cont').append(outputRow).append($('<hr>'))
            }
            // console.log(data)
        },
        (error) => {
            console.log(`There was an AJAX error: ${error}.`)
        }
    )
}








// Nav Menu
$('.home-link').click(() => {
    $('nav').toggleClass('move')
    $('#nav-tab').toggleClass('move')
})

// Milage Range Slider Styling
$('#range-slider').on('input', () => {
    $('#slider-val').text($('#range-slider').val())
})

// Close On-Load Function
})
