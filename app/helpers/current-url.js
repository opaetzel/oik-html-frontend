import Ember from 'ember';

export function currentUrl(params/*, hash*/) {
    let location = window.location.href;
    console.log("old location:", location);
    location = location.replace(/#.*?$/, "");
    console.log("returning: ", location);
  return location;
}

export default Ember.Helper.helper(currentUrl);
