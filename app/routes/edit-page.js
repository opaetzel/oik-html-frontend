import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    currentUser: Ember.inject.service('current-user'),
    model(params) {
        return Ember.RSVP.hash({
            page: this.store.findRecord('page', params.page_id),
            unit: this.store.findRecord('unit', params.unit_id)
        });
    },
    beforeModel(transition) {
        if(!(this.get('currentUser.user')) || !(this.get('currentUser.user.groups').indexOf('editor') > -1)) {
            this.transitionTo('index');
        }
        console.log("beforeModel - edit page", transition);
        if("doEdit" in transition.data && !transition.data.doEdit) {
            console.log(transition);
            console.log("redirecting to new page", transition.params["edit-page"].unit_id);
            this.transitionTo('new-page', transition.params["edit-page"].unit_id, transition.data.nextType);
        }
    }
});
