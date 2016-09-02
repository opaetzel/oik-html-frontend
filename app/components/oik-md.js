import Ember from 'ember';
import EmberRemarkableComponent from 'ember-remarkable/components/md-text';

const {computed} = Ember;

export default EmberRemarkableComponent.extend({
    /*image: Ember.computed('imageId', function() {
        let self = this;
        if(this.get('imageId') === undefined || this.get('imageId') === 0) {
            this.set('image', null);
            return;
        }
        this.get('targetObject.store').findRecord('image', this.get('imageId')).then(function(image) {
            self.set('image', image);
        });
    }),*/
    parsedMarkdownCites: computed('parsedMarkdownUnsafe', 'image', function () {
        let parsedMarkdown = this.get('parsedMarkdownUnsafe');
        let image = this.get('image');
        let retMarkdown = parsedMarkdown;
        if(image) {
            retMarkdown = retMarkdown.replace('${blob-link}', image.get('blobUrl'));
        }
        return new Ember.Handlebars.SafeString(retMarkdown);
    }),
    getSelection: function() {
        let e = Ember.$('#' + this.get('elementId')).find("textarea");
        e = e[0];
        return {
            start: e.selectionStart,
            end: e.selectionEnd
        };
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
            this.decorate("### ", "\n");
        },
        preview: function() {
            this.toggleProperty('edit');
        },
        selectImage: function() {
            let deferred = this.attrs.selectImage();
            let oik_md = this;
            let imageTemplate = '![${caption}](${blob-link} "${caption}")\n\n${caption}: ${credits}';
            deferred.promise.then(function(value) {
                oik_md.decorate(imageTemplate.replace(/\$\{caption\}/g, value.get('caption')).replace(/\$\{credits\}/g, value.get('credits')), "");
                oik_md.set('image', value);
            }, function(reason) {
                console.log(reason);
            });
        }
    }
});
