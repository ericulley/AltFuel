$(() => {
// Declare Global Variables
let curLat= null
let curLong = null

// Start by getting user location coordinates or display zip code input
navigator.geolocation.getCurrentPosition((position) => {
    // If access is granted to current location, code below will run
    curLat = position.coords.latitude
    curLong = position.coords.longitude
    let pinpointed = $('<div>').addClass('input-item bar').text('Identified')
    $('#loc-cont').append(pinpointed)
    },
    (error) => {
    // If locatoin data access is denied, code below will run & ask for zip code input
        $('.none').toggleClass('none')
        console.log("User didn't give current location. Enter zip code.")
    }
);

// AJAX Alternative Fuel Search by Current Location (Lat & Long) Function
const searchByCoordinates = (lat, long, type, radius) => {
    $.ajax({
        url: `https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=nobIa8uA9o0Vu32ocLEdOCpQcv0DB5nYBrvYNB0F&latitude=${lat}&longitude=${long}&fuel_type=${type}&limit=10&access_code=public&radius=${radius}`,
    }).then(
        (data) => {
            console.log(data)
        },
        (error) => {
            console.log(`There was an AJAX error: ${error}.`)
        }
    )
}
// AJAX Alternative Fuel Search by Zip Code Function
const searchByZip = (zip, type, radius) => {
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
// Get Input Values When "Search" is Submitted
$('#submit-button').on('submit', searchByCoordinates)
const getInputValues = () => {
    let type = $('#fuel-type-input').val()
    let radius = $('#range-slider').val()

}











// Milage Range Slider Styling
$('#range-slider').on('input', () => {
    $('#slider-val').text($('#range-slider').val())
})


})
