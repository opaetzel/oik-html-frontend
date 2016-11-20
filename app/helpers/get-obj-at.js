import Ember from 'ember';

export function getObjAt(params/*, hash*/) {
    let array = params[0];
    let idx = params[1];
    let property = params[2];
    if(property) {
        return array.objectAt(idx).get(property);
    } else {
        return array.objectAt(idx);
    }
}

export default Ember.Helper.helper(getObjAt);
