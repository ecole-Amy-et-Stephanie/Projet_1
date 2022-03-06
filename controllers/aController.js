// Controllers

exports.getMovies = (request, response, keywords, data) => {
    response.render('results',{keywords: keywords.toUpperCase(), data: data});
};