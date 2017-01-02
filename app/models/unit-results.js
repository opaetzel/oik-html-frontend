/*
 * These are the results over all users for a unit
 * The results for a single user are in models/unit-result.js
*/

import DS from 'ember-data';
import attr from 'ember-data/attr';
import { hasMany, belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
    proCount: attr(),
    conCount: attr(),
    undecidedCount: attr(),
    unit: belongsTo('unit')
});
