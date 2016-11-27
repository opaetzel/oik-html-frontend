import DS from 'ember-data';
import attr from 'ember-data/attr';
import { hasMany, belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
    proCount: attr(),
    conCount: attr(),
    undecidedCount: attr(),
    unit: belongsTo('unit')
});
