const path = require('path');
const publicPath = "../public";

exports.getIndex = (request, response) => {
    response.sendFile(path.resolve(publicPath,"index.html"));
};

exports.getMovies = (request, response, keywords, data) => {
    response.render('results',{keywords: keywords.toUpperCase(), data: data});
};