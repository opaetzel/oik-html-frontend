import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        return this.store.createRecord('errorImage');
    },
    actions: {
        editThis(id, pageId) {
            this.replaceWith("edit-error-image", id);
        }
    },
    events: {
        editThis(id, pageId) {
            this.replaceWith("edit-error-image", id);
        }
    }
});
