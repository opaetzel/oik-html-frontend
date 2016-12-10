import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service('session'),
    currentUser: Ember.inject.service(),
    actions: {
        logout: function() {
            this.get('session').invalidate();
        }
    }
});