import Ember from 'ember';

export default Ember.Route.extend({
    currentUser: Ember.inject.service('current-user'),
    model(params) {
        return this.store.findRecord('errorImage', params.error_image_id);
    },
    afterModel(model) {
        if(!model.get('published')) {
            if(!this.get('currentUser.user') || !(this.get('currentUser.user.groups').indexOf('admin') > -1)) {
                this.transitionTo('index');
            }
        }
    }
});
