import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    session: Ember.inject.service('session'),
    imageCache: Ember.inject.service(),
    isNewImage: Ember.computed('currentImage', function() {
        return this.get('currentImage.isNew');
    }),
    actions: {
        didSelectFiles: function(files) {
            console.log(files);
            this.set('files', files);
            this.set('uploadfile', files[0]);
        },
        doUpload: function() {
            this.set('uploading', true);
            let image = this.get('currentImage');
            image.set('unit', this.get('unit'));
            let files = this.get('files');
            const uploader = EmberUploader.Uploader.create({
                method: 'PUT',
                ajaxSettings: {
                    headers: {
                        'Authorization': 'Bearer ' + this.get('session.data.authenticated.token')
                    }
                }
            });
            const doSelectImage = this.get('actions.doSelectImage');
            uploader.on('didUpload', () => {
                this.set('uploading', false);
                this.set('uploadedFile', files[0]);
                console.log("didUpload");
                image.set('uploaded', true);
                let images = this.get('unit.images');
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
                uploader.set('url', "/api/images/" + imageId);
                console.log(imageId);
                console.log(files);
                console.log("created uploader");
                if (!Ember.isEmpty(files)) {
                    // this second argument is optional and can to be sent as extra data with the upload
                    uploader.upload(files[0]);
                }
            });
        },
        saveCurrentImage: function() {
            this.get('currentImage').save();
        },
        newUploadImage: function() {
            let images = this.get('unit.images');
            images.forEach(function(feImage) {
                feImage.set('selected', false);
            });
            let image = this.get('store').createRecord('image');
            this.set('currentImage', image);
        },
        doSelectImage: function(image, images) {
            if(!images) {
                images = this.get('unit.images');
                this.set('currentImage', image);
            }
            images.forEach(function(feImage) {
                feImage.set('selected', false);
            });
            image.set('selected', true);
            return false;
        },
        resolveImagePromise: function() {
            let promise = this.get('getImagePromise');
            this.get('unit.images').forEach(function(image) {
                if(image.get('selected')) {
                    promise.resolve(image);
                    Ember.$('#select-image-modal').modal('hide');
                    return;
                }
            });
        }
    }
});
