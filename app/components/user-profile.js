import Ember from 'ember';

export default Ember.Component.extend({
    currentUser: Ember.inject.service(),
    passwordsNotEq: Ember.computed('password', 'passwordRepeat', function() {
        return !(this.get('password') === this.get('passwordRepeat'));
    }),
    actions: {
        savePW: function() {
            this.get('currentUser.user').set('newPw', this.get('password'));
            this.get('currentUser.user').save().then( () => {
                this.set('pwMessage', 'Passwort erfolgreich geändert');
                this.set('password', '');
                this.set('passwordRepeat', '');
            }, () => {
                this.set('pwErrorMessage', 'Fehler beim ändern des Passworts');
            });
        }
    }
});
