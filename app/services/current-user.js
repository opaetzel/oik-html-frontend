import Ember from 'ember';

const { inject: { service }, isEmpty, RSVP } = Ember;

export default Ember.Service.extend({
    session: service('session'),
    store: service(),

    load() {
        return new RSVP.Promise((resolve, reject) => {
            let token = this.get('session.data.authenticated.token');
            if(!isEmpty(token)) {
                let claims = JSON.parse(atob(token.split('.')[1]));
                if(!isEmpty(claims)) {
                    resolve(
                            this.set('user', this.get('store').createRecord('user', {
                                name: claims.name,
                                id: claims.uid,
                                groups: claims.groups
                            }))
                           );
                } else {
                    resolve();
                }
            } else {
                resolve();
            }
        });
    }
});
