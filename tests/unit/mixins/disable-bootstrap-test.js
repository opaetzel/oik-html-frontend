import Ember from 'ember';
import DisableBootstrapMixin from 'oik-html-frontend/mixins/disable-bootstrap';
import { module, test } from 'qunit';

module('Unit | Mixin | disable bootstrap');

// Replace this with your real tests.
test('it works', function(assert) {
  let DisableBootstrapObject = Ember.Object.extend(DisableBootstrapMixin);
  let subject = DisableBootstrapObject.create();
  assert.ok(subject);
});
