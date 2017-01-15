import Ember from 'ember';

export default Ember.Route.extend({
    session: Ember.inject.service(),
    model(params) {
        var credentials = {identification: "", password: params.token},
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
        return null;
    }
});
