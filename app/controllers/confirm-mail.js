import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        sendConfirm: function() {
            new Ember.RSVP.Promise(function(resolve, reject) {
                let token = this.get('model.token');
                let claims = JSON.parse(atob(token.split('.')[1]));
                if(!Ember.isEmpty(claims)) {
                    let user = { user: {
                        name: claims.name,
                        active: true,
                        id: claims.uid
                    }};
                    let xhr = new XMLHttpRequest();
                    xhr.open("POST", "/api/users/"+claims.uid);
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                    xhr.setRequestHeader("Accept", "*/*");
                    xhr.responseType = "JSON";
                    xhr.onerror = (e) => {
                        reject(e);
                    };
                    xhr.onload = () => {
                        resolve();
                    };
                    xhr.send(JSON.stringify(user)); 
                }
            }).then(function() {
                this.set('model.confirmed', true);
            }).catch(function(error) {
                this.set('errorMessage', error);
            });
        }
    }
});
