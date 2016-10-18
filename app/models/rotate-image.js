import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
    numImages: attr('number'),
    caption: attr(),
    credits: attr()
});
