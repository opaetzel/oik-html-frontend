import EmberUploader from 'ember-uploader';

export default EmberUploader.FileField.extend({
  session: Ember.inject.service('session'),
  filesDidChange: function(files) {
    const uploader = EmberUploader.Uploader.create({
      url: this.get('url')+this.get('iid'),
      method: 'PUT',
      ajaxSettings: {
          headers: {
              'Authorization': 'Bearer ' + this.get('session.data.authenticated.token')
          }
      }
    });

    if (!Ember.isEmpty(files)) {
      // this second argument is optional and can to be sent as extra data with the upload
      uploader.upload(files[0]);
    }
  }
});
