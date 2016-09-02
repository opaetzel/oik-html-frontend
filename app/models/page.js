import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
    title: attr(),
    page_type: attr(),
    unit_id: attr(),
    rows: hasMany('row'),
    unit: belongsTo('unit')
});
