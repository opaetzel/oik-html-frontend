import Ember from 'ember';

export default Ember.Controller.extend({
    sortMode: ['rank:asc'],
    sortedUsers: Ember.computed.sort('model', 'sortMode')
});
