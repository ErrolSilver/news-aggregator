export function NewsService($http) {
  var newsApiKey = '99b5af62654743dca6f72791010d9b7b';

  function getDataCompleted(response) {
    return response.data;
  }

  function getDataFailed(error) {
    console.log(error.data);
  }

  function getSources() {
    var newsPromise;
    
    newsPromise = $http.get('https://newsapi.org/v1/sources')
      .then(getDataCompleted)
      .catch(getDataFailed);

    return newsPromise.then(function(sources) {
      return sources.sources;
    });
  };

  function getArticles(source, sortBy) {
    var newsArticles;
    
    newsArticles = $http.get('https://newsapi.org/v1/articles?source='+source+'&apiKey='+newsApiKey)
      .then(getDataCompleted)
      .catch(getDataFailed);

    return newsArticles.then(function(articles) {
      return articles.articles;
    });
  }

  return {
    getSources : getSources,
    getArticles : getArticles
  };
}
