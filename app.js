$(() => {
    // Define Global Variables
    let curLat = null
    let curLong = null

    // Get user location coordinates
    const getUserLoc = () => {
        navigator.geolocation.getCurrentPosition((position) => {
          curLat = position.coords.latitude
          curLong = position.coords.longitude
          console.log(curLat, curLong)
        });
    }

    // AJAX
    const altFuelSearch = (curLat, curLong) => {
        $.ajax({
            url: `https://developer.nrel.gov/api/alt-fuel-stations/v1.json?fuel_type=E85,ELEC,HY,BD&state=CA&limit=5&api_key=nobIa8uA9o0Vu32ocLEdOCpQcv0DB5nYBrvYNB0F`,
        }).then(
            (data) => {
                console.log(data)
            },
            (error) => {
                console.log(`There was an AJAX error: ${error}.`)
            }
        )
    }



getUserLoc()




})
