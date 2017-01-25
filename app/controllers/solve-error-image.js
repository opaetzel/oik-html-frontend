import Ember from 'ember';

export default Ember.Controller.extend({
    currentUser: Ember.inject.service(),
    actions: {
        showSuccess: function(addedPoints) {
            let user = this.get('currentUser.user');
            let userPoints = user.get('points');
            this.set('successMessage', `+${addedPoints} Punkte! Neue Punktzahl: ${userPoints}`);
            Ember.$('#successMessage').fadeIn();
            setTimeout(() => {
                Ember.$('#successMessage').fadeOut();
            }, 2200);
        },
        foundError: function() {
            let addedPoints = 10;
            let user = this.get('currentUser.user');
            user.set('points', user.get('points') + addedPoints);
            this.send('showSuccess', addedPoints);
        },
        foundAll: function() {
            this.set('imageSolved', true);
        }
    }
});
