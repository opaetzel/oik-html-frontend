import Ember from 'ember';

export function isEqualOr(params/*, hash*/) {
    return (params[0] === params[1] || params[0] === params[2]);
}

export default Ember.Helper.helper(isEqualOr);
