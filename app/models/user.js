import Ember from 'ember';
import DS from 'ember-data';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
    name: attr('string'),
    groups: attr(),
    units: hasMany('unit', {async: true}),
    isAdmin: Ember.computed('groups', function() {
        return this.get('groups').indexOf('admin') >= 0;
    }),
    active: attr()
});
