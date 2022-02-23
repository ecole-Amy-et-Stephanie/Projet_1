// Get URL parameters
function getParameter(parameterName) {
    let parameters = new URLSearchParams(window.location.search);
    return parameters.get(parameterName);
}
// Get search keywords
var keywords = getParameter('search');
// Set a dummy keyword in case empty search terms
if (!keywords) keywords = "ali";
// Add keywords to H1
document.querySelector("h1").innerHTML += keywords.toUpperCase();
// Get Data asynchornously
getData();
async function getData() {
    // GET request using fetch
    const response = await fetch("/movies?query=" + keywords);
    /* fetch('/results?search=' + keywords); */
    const data = await response.json();
    // Create a variable to store HTML
    let liste = "";

    // Loop through each data and add a table row
    data.forEach(movie => {
        liste +=
        `<tr>
        <td>`;
        if (!movie.poster_path) {
            liste +=
            `<img src="images/notavailable.jpg">`;

        } else {
            liste +=
            `<img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}" onError="this.onerror=null;this.src='/images/notavailable.jpg';">`;
        }
            liste +=
            `</td>
            <td>
                <h2>${movie.original_title}</h2>
                <hr>
                <p>${movie.overview}</p>
                <hr>
                <br>
                <i>Date Published:</i> ${movie.release_date}
                <br>
                <i>Total Votes:</i> ${movie.vote_count}
                <br>
                <i>Average Rating:</i> ${movie.vote_average}
            </td>        
        </tr>`;
    });

    // Display results
    document.getElementById("movies").innerHTML = liste;
}
