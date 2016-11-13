import Ember from 'ember';
import EmberUploader from 'ember-uploader';

export default Ember.Controller.extend({
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
        save: function() {
            let page = this.get('model.page');
            if(page.get('isNew')) {
                let unit = this.get('model.unit');
                page.set('unit', unit);
            }
            page.save().then( (returnItem) => {
                returnItem.get('rows').filterBy('id', null).invoke('deleteRecord');
                this.get("target").send("editThis", this.get("model.unit.id"), this.get("model.page.id"));
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
                this.send("transitionToNextNewPage");
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
                window.history.replaceState({}, "", "/app/unit/"+this.get('model.unit.id')+"/edit/"+this.get('model.page.id'));
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
            window.history.replaceState({}, "", "/app/unit/"+this.get('model.unit.id')+"/edit/"+this.get('model.page.id'));
            this.transitionToRoute('new-page', this.get('model.unit.id'), pageType); 
        }
    }
});
