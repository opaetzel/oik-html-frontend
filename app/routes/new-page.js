import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model(params) {
        console.log(params.unit_id);
        return Ember.RSVP.hash({
            page: this.store.createRecord('page', {
                rows: [this.store.createRecord('row', {left_markdown: "", right_markdown: ""})],
                page_type: params.page_type,
                title: this.titleHash[params.page_type]
            }),
            unit: this.store.findRecord('unit', params.unit_id)
        });
    },
    titleHash: {
        "opening": "Aufruf der Sache und Aufnahme der objektbezogenen Daten",
        "presentation": "Referat der Streitfrage",
        "hearing-pro": "Beweisaufnahme",
        "hearing-con": "Beweisaufnahme",
        "synthesis": "Schlussplädoyers und Abstimmung",
        "critic": "Urteilsverkündung"
    }

});
