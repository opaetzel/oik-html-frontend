import Ember from 'ember';

export default Ember.Route.extend({
    currentUser: Ember.inject.service('current-user'),
    beforeModel() {
        if(!(this.get('currentUser.user.groups').indexOf('editor') > -1)) {
            this.transitionTo('index');
        }
    },
    model() {
        return this.store.query('unit', { filter: {published: false}})
    }
});
