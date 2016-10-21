import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        register: function() {
            this.set('error', false);
            this.set('errormessage', null);
            let credentials = this.getProperties('username', 'email', 'password');
            console.log(credentials);
            let newUser = this.get('store').createRecord('newuser', credentials);
            console.log(credentials);
            newUser.save().then( () => {
                this.set('sent', true);
            }).catch( (error) => {
                if(error.errors[0].status === "409") {
                    this.set('errormessage', "Username bereits vergeben");
                } else {
                    this.set('error', true);
                }
            });
        },
        newUser: function() {
            this.set('sent', false);
        }
    }
});
