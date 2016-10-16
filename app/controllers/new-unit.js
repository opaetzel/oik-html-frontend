import Ember from 'ember';
import EmberUploader from 'ember-uploader';

export default Ember.Controller.extend({
    currentUser: Ember.inject.service(),
    actions: {
        cancel: function() {
            let unit = this.get('model.unit');
            unit.deleteRecord();
            this.transitionToRoute('units');
        },
        save: function() {
            let unit = this.get('model.unit');
            unit.set('user', this.currentUser.get('user'));
            unit.save();
        },
        saveAndNext: function() {
            let unit = this.get('model.unit');
            unit.set('user', this.get('currentUser.user'));
            let self = this;
            unit.save().then(function(unit) {
                self.transitionToRoute("new-page", unit.get('id'), "opening");
            });
        }, 
        didSelectFiles: function(files) {
            console.log(files);
            this.set('uploadfile', files[0]);
            console.log(files[0]);
        },
        doUpload: function() {
            let image = this.get('model.rotateImage');
            let file = this.get('uploadfile');
            const uploader = EmberUploader.Uploader.create({
                method: 'PUT',
                ajaxSettings: {
                    headers: {
                        'Authorization': 'Bearer ' + this.get('session.data.authenticated.token')
                    }
                }
            });
            uploader.on('didUpload', () => {
                console.log("didUpload");
                image.set('uploaded', true);
            });
            let unit = this.get('model.unit');
            unit.set('rotateImage', image);
            image.save().then(function(record) {
                console.log("saved, try to upload");
                let imageId = record.get('id');
                uploader.set('url', "/api/rotateImages/" + imageId);
                console.log(imageId);
                console.log("created uploader");
                if (file) {
                    // this second argument is optional and can to be sent as extra data with the upload
                    uploader.upload(file);
                }
            });
        }
    }
});
