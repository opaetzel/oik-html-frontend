/*
 * These are the results for a single user for a unit.
 * The results over all users for a unit are in models/unit-results.js
*/

import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
    decision: attr()
});
