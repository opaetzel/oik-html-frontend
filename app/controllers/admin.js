import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        saveUsers: function() {
            this.get('model.users').forEach(function(item) {
                item.save();
            });
        },
        saveUnits: function() {
            this.get('model.units').forEach(function(item) {
                item.save();
            });
        },
        deleteUnitConfirm: function(unit) {
            this.set('deleteUnit', unit);
            Ember.$('#confirmDelete').modal('show');
        },
        deleteUnit: function() {
            let deleteUnit = this.get('deleteUnit');
            if(deleteUnit) {
                deleteUnit.deleteRecord();
                deleteUnit.save();
            }
        }
    }
});
