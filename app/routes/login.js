import Ember from 'ember';

export default Ember.Route.extend({
    session: Ember.inject.service('session'),
    afterModel() {
        if(this.get('session.authenticated')) {
            this.transitionTo('profile');
        }
    }
});
