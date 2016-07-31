(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// To use npm for external dependencies:
// npm install --save jquery
// import $ from 'jquery';
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _angularCookies = require('angular-cookies');

var _angularCookies2 = _interopRequireDefault(_angularCookies);

var _newsAggregationNewsAggregation = require('./newsAggregation/newsAggregation');

var _newsAggregationNewsAggregation2 = _interopRequireDefault(_newsAggregationNewsAggregation);

var _loggerJs = require('./logger.js');

var _loggerJs2 = _interopRequireDefault(_loggerJs);

_angular2['default'].module('newsAggregator', ['ngCookies', 'newsAggregator.newsAggregation']);

},{"./logger.js":2,"./newsAggregation/newsAggregation":4,"angular":"angular","angular-cookies":"angular-cookies"}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = {
    log: function log(message) {
        console.log("logger says: " + message);
    }
};
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var NewsListing = {
  templateUrl: '/assets/js-source/newsAggregation/views/sources.html',
  controller: ['newsService', '$scope', '$cookies', NewsListingController],
  bindings: {
    sources: '<',
    articles: '<'
  }
};

exports.NewsListing = NewsListing;
function NewsListingController(newsService, $scope, $cookies) {
  var vm = this;
  vm.sourcesSelection = [];
  vm.articles = [];
  vm.loading = false;
  newsService.getSources().then(function (sources) {
    vm.sources = sources;
  });

  vm.getArticles = function (sourceId) {
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

  vm.populateArticles = function () {
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
      for (var i = 0; i < sources.length; i++) {
        newsService.getArticles(sources[i], sortBy).then(function (articles) {
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
    expireDate.setDate(expireDate.getDate() + 100);
    if (vm.sourcesSelection.length || emptyCookie) {
      $cookies.put('selectedSources', vm.sourcesSelection, { 'expires': expireDate });
    }
  }
}

},{}],4:[function(require,module,exports){
// components
'use strict';

var _componentsNewsListing = require('./components/newsListing');

// services

var _servicesNewsService = require('./services/newsService');

var app = angular.module('newsAggregator.newsAggregation', ['ngCookies']).service('newsService', ['$http', _servicesNewsService.NewsService]).component('newsListing', _componentsNewsListing.NewsListing);

},{"./components/newsListing":3,"./services/newsService":5}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.NewsService = NewsService;

function NewsService($http) {
  var newsApiKey = '99b5af62654743dca6f72791010d9b7b';

  function getDataCompleted(response) {
    return response.data;
  }

  function getDataFailed(error) {
    console.log(error.data);
  }

  function getSources() {
    var newsPromise;

    newsPromise = $http.get('https://newsapi.org/v1/sources').then(getDataCompleted)['catch'](getDataFailed);

    return newsPromise.then(function (sources) {
      return sources.sources;
    });
  };

  function getArticles(source, sortBy) {
    var newsArticles;

    newsArticles = $http.get('https://newsapi.org/v1/articles?source=' + source + '&apiKey=' + newsApiKey).then(getDataCompleted)['catch'](getDataFailed);

    return newsArticles.then(function (articles) {
      return articles.articles;
    });
  }

  return {
    getSources: getSources,
    getArticles: getArticles
  };
}

},{}]},{},[1])


//# sourceMappingURL=index-generated.js.map
