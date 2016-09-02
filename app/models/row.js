import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
    left_markdown: attr(),
    right_markdown: attr(),
    leftImage: belongsTo('image'),
    rightImage: belongsTo('image')
});
