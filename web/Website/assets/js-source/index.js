// To use npm for external dependencies:
// npm install --save jquery
// import $ from 'jquery';
import angular from 'angular';
import ngCookies from 'angular-cookies';
import newsAggregation from './newsAggregation/newsAggregation';
import logger from './logger.js';

angular.module('newsAggregator',[
  'ngCookies',
  'newsAggregator.newsAggregation'
]);

