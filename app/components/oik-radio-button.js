import Ember from 'ember';
import RadioButtonComponent from 'ember-radio-button/components/radio-button'

export default RadioButtonComponent.extend({
    actions: {
        changed(newValue) {
            this.sendAction('changed', newValue, this.get('row'))
        }
    }
});
