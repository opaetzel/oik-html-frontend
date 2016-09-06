import Ember from 'ember';

export default Ember.Route.extend({
    model(params) {
        return Ember.RSVP.hash({
            page: this.store.findRecord('page', params.page_id),
            unit: this.store.findRecord('unit', params.unit_id)
        });
    },
    afterModel: function(model, transition) {
        model.unit.set('currentPage', model.unit.get('pages').indexOf(model.page));
    }
});
