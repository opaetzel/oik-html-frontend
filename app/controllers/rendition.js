import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service('session'),
    currentUser: Ember.inject.service(),
    actions: {
        logout: function() {
            this.get('session').invalidate();
        },
        saveResults: function() {
            this.get('model.results').forEach(function(item) {
                item.save();
            });
            let user = this.get('currentUser.user');
            this.get('currentUser.user').save();
        }
    }
});
