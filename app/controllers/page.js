import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        nextPage: function() {
            let currentPage = this.get('model.unit.currentPage');
            let nextPage = this.get('model.unit.pages').find(function(item, index) {
                return index === currentPage+1;
            });
            this.transitionToRoute('page', this.get('model.unit.id'), nextPage.get('id'));
        },
        prevPage: function() {
            let currentPage = this.get('model.unit.currentPage');
            let prevPage = this.get('model.unit.pages').find(function(item, index) {
                return index === currentPage-1;
            });
            this.transitionToRoute('page', this.get('model.unit.id'), prevPage.get('id'));

        }
    }
});
