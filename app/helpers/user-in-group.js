import Ember from 'ember';

export function userInGroup(params/*, hash*/) {
    let user = params[0];
    let group = params[1];
    return (user.get('groups').indexOf(group) > -1);
}

export default Ember.Helper.helper(userInGroup);
