import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    currentUser: Ember.inject.service('current-user'),
    actions: {
        editThis(unitId) {
            this.replaceWith("edit-unit", unitId);
        }
    },
    events: {
        editThis(unitId) {
            this.replaceWith("edit-page", unitId);
        }
    },
    beforeModel() {
        if(!(this.get('currentUser.user')) || !(this.get('currentUser.user.groups').indexOf('editor') > -1)) {
            this.transitionTo('index');
        }
    },
    model() {
        return Ember.RSVP.hash({
            unit: this.store.createRecord('unit', {
                published: false
            }),
            rotateImage: this.store.createRecord('rotate-image')
        });
    }
});
