import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    actions: {
        /*willTransition: function(transition) {
            console.log("in willTransition", transition);
            if("edit-page" in transition.params) {
                let pageId = this.controller.get('model.page.id');
                if(transition.params["edit-page"].page_id === pageId) {
                    transition.data.doEdit = false;
                    transition.data.nextType = this.controller.get('nextType');
                }
            }
        },*/
        editThis(unitId, pageId) {
            this.replaceWith("edit-page", unitId, pageId);
        }
    },
    events: {
        editThis(unitId, pageId) {
            this.replaceWith("edit-page", unitId, pageId);
        }
    },
    model(params, transition) {
        console.log("data", transition.data);
        console.log(params.unit_id);
        console.log(params.page_type);
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
    },
    typeArray: [
        "opening",
        "presentation",
        "hearing-pro",
        "hearing-con",
        "synthesis",
        "critic"
    ]


});
