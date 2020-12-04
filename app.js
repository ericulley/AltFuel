// AJAX Alternative Fuel Search Function
const altFuelSearch = (lat, long, type, radius) => {
    $.ajax({
        url: `https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=nobIa8uA9o0Vu32ocLEdOCpQcv0DB5nYBrvYNB0F&fuel_type=E85,ELEC,BD&latitude=${lat}&longitude=${long}&fuel_type=ELEC&limit=10&access_code=public`,
    }).then(
        (data) => {
            console.log(data)
        },
        (error) => {
            console.log(`There was an AJAX error: ${error}.`)
        }
    )
}


$(() => {
// Start by getting user location coordinates or zip code
navigator.geolocation.getCurrentPosition((position) => {
    // If access is granted to current location, code below will run
    let curLat = position.coords.latitude
    let curLong = position.coords.longitude
    altFuelSearch(curLat, curLong)
    },
    (error) => {
    // If locatoin data access is denied, code below will run & ask for zip code input
        console.log("error: user didn't give current location.")

    }
);





// Milage Range Slider Styling
$('#range-slider').on('input', () => {
    $('#slider-val').text($('#range-slider').val())
})


})
