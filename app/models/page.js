import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
    title: attr(),
    rows: attr(),
    page_type: attr(),
    unit_id: attr(),
    unit: belongsTo('unit')
});
