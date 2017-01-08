import Ember from 'ember';

export default Ember.Controller.extend({
    sortMode: ['points:desc'],
    sortedUsers: Ember.computed.sort('model', 'sortMode')
});
