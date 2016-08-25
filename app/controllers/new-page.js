import Ember from 'ember';

export default Ember.Controller.extend({
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
        }
    }
});
