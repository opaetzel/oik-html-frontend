import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        addRow: function() {
            let model = this.get('model');
            this.get('model.page.rows').pushObject({left_markdown: "", right_markdown: ""});
        }
    }
});
