import Ember from 'ember';

export default Ember.Route.extend({
    currentUser: Ember.inject.service('current-user'),
    beforeModel() {
        console.log(this.get('currentUser.user.groups').indexOf('admin'));
        if(!(this.get('currentUser.user.groups').indexOf('admin') > -1)) {
            this.transitionTo('index');
        }
    },
    model() {
        return Ember.RSVP.hash({
           users: this.store.findAll('user'),
           units: this.store.query('unit', { filter: {published: false}})
        });

    }
});
