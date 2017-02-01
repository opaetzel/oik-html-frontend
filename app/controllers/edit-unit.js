import Ember from 'ember';
import EmberUploader from 'ember-uploader';

export default Ember.Controller.extend({
    session: Ember.inject.service('session'),
    currentUser: Ember.inject.service(),
    actions: {
        cancel: function() {
            let unit = this.get('model');
            unit.deleteRecord();
            this.transitionToRoute('units');
        },
        save: function() {
            let unit = this.get('model');
            unit.set('user', this.get('currentUser.user'));
            unit.save();
        },
        saveAndNext: function() {
            let unit = this.get('model');
            unit.set('user', this.get('currentUser.user'));
            let self = this;
            unit.save().then( (unit) => {
                if(unit.get('pages.length') > 0) {
                    this.transitionToRoute('edit-page', this.get('model.id'), this.get('model.pages.firstObject.id'));
                } else {
                    this.transitionToRoute('new-page', unit.get('id'), "opening");
                }
            });
        }, 
        selectImage: function() {
            let deferred = Ember.RSVP.defer();
            this.set('getImagePromise', deferred);
            Ember.$('#select-image-modal').modal('show');
            deferred.promise.then( (value) => {
                this.get('model').set('front_image', value.get('id'));
            }, (reason) => {
                console.log(reason);
            });
        },
        didSelectFiles: function(files) {
            console.log(files);
            this.set('uploadfile', files[0]);
            console.log(files[0]);
        },
        doUpload: function() {
            this.set('uploading', true);
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
            let unit = this.get('model');
            unit.set('user', this.get("currentUser.user"));
            console.log("set user");
            let image = unit.get('rotateImage');
            if(!image.get('id') || image.get('id') == 0) {
                console.log("model kaputt");
                let newRImage = this.get('store').createRecord('rotate-image');
                newRImage.set('credits', image.get('credits'));
                newRImage.set('caption', image.get('caption'));
                image = newRImage;
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
            } else {
                let imageId = image.get('id');
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
            }
        }
    }
});
