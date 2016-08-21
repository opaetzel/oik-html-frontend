import DS from 'ember-data';
import attr from 'ember-data/attr';
import { hasMany, belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
    title: attr(),
    rotateImageId: attr('number'),
    pageIds: attr(),
    published: attr(),
    color_scheme: attr(),
    currentPage: attr('number'),
    userId: attr(),
    pages: hasMany('page', {async: true}),
    user: belongsTo('user')
});
