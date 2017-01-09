import Ember from 'ember';

const { inject: { service }, RSVP } = Ember;

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
                xhr.onreadystatechange = (e) => {
                    if(xhr.readyState === 4) {
                        if(xhr.status === 200) {
                            let urlCreator = window.URL || window.webkitURL;
                            let imageUrl = urlCreator.createObjectURL(e.target.response);
                            this.set(`cachedImages.${url}`, imageUrl);
                            resolve(imageUrl);
                        } else {
                            console.log("image rejected");
                            reject(e);
                        }
                    }
                };
                xhr.send(); 
                
            } else {
                resolve(element);
            }
        });
    }
});
