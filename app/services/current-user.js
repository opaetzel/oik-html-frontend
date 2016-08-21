import Ember from 'ember';

const { inject: { service }, isEmpty, RSVP } = Ember;

export default Ember.Service.extend({
    session: service('session'),
    store: service(),

    load() {
        return new RSVP.Promise((resolve, reject) => {
            const token = this.get('session.data.authenticated.token');
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
