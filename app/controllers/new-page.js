import Ember from 'ember';
import EmberUploader from 'ember-uploader';

export default Ember.Controller.extend({
    session: Ember.inject.service('session'),
    transitionToNextNewPage: function(currentType) {
        let pageType = "";
        switch(currentType){
        case "opening": 
            pageType = "presentation";
            break;
        case "presentation":
            pageType = "hearing-pro";
            break;
        case "hearing":
            let pages = this.get('model.unit.pages');
            if(pages.length === 8) {
                pageType = "synthesis";
                break;
            }
            if(pages.length % 2 === 0) {
                pageType = "hearing-pro";
            } else {
                pageType = "hearing-con";
            }
            break;
        case "synthesis":
            pageType = "critic";
            break;
        default:
            break;
        }
        this.transitionToRoute('new-page', this.get('model.unit.id'), pageType); 
    },
    actions: {
        addRow: function() {
            this.get('model.page.rows').pushObject({left_markdown: "", right_markdown: ""});
        },
        save: function() {
            let page = this.get('model.page');
            if(page.get('isNew')) {
                let unit = this.get('model.unit');
                page.set('unit', unit);
            }
            page.save();
        },
        saveAndNext: function() {
            this.actions.save();
            this.transitionToNextNewPage(this.get('model.page.type'));
        },
        showModal: function(modalID) {
            Ember.$('#'+modalID).modal('show');
        },
        hideModal: function(modalID) {
            Ember.$('#'+modalID).modal('hide');
        },
        selectImage: function () {
            let image = this.get('store').createRecord('image', {
                name: "Kein Bild ausgewählt",
                unit: this.get('model.unit')
            });
            console.log("unit id:");
            console.log(image.get('unit.id'));
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
            const doSelectImage = this.get('actions.doSelectImage');
            uploader.on('didUpload', e => {
                console.log("didUpload");
                image.set('uploaded', true);
                let images = this.get('model.unit.images');
                doSelectImage(image, images);
                image = this.get('store').createRecord('image', {
                    name: "Kein Bild ausgewählt"
                });
                this.set('uploadImage', image);
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
        doSelectImage: function(image, images) {
            if(!images) {
                images = this.get('model.unit.images');
            }
            images.forEach(function(feImage) {
                feImage.set('selected', false);
            });
            image.set('selected', true);
            return false;
        },
        resolveImagePromise: function() {
            let promise = this.get('getImagePromise');
            this.get('model.unit.images').forEach(function(image) {
                if(image.get('selected')) {
                    promise.resolve(image);
                    Ember.$('#select-image-modal').modal('hide');
                    return;
                }
            });
        }
    }
});
