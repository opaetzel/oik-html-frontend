import Ember from 'ember';
import Remarkable from 'remarkable';
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
    parsedMarkdownUnsafe: computed('text', 'html', 'typographer', 'linkify', function() {
        var md = new Remarkable({
            typographer: this.get('typographer'),
            linkify:     this.get('linkify'),
            html:        this.get('html'),

            highlight: function (str, lang) {
                if (lang === 'text' || lang === 'no-highlight') {
                    return '';
                }

                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return hljs.highlight(lang, str).value;
                    } catch (err) {
                    }
                }

                try {
                    return hljs.highlightAuto(str).value;
                } catch (err) {
                }

                return '';
            }
        });

        if (this.get('extensions')) {
            md.core.ruler.enable([
                    'abbr'
            ]);
            md.block.ruler.enable([
                    'footnote',
                    'deflist'
            ]);
            md.inline.ruler.enable([
                    'footnote_inline',
                    'ins',
                    'mark',
                    'sub',
                    'sup'
            ]);
        }
        //overwrite the footnote rules with what we will need:
        let location = window.location.href;
        location = location.replace(/#.*?$/, "");
        md.renderer.rules.footnote_ref = function (tokens, idx) {
            var n = Number(tokens[idx].id + 1).toString();
            var id = 'fnref' + n;
            if (tokens[idx].subId > 0) {
                id += ':' + tokens[idx].subId;
            }
            return '<sup class="footnote-ref"><a href="' + location + '#fn' + n + '" id="' + id + '">[' + n + ']</a></sup>';
        };

        md.renderer.rules.footnote_anchor = function (tokens, idx) {
            var n = Number(tokens[idx].id + 1).toString();
            var id = 'fnref' + n;
            if (tokens[idx].subId > 0) {
                id += ':' + tokens[idx].subId;
            }
            return ' <a href="' + location + '#' + id + '" class="footnote-backref">↩</a>';
        };

        return md.render(this.get('text'));
    }),
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
setSelectionRange: function(selectionStart, selectionEnd) {
        let e = Ember.$('#' + this.get('elementId')).find("textarea");
        e = e[0];
    e.focus();
    e.setSelectionRange(selectionStart, selectionEnd);
},
    decorate: function(prepend, append) {
        let text = this.get('text');
        let selection = this.getSelection();
        let text_1 = text.substring(0, selection.start);
        let text_2 = prepend+text.substring(selection.start, selection.end)+append;
        let text_3 = text.substring(selection.end, text.length);
        this.set('text', text_1+text_2+text_3);
    },
    compEdit: computed('edit', 'innerEdit', function() {
        let edit = this.get('edit');
        let innerEdit = this.get('innerEdit');
        if(innerEdit === undefined || innerEdit === null) {
            return edit;
        } else {
            return innerEdit;
        }
    }),
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
            let innerEdit = this.get('innerEdit');
            if(innerEdit === undefined || innerEdit === null) {
                this.set('innerEdit', !this.get('edit'));
            } else {
                this.toggleProperty('innerEdit');
            }
        },
        selectImage: function() {
            let deferred = this.attrs.selectImage();
            let oik_md = this;
            deferred.promise.then(function(value) {
                oik_md.set('image', value);
            }, function(reason) {
                console.log(reason);
            });
        },
        addFootnote: function () {
            let text = this.get('text');
            let selection = this.getSelection();
            let id = text.substring(selection.start, selection.end);
            this.decorate('[^', ']');
            this.set('text', this.get('text') + '\n\n[^'+id+']: ');
            let endPos = this.get('text.length');
            this.setSelectionRange(endPos, endPos);
        }
    }
});
