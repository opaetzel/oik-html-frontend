import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
    title: attr(),
    rows: attr(),
    unit_id: attr()
});
