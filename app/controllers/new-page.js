import Ember from 'ember';
import EmberUploader from 'ember-uploader';

export default Ember.Controller.extend({
    session: Ember.inject.service('session'),
    actions: {
        addRow: function() {
            this.get('model.page.rows').pushObject({left_markdown: "", right_markdown: ""});
        },
        save: function() {
            let page = this.get('model.page');
            if(page.get('isNew')) {
                let unit = this.get('model.unit');
                page.set('unit', unit);
                unit.get('pages').pushObject(page);
            }
            page.save();
        },
        showModal: function(modalID) {
            Ember.$('#'+modalID).modal('show');
        },
        hideModal: function(modalID) {
            Ember.$('#'+modalID).modal('hide');
        },
        selectImage: function () {
            let image = this.get('store').createRecord('image', {
                name: "Kein Bild ausgewählt"
            });
            this.set('uploadImage', image);
            let promise = Ember.RSVP.defer();
            this.set('getImagePromise', promise);
            Ember.$('#select-image-modal').modal('show');
            return promise;
        },
        didSelectFiles: function(files) {
            console.log(files);
            this.set('files', files);
        },
        doUpload: function() {
            let image = this.get('uploadImage');
            image.set('unit', this.get('model.unit'));
            let files = this.get('files');
            const uploader = EmberUploader.Uploader.create({
                method: 'PUT',
                ajaxSettings: {
                    headers: {
                        'Authorization': 'Bearer ' + this.get('session.data.authenticated.token')
                    }
                }
            });
            uploader.on('didUpload', e => {
                console.log("didUpload");
                image.toggleProperty('reload');
                image = this.get('store').createRecord('image', {
                    name: "Kein Bild ausgewählt"
                });
                this.set('uploadImage', image);
            });
            image.save().then(function(record) {
                console.log("saved, try to upload");
                let imageId = record.get('id');
                uploader.set('url', "/api/images/" + imageId)
                    console.log(imageId);
                console.log(files);
                console.log("created uploader");
                if (!Ember.isEmpty(files)) {
                    // this second argument is optional and can to be sent as extra data with the upload
                    uploader.upload(files[0]);
                }
            });
        },
        resolvePromise: function() {
            console.log("trying to resolve promise...");
            this.get('getImagePromise').resolve('hat geklappt');
        }
    }
});
