import Ember from 'ember';

export function idValid(params/*, hash*/) {
  let id = params[0];
  return !(id === undefined || isNaN(id) || id == null || id === 0);
}

export default Ember.Helper.helper(idValid);
