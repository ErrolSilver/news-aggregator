// components
import { NewsListing } from './components/newsListing';

// services
import { NewsService } from './services/newsService';

let app = angular.module('newsAggregator.newsAggregation',['ngCookies'])
  .service('newsService',['$http', NewsService])
  .component('newsListing', NewsListing);
