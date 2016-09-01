import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        register: function() {
            this.set('error', false);
            let credentials = this.getProperties('username', 'password');
            console.log(credentials);
            let newUser = this.get('store').createRecord('newuser', credentials);
            console.log(credentials);
            newUser.save().then( () => {
                this.set('sent', true);
            }).catch( () => {
                this.set('error', true);
            });
        },
        newUser: function() {
            this.set('sent', false);
        }
    }
});
