import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo, hasMany} from 'ember-data/relationships';

export default DS.Model.extend({
    decision: attr('string', { defaultValue: 'abstention' }),
    pageResult: belongsTo('pageResult'),
    row: belongsTo('row')
});
