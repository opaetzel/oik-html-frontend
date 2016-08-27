import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
    caption: attr(),
    credits: attr(),
    name: attr(),
    reload: attr('boolean'),
    dlId: Ember.computed('reload', function() {
        return this.get('id');
    }),
    blobUrl: attr(),
    unit: belongsTo('unit'),
    selected: attr('boolean')
});
