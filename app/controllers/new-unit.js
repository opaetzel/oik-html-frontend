import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        save: function() {
            let unit = this.get('model');
            unit.save();
        },
        saveAndNext: function() {
            let unit = this.get('model');
            let self = this;
            unit.save().then(function(unit) {
                self.transitionToRoute("new-page", unit.get('id'), "opening");
            });
        }
    }
});
