import Ember from 'ember';

export function isNotLast(params/*, hash*/) {
    let page = params[0];
    let pages = params[1];
    return page.id != pages.get('lastObject').id;
}

export default Ember.Helper.helper(isNotLast);
