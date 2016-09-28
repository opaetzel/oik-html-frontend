import Ember from 'ember';

export default Ember.Route.extend({
    model(params) {
        return Ember.RSVP.hash({
            token: params.token,
            confirmed: false
        });
    },
});
