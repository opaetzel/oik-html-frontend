import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        save: function() {
            this.set('statusMessage', '');
            this.set('errorMessage', '');
            this.get('model').save().then( () => {
                this.set('model', this.get('store').createRecord('newPasswordRequest'));
                this.set('statusMessage', 'Es wurde eine E-Mail an Ihre Adresse verschickt. Bitte folgen Sie den Anweisungen in der Mail.');
            }, (reason) => {
                let username = this.get('model.username');
                let mail = this.get('model.email');
                this.set('model', this.get('store').createRecord('newPasswordRequest'));
                let model = this.get('model');
                model.set('username', username);
                model.set('email', mail);
                this.set('errorMessage', 'Etwas ist schief gelaufen. Evtl. passt die Mailadresse nicht zum Nutzernamen?');
            });
        }
    }
});
