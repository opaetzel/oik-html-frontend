import Ember from 'ember';
import EmberUploader from 'ember-uploader';

export default Ember.Controller.extend({
    currentUser: Ember.inject.service(),
    session: Ember.inject.service(),
    actions: {
        newError: function() {
            let errorCircle = this.get('store').createRecord('circle', {centerX: 15, centerY: 15, radius: 15});
            this.get('model.errorCircles').pushObject(errorCircle);
        },
        deleteError: function() {
            this.get('model.errorCircles').popObject();
        },
        save: function() {
            this.get('model').save();
        },
        selectImage: function() {
            let promise = Ember.RSVP.defer();
            this.set('getImagePromise', promise);
            Ember.$('#select-image-modal').modal('show');
            promise.promise.then( (img) => {
                this.get('model').set('correctImage', img);
            });
        },
        selectUnit(unit) {
            this.set('currentUnit', unit);
        },
        didSelectFiles: function(files) {
            this.set('files', files);
            this.set('uploadfile', files[0]);
        },
        doUpload: function() {
            this.set('uploading', true);
            let image = this.get('model');
            let files = this.get('files');
            const uploader = EmberUploader.Uploader.create({
                method: 'PUT',
                ajaxSettings: {
                    headers: {
                        'Authorization': 'Bearer ' + this.get('session.data.authenticated.token')
                    }
                }
            });
            uploader.on('didUpload', () => {
                this.set('uploading', false);
                this.set('uploadedFile', files[0]);
                console.log("didUpload");
                image.set('uploaded', true);
                let images = this.get('images');
                doSelectImage(image, images);
                image = this.get('store').createRecord('image', {
                    name: "Kein Bild ausgewählt"
                });
                this.set('uploadImage', image);
            });
            uploader.on('progress', e => {
                this.set('uploadprogress', e.percent);
            });
            image.save().then(function(record) {
                console.log("saved, try to upload");
                let imageId = record.get('id');
                uploader.set('url', "/api/errorImages/" + imageId);
                console.log(imageId);
                console.log(files);
                console.log("created uploader");
                if (!Ember.isEmpty(files)) {
                    // this second argument is optional and can to be sent as extra data with the upload
                    uploader.upload(files[0]);
                }
            });
        }
    }
});
