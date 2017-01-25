import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        return Ember.RSVP.hash({
            units: this.store.query('unit', { filter: {published: false}}),
            errorImage: this.store.createRecord('errorImage')
        });
    },
    actions: {
        editThis(id, pageId) {
            console.log("router - edit this");
            this.replaceWith("edit-error-image", id);
        }
    },
    events: {
        editThis(id, pageId) {
            this.replaceWith("edit-error-image", id);
        }
    }
});
