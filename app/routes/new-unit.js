import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    currentUser: Ember.inject.service('current-user'),
    beforeModel() {
        if(!(this.get('currentUser.user')) || !(this.get('currentUser.user.groups').indexOf('editor') > -1)) {
            this.transitionTo('index');
        }
    },
    model() {
        return this.store.createRecord('unit', {
            published: false
        });
    }
});
