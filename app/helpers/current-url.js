import Ember from 'ember';

export function currentUrl(params/*, hash*/) {
  return window.location.href;
}

export default Ember.Helper.helper(currentUrl);
