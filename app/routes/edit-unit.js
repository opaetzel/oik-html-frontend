import Ember from 'ember';

export default Ember.Route.extend({
    currentUser: Ember.inject.service('current-user'),
    model(params) {
        return this.store.findRecord('unit', params.unit_id)
    },
    beforeModel(transition) {
        if(!(this.get('currentUser.user')) || !(this.get('currentUser.user.groups').indexOf('editor') > -1)) {
            this.transitionTo('index');
        }
    },
    afterModel(model) {
        console.log(model.get('rotateImage.id'));
        if(!model.get('rotateImage.id') || model.get('rotateImage.id') == 0) {
            console.log("model kaputt");
            let rotateImage = this.get('store').createRecord('rotate-image');
            model.set('rotateImage', rotateImage);
        }
    }
});
