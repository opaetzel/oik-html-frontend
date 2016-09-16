// app/controllers/login.js
import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service('session'),
    currentUser: Ember.inject.service('current-user'),

    actions: {
        authenticate: function() {
            var credentials = this.getProperties('identification', 'password'),
            authenticator = 'authenticator:jwt';

            this.get('session').authenticate(authenticator, credentials).then(() => {
            }, (reason) => {
                if(reason.error) {
                    if(reason.error.code === 401) {
                        this.set('errorMessage', "Username oder Passwort falsch");
                    }
                } else {
                    this.set('errorMessage', "Unbekannter Fehler");
                }
            });
        },
        logout: function() {
            console.log("logging out...");
            this.get('session').invalidate();
        }
    }
});
