import Ember from 'ember';

export default Ember.Mixin.create({
    actions: {
        willTransition: function() {
            this._super();
            window.scrollTo(0,0);
        }
    }
});
