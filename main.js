//intoduire axios
const axios = require("axios");
const express = require("express");
const aController = require("./controllers/aController");
const publicPath = 'public';
const viewsPath = 'views';
const PORT = 3000;

let app = new express();

// indique a express.js de définir son moteur de vues comme ejs
app.set("view engine","ejs");

app.use(express.static(publicPath, {extensions: ['html','htm','css','js','jpg','gif','png']}));

/* requests */
app.get('/search', aController.getIndex);

// routes
app.get('/movies', (request, response) => {
    let keywords = request.query.search;
    let page = request.query.page;
    if (!page) page=1;
    let search = "https://api.themoviedb.org/3/search/movie?api_key=036ea19c89b3277d8f1857ad51e3cb4c&query="+keywords+"&page="+page;
    axios.get(search)
    .then(resultat => {
        aController.getMovies(request,response,keywords,resultat.data);
    })
    .catch(erreur=> {
        response.send('erreur :' + erreur);
    });
});
//nous allons utliser le port 3000 pour le server
app.listen(PORT, () => {
    console.log(`Server is up and running on PORT ${PORT}.`);
});
