import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
    name: attr('string'),
    groups: attr('Ember.Array'),
    isAdmin: Ember.computed('groups', function() {
        return this.get('groups').indexOf('admin') >= 0;
    }) 
});
