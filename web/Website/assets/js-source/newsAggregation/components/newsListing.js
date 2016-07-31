export const NewsListing = {
  templateUrl: '/assets/js-source/newsAggregation/views/sources.html',
  controller: ['newsService', '$scope', '$cookies', NewsListingController],
  bindings: {
    sources: '<',
    articles: '<'
  }
};

function NewsListingController(newsService, $scope, $cookies) {
  var vm = this;
  vm.sourcesSelection = [];
  vm.articles = [];
  vm.loading = false;
  newsService.getSources().then( sources => {
    vm.sources = sources;
  });

  vm.getArticles = function(sourceId) {
    var sourceIndex = vm.sourcesSelection.indexOf(sourceId);

    if (sourceIndex > -1) {
      vm.sourcesSelection.splice(sourceIndex, 1);
    } else {
      vm.sourcesSelection.push(sourceId);
    }

    if (vm.sourcesSelection.length === 0) {
      setUserSources(true);
    }

    updateArticles(vm.sourcesSelection);
  };

  vm.populateArticles = function() {
    var storedSourceSelection = $cookies.get('selectedSources');
    if (storedSourceSelection) {
      vm.sourcesSelection = storedSourceSelection.split(',');
      updateArticles(vm.sourcesSelection);
    }
  };

  function updateArticles(sources, sortBy) {
    vm.loading = true;

    if (sources.length) {
      vm.articles = [];
      for (var i = 0; i < sources.length; i++){
        newsService.getArticles(sources[i], sortBy).then( articles => {
          Array.prototype.push.apply(vm.articles, articles);

          if (i === sources.length) {
            vm.loading = false;
          }
        });  
      }
    } else {
      vm.articles = [];
      vm.loading = false;
    }
    setUserSources();
  }

  function setUserSources(emptyCookie) {
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 100)
    if (vm.sourcesSelection.length || emptyCookie) {
      $cookies.put('selectedSources', vm.sourcesSelection, {'expires': expireDate});      
    }
  }
}
