import Ember from 'ember';

export default Ember.Mixin.create({
    actions: {
        willTransition() {
            Ember.$('.popover').popover('hide');
            window.scrollTo(0,0);
        }
    }
});
