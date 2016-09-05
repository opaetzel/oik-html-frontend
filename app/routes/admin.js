import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        return Ember.RSVP.hash({
           users: this.store.findAll('user'),
           units: this.store.query('unit', { filter: {published: false}})
        });

    }
});
