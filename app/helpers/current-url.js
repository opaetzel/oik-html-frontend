import Ember from 'ember';

export function currentUrl(params/*, hash*/) {
    let location = window.location.href;
    location = location.replace(/#.*?$/, "");
  return location;
}

export default Ember.Helper.helper(currentUrl);
