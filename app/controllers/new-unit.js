import Ember from 'ember';

export default Ember.Controller.extend({
    currentUser: Ember.inject.service(),
    actions: {
        cancel: function() {
            let unit = this.get('model');
            unit.deleteRecord();
            this.transitionToRoute('units');
        },
        save: function() {
            let unit = this.get('model');
            unit.set('user', this.currentUser.get('user'));
            unit.save();
        },
        saveAndNext: function() {
            let unit = this.get('model');
            unit.set('user', this.get('currentUser.user'));
            let self = this;
            unit.save().then(function(unit) {
                self.transitionToRoute("new-page", unit.get('id'), "opening");
            });
        }
    }
});
