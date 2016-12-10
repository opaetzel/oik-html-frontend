import DS from 'ember-data';
import { belongsTo, hasMany} from 'ember-data/relationships';
import attr from 'ember-data/attr';

export default DS.Model.extend({
    rowResults: hasMany('result'),
    totalResult: Ember.computed( 'rowResults.@each.decision', function() {
        this.set('foo', !this.get('foo'));
        let resultMap = {};
        this.get('rowResults').forEach(function(result) {
            if(resultMap[result.get('decision')]) {
                resultMap[result.get('decision')] += 1;
            } else {
                resultMap[result.get('decision')] = 1;
            }
        });
        let maxVal = "";
        for(var key in resultMap) {
            if(maxVal === "") {
                maxVal = key;
                continue;
            }
            if(resultMap[key] > resultMap[maxVal]) {
                maxVal = key;
            }
        }
        console.log(resultMap);
        return maxVal;
    }),
    page: belongsTo('page'),
    unit: belongsTo('unit')
});
