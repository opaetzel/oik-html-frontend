import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        saveUsers: function() {
            this.get('model.users').forEach(function(item) {
                item.save();
            });
        }
    }
});
