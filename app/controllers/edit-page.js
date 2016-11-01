import Ember from 'ember';
import EmberUploader from 'ember-uploader';

export default Ember.Controller.extend({
    queryParams: ['previewAll'],
    previewAll: null,
    isNewImage: Ember.computed('currentImage', function() {
        return this.get('currentImage.isNew');
    }),
    doEdit: Ember.computed('previewAll', function() {
        let previewAll = this.get('previewAll');
        if(previewAll === 'true') {
            return false;
        }
        return true;
    }),
    session: Ember.inject.service('session'),
    imageCache: Ember.inject.service(),
    actions: {
        addRow: function() {
            let lastRow = this.get('model.page.rows.lastObject');
            if(lastRow.get('left_is_argument')) {
                this.get('model.page.rows').pushObject(this.store.createRecord('row',{left_markdown: "Bild", left_has_image: true, right_markdown: "Zeugenbefragung", right_is_argument: true}));
            } else {
                this.get('model.page.rows').pushObject(this.store.createRecord('row',{left_markdown: "Zeugenbefragung", left_is_argument: true, right_markdown: "Bild", right_has_image: true}));
            }
        },
        deleteRow: function(row) {
            row.deleteRecord();
            row.save();
        },
        nextPage: function() {
            let currentPage = this.get('model.unit.pages').indexOf(this.get('model.page'));
            let nextPage = this.get('model.unit.pages').find(function(item, index) {
                return index === currentPage+1;
            });
            this.transitionToRoute('edit-page', this.get('model.unit.id'), nextPage.get('id'));
        },
        prevPage: function() {
            let currentPage = this.get('model.unit.pages').indexOf(this.get('model.page'));
            let prevPage = this.get('model.unit.pages').find(function(item, index) {
                return index === currentPage-1;
            });
            this.transitionToRoute('edit-page', this.get('model.unit.id'), prevPage.get('id'));

        },
        save: function() {
            let page = this.get('model.page');
            if(page.get('isNew')) {
                let unit = this.get('model.unit');
                page.set('unit', unit);
            }
            page.save().then( (returnItem) => {
                returnItem.get('rows').filterBy('id', null).invoke('deleteRecord');
            });
        },
        saveAndNext: function() {
            let page = this.get('model.page');
            if(page.get('isNew')) {
                let unit = this.get('model.unit');
                page.set('unit', unit);
            }
            page.save().then( (returnItem) => {
                returnItem.get('rows').filterBy('id', null).invoke('deleteRecord');
                let page = this.get('model.page');
                let pages = this.get('model.unit.pages');
                if(page.id === pages.get('lastObject').id) {
                    this.send("transitionToNextNewPage");
                } else {
                    this.send("nextPage");
                }
            });
        },
        saveAndSynthesis: function() {
            let page = this.get('model.page');
            if(page.get('isNew')) {
                let unit = this.get('model.unit');
                page.set('unit', unit);
            }
            page.save().then( (returnItem) => {
                returnItem.get('rows').filterBy('id', null).invoke('deleteRecord');
                this.set('nextType', 'synthesis');
                this.transitionToRoute('new-page', this.get('model.unit.id'), "synthesis"); 
            });
        },
        saveAndExit: function() {
            let page = this.get('model.page');
            if(page.get('isNew')) {
                let unit = this.get('model.unit');
                page.set('unit', unit);
            }
            page.save().then( (returnItem) => {
                returnItem.get('rows').filterBy('id', null).invoke('deleteRecord');
                this.transitionToRoute('profile');
            });
        },
        transitionToNextNewPage: function() {
            let currentType = this.get('model.page.page_type');
            let pageType = "";
            switch(currentType){
                case "opening": 
                    pageType = "presentation";
                    break;
                case "presentation":
                    pageType = "hearing-pro";
                    break;
                case "hearing-pro":
                    pageType = "hearing-con";
                    break;
                case "hearing-con":
                    let pagesLen = this.get('model.unit.pages.length');
                    if(pagesLen >= 8) {
                        console.log(currentType);
                        break;
                    }
                    pageType = "hearing-pro";
                    break;
                case "synthesis":
                    pageType = "literature";
                    break;
                default:
                    break;
            }
            this.set('nextType', pageType);
            window.history.pushState({}, "", "/app/unit/"+this.get('model.unit.id')+"/edit/"+this.get('model.page.id'));
            this.transitionToRoute('new-page', this.get('model.unit.id'), pageType); 
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
            let image = this.get('currentImage');
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
            uploader.on('didUpload', () => {
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
        newUploadImage: function() {
            let images = this.get('model.unit.images');
            images.forEach(function(feImage) {
                feImage.set('selected', false);
            });
            let image = this.get('store').createRecord('image');
            this.set('currentImage', image);
        },
        doSelectImage: function(image, images) {
            if(!images) {
                images = this.get('model.unit.images');
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
