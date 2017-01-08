import Ember from 'ember';

export default Ember.Route.extend({
    currentUser: Ember.inject.service('current-user'),
    model(params) {
        return this.store.findAll('user', params.page_id);
    }
});
