import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(ApplicationRouteMixin, {
    currentUser: service(),

    beforeModel() {
        return this._loadCurrentUser();
    },

    sessionAuthenticated() {
        this._super(...arguments);
        this._loadCurrentUser().then(()=> this.transitionTo('profile')).catch(() => this.get('session').invalidate());
    },
    sessionInvalidated() {
        window.location.replace('/app/');
    },

        _loadCurrentUser() {
            return this.get('currentUser').load();
        }
});
