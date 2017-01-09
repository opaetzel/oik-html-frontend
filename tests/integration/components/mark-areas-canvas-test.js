import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mark-areas-canvas', 'Integration | Component | mark areas canvas', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mark-areas-canvas}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mark-areas-canvas}}
      template block text
    {{/mark-areas-canvas}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
