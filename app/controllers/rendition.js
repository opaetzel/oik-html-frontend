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
            user.set('points', user.get('points') + 5);
            this.get('currentUser.user').save();
        }
    }
});
