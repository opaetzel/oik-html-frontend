import Ember from 'ember';
import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
    centerX: attr('number'),
    centerY: attr('number'),
    radius: attr('number')
});
