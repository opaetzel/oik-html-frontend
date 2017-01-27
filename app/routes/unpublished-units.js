import Ember from 'ember';
import ResetScrollPositionMixin from '../mixins/reset-scroll-position';

export default Ember.Route.extend(ResetScrollPositionMixin, {
    currentUser: Ember.inject.service('current-user'),
    beforeModel() {
        if(!(this.get('currentUser.user.groups').indexOf('editor') > -1)) {
            this.transitionTo('index');
        }
    },
    model() {
        return this.store.query('unit', { filter: {published: false}})
    }
});
