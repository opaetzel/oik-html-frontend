import Ember from 'ember';

const { inject: { service }, isEmpty, RSVP } = Ember;

export default Ember.Service.extend({
    session: service('session'),
    init() {
        if(!this.get('cachedImages')) {
            this.set('cachedImages', Ember.Object.create());
        }
    },

    getImage(url) {
        return new RSVP.Promise((resolve, reject) => {
            let element = this.get(`cachedImages.${url}`);
            if (!element) {
                const token = this.get('session.data.authenticated.token');
                let xhr = new XMLHttpRequest();
                xhr.open("GET", url);
                xhr.setRequestHeader("Authorization", "Bearer " + token);
                xhr.setRequestHeader("Accept", "*/*");
                xhr.responseType = "blob";
                xhr.onerror = (e) => {
                    reject(e);
                };
                xhr.onload = (e) => {
                    let urlCreator = window.URL || window.webkitURL;
                    let imageUrl = urlCreator.createObjectURL(this.response);
                    this.set(`cachedImages.${url}`, imageUrl);
                    resolve(imageUrl);
                }
                xhr.send(); 
                
            } else {
                resolve(element);
            }
            if(!isEmpty(token)) {
                let claims = JSON.parse(atob(token.split('.')[1]));
                if(!isEmpty(claims)) {
                    return this.get('store').findRecord('user', claims.uid).then((user) => {
                        this.set('user', user);
                        resolve();
                    }, reject);
                } else {
                    resolve();
                }
            } else {
                resolve();
            }
        });
    }
});
