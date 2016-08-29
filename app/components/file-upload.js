import EmberUploader from 'ember-uploader';
import Ember from 'ember';

export default EmberUploader.FileField.extend({
    session: Ember.inject.service('session'),
    filesDidChange: function() {
    },
    actions: {
    }
});
