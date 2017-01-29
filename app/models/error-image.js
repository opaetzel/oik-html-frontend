import DS from 'ember-data';
import attr from 'ember-data/attr';
import { hasMany, belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
    imageId: attr(),
    correctImage: belongsTo('image'),
    scale: attr('number'),
    errorCircles: hasMany('circle'),
    user: belongsTo('user'),
    published: attr()
});
