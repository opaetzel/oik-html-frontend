import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
    username: attr(),
    email: attr()
});
