import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
    title: attr(),
    rotateImageId: attr('number'),
    pageIds: attr(),
    published: attr(),
    userId: attr()
});
