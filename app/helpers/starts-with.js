import Ember from 'ember';

export function startsWith(params/*, hash*/) {
    return params[0].startsWith(params[1]);
}

export default Ember.Helper.helper(startsWith);
