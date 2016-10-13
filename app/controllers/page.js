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

        },
        showRotateImage: function() {
            if(!this.get('rotateViewer')) {
                const token = this.get('session.data.authenticated.token');
                let headers = [
                    { key: "Accept", value: "*/*"},
                    { key: "Authorization", value: "Bearer " + token}
                ];
                let viewer = new Viewer("rotate-canvas", "api/rotate-images/" + this.get('model.unit.rotateImageId') + "/", 36, headers);
                this.set('rotateViewer', viewer);
            }
            Ember.$('#rotate-modal').modal('show');
        }
    }
});
