import Ember from 'ember';
import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
    title: attr(),
    page_type: attr(),
    unit_id: attr(),
    rows: hasMany('row'),
    extendable: Ember.computed(function() {
        let pageType = this.get('page_type');
        return (pageType === "hearing-pro" || pageType === "hearing-con");
    }),
    unit: belongsTo('unit')
});
