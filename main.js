const axios = require("axios");
const express = require("express");
const aController = require("./controllers/aController");
const publicPath = 'public';
const viewsPath = 'views';
const PORT = 3000;

let app = new express();

app.set("view engine","ejs");
// app.set("views", "views");

app.listen(PORT, () => {
    console.log(`Server is up and running on PORT ${PORT}.`);
});

app.use(express.static(publicPath, {extensions: ['html','htm','css','js','jpg','gif','png']}));

/* requests */
app.get('/search', aController.getIndex);

app.get('/movies', (request, response) => {
    let keywords = request.query.search;
    let search = "https://api.themoviedb.org/3/search/movie?api_key=036ea19c89b3277d8f1857ad51e3cb4c&query="+keywords;
    axios.get(search)
    .then(resultat => aController.getMovies(request,response,keywords,resultat.data.results))
    .catch(erreur=> {
        response.send('erreur :' + erreur);
    });
});

