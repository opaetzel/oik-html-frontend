import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        save: function() {
            let unit = this.get('model');
            unit.save();
        }
    }
});
