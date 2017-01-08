import Ember from 'ember';
import DS from 'ember-data';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
    name: attr('string'),
    groups: attr(),
    units: hasMany('unit', {async: true}),
    points: attr('number'),
    isAdmin: Ember.computed('groups', {
        get(key) {
            return this.get('groups').indexOf('admin') >= 0;
        },
        set(key, value) {
            let index = this.get('groups').indexOf('admin');
            if(!value && index >= 0) {
                this.get('groups').splice(index, 1);
            }
            if(value && index < 0) {
                this.get('groups').push('admin');
            }
        }
    }),
    isEditor: Ember.computed('groups', {
        get(key) {
            return this.get('groups').indexOf('editor') >= 0;
        },
        set(key, value) {
            let index = this.get('groups').indexOf('editor');
            if(!value && index >= 0) {
                this.get('groups').splice(index, 1);
            }
            if(value && index < 0) {
                this.get('groups').push('editor');
            }
        }
    }),
    clickedArguments: hasMany('row'),
    clickedImages: [],
    active: attr(),
    rank: attr()
});
