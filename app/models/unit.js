import DS from 'ember-data';
import Ember from 'ember';
import attr from 'ember-data/attr';
import { hasMany, belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
    title: attr(),
    pageIds: attr(),
    published: attr(),
    color_scheme: attr(),
    currentPage: attr('number'),
    userId: attr(),
    images: hasMany('image'),
    pages: hasMany('page', {async: true}),
    user: belongsTo('user'),
    rotateImage: belongsTo('rotate-image'),
    front_image: attr('number'),
    results: hasMany('page-result'),
    unitResults: belongsTo('unit-results'),
    unitResult: belongsTo('unit-result'),
    maxWitnessArr: Ember.computed('results', function() {
        let maxSize = 0;
        this.get('results').forEach((result) => {
            if(result.get('rowResults.length')>maxSize) {
                maxSize = result.get('rowResults.length');
            }
        });
        let arr = Ember.A();
        for(var i=1; i <= maxSize; i++) {
            arr.pushObject(i)
        }
        return arr;
    }),
    availableSchemes: Ember.computed(function() { 
        return [1,2,3,4,5,6,7,8];
    })
});
