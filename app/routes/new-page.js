import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model(params) {
        console.log(params.unit_id);
        return Ember.RSVP.hash({
            page: this.store.createRecord('page', {
                rows:Ember.A([{left_markdown: "", right_markdown: ""}]),
                page_type: params.page_type
            }),
            unit: this.store.findRecord('unit', params.unit_id)
        })
    }
});
