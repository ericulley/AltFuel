$(() => {
// Declare Global Variables
let curLat= null
let curLong = null
let curZip

// Start by getting user location coordinates or display zip code input
navigator.geolocation.getCurrentPosition((position) => {
    // If access is granted to current location, code below will run
    curLat = position.coords.latitude
    curLong = position.coords.longitude
    let pinpointed = $('<div>').addClass('input-item bar').text('Identified')
    $('#loc-cont').append(pinpointed)
    $('form').on('submit', setInputValuesAndSearch)
    },
    (error) => {
    // If locatoin data access is denied, code below will run & ask for zip code input
        $('.none').toggleClass('none')
        console.log("User didn't allow current location to be accessed. Enter zip code.")
    }
);

// Get input values when form is submitted and perform appropriate search function
const setInputValuesAndSearch = () => {
    $('#results-cont').empty()
    let fuelType = $('#fuel-type-input').val()
    let radius = $('#range-slider').val()
    if (curLat && curLong) {
        searchByCoordinates(curLat, curLong, fuelType, radius)
    } else {
        console.log("erroc in setInputValuesAndSearch")
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
            $('#output-cont').toggleClass('invis')
            for (let i = 0; i < data.fuel_stations.length; i++) {
                const outputRow = $(`<div id="${i}">`).addClass('output-row')
                const stationName = $('<div>').addClass('output-item name').text(data.fuel_stations[i].station_name)
                const city = $('<div>').addClass('output-item city').text(data.fuel_stations[i].city)
                const distanceAway = $('<div>').addClass('output-item distance').text(data.fuel_stations[i].distance.toFixed(1))
                const price = $('<div>').addClass('output-item price').text(data.fuel_stations[i].ev_pricing || "unknown")
                const mapView= $('<div>').addClass('output-item map').text(`MAP`)
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
const searchByZip = (zip, type, radius) => {
    event.preventDefault()
    $.ajax({
        url: `https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=nobIa8uA9o0Vu32ocLEdOCpQcv0DB5nYBrvYNB0F&locatoin=${zip}&fuel_type=${type}&limit=10&access_code=public&radius=${radius}`,
    }).then(
        (data) => {
            console.log(data)
        },
        (error) => {
            console.log(`There was an AJAX error: ${error}.`)
        }
    )
}












// Milage Range Slider Styling
$('#range-slider').on('input', () => {
    $('#slider-val').text($('#range-slider').val())
})


})
