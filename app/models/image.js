import Ember from 'ember';
import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
    session: Ember.inject.service('session'),
    imageCache: Ember.inject.service(),
    caption: attr(),
    credits: attr(),
    name: attr(),
    ageKnown: attr('boolean'),
    age: attr('number'),
    imprecision: attr('number'),
    blobUrl: Ember.computed('id', 'uploaded', function() {
        if(!this.get('uploaded')) {
            return;
        }
        let imageId = this.get('id');
        if(imageId === undefined || isNaN(imageId) || imageId == null) {
            return;
        }
        let imageSrc = "/api/get-image/" + imageId;
        this.get('imageCache').getImage(imageSrc).then( value => {
            this.set("blobUrl", value);
        });
    }),
    unit: belongsTo('unit'),
    selected: attr('boolean'),
    uploaded: Ember.computed(function() {
        return !this.get('isNew');
    })
});
