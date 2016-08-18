import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('units');

  this.route('page', {
    path: '/page/:page_id'
  });
});

export default Router;
