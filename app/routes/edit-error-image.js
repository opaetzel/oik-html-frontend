import Ember from 'ember';

export default Ember.Route.extend({
    templateName: 'create-error-image',
    controllerName: 'create-error-image',
    model(params) {
        return this.store.findRecord('errorImage', params.error_image_id);
    }
});
