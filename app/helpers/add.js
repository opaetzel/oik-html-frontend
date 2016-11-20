import Ember from 'ember';

export function add(params/*, hash*/) {
  return parseInt(params[0])+parseInt(params[1]);
}

export default Ember.Helper.helper(add);
