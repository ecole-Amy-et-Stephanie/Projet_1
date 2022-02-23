const axios = require("axios");
const express = require("express");
const publicPath = 'public';
const viewsPath = 'views';
const PORT = 3000;

let app = new express();

app.listen(PORT, () => {
    console.log(`Server is up and running on PORT ${PORT}.`);
});

app.use(express.static(publicPath, {extensions: ['html','htm','css','js','jpg']}));

/* requests */
app.get('/search', (request, response) => {
    response.sendFile(path.resolve(publicPath,"index.html"));
});

app.get('/movies', (request, response) => {
    let keywords = request.query.query;
    let search = "https://api.themoviedb.org/3/search/movie?api_key=036ea19c89b3277d8f1857ad51e3cb4c&query="+keywords;
    axios.get(search)
    .then(resultat=> {
        /*
        let results = resultat.data.results;
        console.log(results);
            let answer = "";
            
            results.forEach((result) => {
                answer += `TITRE : ${result.original_title}, SYNOPSYS : ${result.overview}, DURÉE : ${result.runtime} min., PUBLIÉ LE : ${result.release_date}, NOMBRE VOTES : ${result.vote_count}, QUOTE MOYENNE : ${result.vote_average}`;
                answer += `<img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/${result.poster_path}">`;
                answer +="<hr>";
            });
            response.send(answer);
        */
       response.json(resultat.data.results);
    })
    .catch(erreur=> {
        response.send('erreur :' + erreur);
    });
});
