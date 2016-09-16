import Ember from 'ember';

export function isNotFirst(params/*, hash*/) {
    let page = params[0];
    let pages = params[1];
    return pages.indexOf(page) != 0;
}

export default Ember.Helper.helper(isNotFirst);
