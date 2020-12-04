$(() => {
// Declare Global Variables
let curLat= null
let curLong = null
let curZip = ""

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
    let fuelType = $('#fuel-type-input').val()
    let radius = $('#range-slider').val()
    if (curLat && curLong) {
        searchByCoordinates(curLat, curLong, fuelType, radius)
    } else if (curZip) {
        searchByZip()
    } else {
        event.preventDefault()
        alert("Please enter an appropriate Postal Code.")
    }

}

// AJAX fuel search by current location (lat & long) function
const searchByCoordinates = (curLat, curLong, fuelType, radius) => {
    event.preventDefault()
    $.ajax({
        url: `https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=nobIa8uA9o0Vu32ocLEdOCpQcv0DB5nYBrvYNB0F&latitude=${curLat}&longitude=${curLong}&fuel_type=${fuelType}&limit=10&access_code=public&radius=${radius}`,
    }).then(
        (data) => {
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
