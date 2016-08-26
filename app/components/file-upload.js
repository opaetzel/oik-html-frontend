import EmberUploader from 'ember-uploader';

export default EmberUploader.FileField.extend({
    session: Ember.inject.service('session'),
    filesDidChange: function(files) {
    },
    actions: {
    }
});
