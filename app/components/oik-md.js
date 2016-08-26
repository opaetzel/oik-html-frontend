import Ember from 'ember';
import EmberRemarkableComponent from 'ember-remarkable/components/md-text';

const {computed} = Ember;

export default EmberRemarkableComponent.extend({
    parsedMarkdownCites: computed('parsedMarkdown', function () {
        let parsedMarkdown = this.get('parsedMarkdown');
        return parsedMarkdown;
    }),
    getSelection: function() {
        let e = Ember.$('#' + this.get('elementId')).find("textarea");
        e = e[0];
        console.log(e);
        return {
            start: e.selectionStart,
            end: e.selectionEnd
        }
    },
    decorate: function(prepend, append) {
        let text = this.get('text');
        let selection = this.getSelection();
        let text_1 = text.substring(0, selection.start);
        let text_2 = prepend+text.substring(selection.start, selection.end)+append;
        let text_3 = text.substring(selection.end, text.length);
        this.set('text', text_1+text_2+text_3);
    },
    actions: {
        bold: function() {
            const bold = "__";
            this.decorate(bold, bold);
        },
        italic: function() {
            const italic = "*";
            this.decorate(italic, italic);
        }, 
        heading: function() {
            const heading = "### ";
            this.decorate("### ", "\n");
        },
        preview: function() {
            this.toggleProperty('edit');
        },
        showModal: function(modalID) {
            this.sendAction("showModal", modalID);
            return true;
        },
        selectImage: function() {
            let deferred = this.attrs.selectImage();
            console.log(deferred);
            deferred.promise.then(function(value) {
                console.log(value);
            }, function(reason) {
                console.log(reason);
            });
        }
    }
});
