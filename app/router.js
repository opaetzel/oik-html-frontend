import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: "/app/"
});

Router.map(function() {
  this.route('login');
  this.route('units');

  this.route('page', {
      path: '/unit/:unit_id/:page_id'
  });
  this.route('profile');

  this.route('new-unit', {
    path: 'unit/new'
  });

  this.route('new-page', {
      path: '/unit/:unit_id/new/:page_type'
  });
  this.route('register');
  this.route('admin');

  this.route('edit-page', {
    path: '/unit/:unit_id/edit/:page_id'
  });

  this.route('confirm-mail', {
    path: '/confirm-mail/:token'
  });
  this.route('edit-unit', {
    path: '/unit/:unit_id/edit'
  });
});

export default Router;
