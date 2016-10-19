import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service('session'),
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
            Ember.$('#rotate-modal').modal('show');
            Ember.$('#rotate-modal').on('shown.bs.modal', () => {
                console.log('shown');
                let $canvas = Ember.$('#rotate-canvas');
                $canvas.attr('width', $canvas.width());
                $canvas.attr('height', $canvas.height());
                if(!this.get('rotateViewer')) {
                    const token = this.get('session.data.authenticated.token');
                    let headers = [
                        { key: "Accept", value: "*/*"},
                        { key: "Authorization", value: "Bearer " + token}
                    ];
                    this.get('store').findRecord('rotate-image', this.get('model.unit.rotateImage.id')).then( (rotateImage) => {
                        let viewer = new Viewer("rotate-canvas", "api/get-rotate-image/" + rotateImage.get('id') + "/", rotateImage.get('numImages'), headers, false);
                        this.set('rotateViewer', viewer);
                    });
                } else {
                    let viewer = this.get('rotateViewer');
                    viewer.renderImage();
                }
            });
        }
    }
});
