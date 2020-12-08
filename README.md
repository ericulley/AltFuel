# AltFuel
Alternative fuel finder by location

Brief description: This app is designed to find the nearest available alternative fuel services based on the user's location.

Additional Features:
- Get location either via browser location data or user input.
- Filter results by fuel type (Electric, Natural Gas, Bio-Diesel, Ethanol 85).
- Filter results by a set radius around the users location.
- Display results in order of nearest to the user.
- Display the station name, city, distance from user, and price of each fuel source.
- Display a link to google maps that will automatically give directions from the user's location to each station.
- Display a sticky navigation menu that directs the user to more info about each fuel type.
- Display footer with copyright info and personal link.

Technologies Used:
- getCurrentPosition() method is used get the users current coordinates.
- jQuery: If the above method fails for any reason, an input box is displayed and the user is prompted to enter an appropriate 5-digit zip code.
- jQuery: The value of the search range is displayed below the input slider bar.
- AJAX: Once all required inputs are captured, the National Renewable Energy Laboratories public API is used to retrieve the data nearest to the user. (https://developer.nrel.gov/)
- jQuery/CSS Animations: The results are then displayed in a dropdown animation on the users screen
- Google Maps URL: Formats the appropriate link to display directions from the user's current location to the selected alternate fuel station.
- jQuery: A sticky menu is available with links to more information about each fuel type.

Live Site:
https://ericulley.github.io/AltFuel

Instructions:
- Enter an appropriate postal code in the input box, or allow the browser to access you location data.
- Then select the fuel type you're searching for, a search range radius in miles, and click "Search".
- View the displayed results, and click on "MAP" for directions to a selected alternative fuel station.
- For more information on each fuel type, follow the links in the sticky menu on the left.

Unfinished ideas:
- I just learned about the universal null value for URLs, %00, and want to try to implement that into my API search function to reduce the search into just one function and have a DRYer code. Currently there is one function to search by lat & long and a separate, almost identical, function to search by  zip code. 
