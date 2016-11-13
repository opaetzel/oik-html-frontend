import Ember from 'ember';
import EmberUploader from 'ember-uploader';

export default Ember.Controller.extend({
    session: Ember.inject.service('session'),
    currentUser: Ember.inject.service(),
    actions: {
        cancel: function() {
            let unit = this.get('model.unit');
            unit.deleteRecord();
            this.transitionToRoute('units');
        },
        save: function() {
            let unit = this.get('model.unit');
            unit.set('user', this.get('currentUser.user'));
            unit.save().then( () => {
                this.get("target").send("editThis", this.get("model.unit.id"));
            });
        },
        saveAndNext: function() {
            let unit = this.get('model.unit');
            unit.set('user', this.get('currentUser.user'));
            let self = this;
            unit.save().then(function(unit) {
                self.transitionToRoute("new-page", unit.get('id'), "opening");
            });
        }, 
        selectImage: function() {
            let unit = this.get('model.unit');
            unit.set('user', this.get("currentUser.user"));
            this.get('model.unit').save().then( () => {
                let deferred = Ember.RSVP.defer();
                this.set('getImagePromise', deferred);
                Ember.$('#select-image-modal').modal('show');
                deferred.promise.then( (value) => {
                    this.get('model.unit').set('front_image', value.get('id'));
                }, (reason) => {
                    console.log(reason);
                });
                
            });
        },
        didSelectFiles: function(files) {
            console.log(files);
            this.set('uploadfile', files[0]);
            console.log(files[0]);
        },
        doUpload: function() {
            this.set('uploading', true);
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
            uploader.on('progress', e => {
                this.set('uploadprogress', e.percent);
            });
            uploader.on('didUpload', () => {
                console.log("didUpload");
                this.set('uploading', false);
                this.set('uploadedFile', file);
            });
            uploader.on('didError', (jqXHR, textStatus, errorThrown) => {
                console.log(jqXHR, textStatus, errorThrown);
                this.set('uploadError', errorThrown + " (" + textStatus + ")");
            });
            let unit = this.get('model.unit');
            unit.set('user', this.get("currentUser.user"));
            console.log("set user");
            image.save().then( (record) => {
                unit.set('rotateImage', image);
                unit.save().then(function() {
                    console.log("saved, try to upload");
                    let imageId = record.get('id');
                    uploader.set('url', "/api/upload-rotate-image/" + imageId);
                    console.log(imageId);
                    console.log("created uploader");
                    if (file) {
                        // this second argument is optional and can to be sent as extra data with the upload
                        uploader.upload(file).then(data => {
                            console.log("didUpload");
                            this.set('uploading', false);
                            this.set('uploadedFile', file);
                        }, error => {
                          // Handle failure
                            console.log(error);
                            this.set('uploadError', error);
                        });
                    }
                });
            });
        }
    }
});
