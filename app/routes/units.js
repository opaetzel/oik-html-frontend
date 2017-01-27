import Ember from 'ember';
import ResetScrollPositionMixin from '../mixins/reset-scroll-position';

export default Ember.Route.extend(ResetScrollPositionMixin, {
    session: Ember.inject.service('session'),
    
    model() {
        return this.store.findAll('unit');
    }
});
