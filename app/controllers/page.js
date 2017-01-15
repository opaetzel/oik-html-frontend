import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service('session'),
    currentUser: Ember.inject.service(),
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
        logout: function() {
            this.get('session').invalidate();
        },
        radioClicked: function(val, row) {
            let user = this.get('currentUser.user');
            if(user) {
                let rowId = parseInt(row.get('id'));
                let idx = user.get('clickedArguments').indexOf(rowId);
                let points = 0;
                console.log(user.get('clickedImages'));
                if(idx<0) {
                    //has not yet been clicked, 5 points!
                    points = 5;
                    user.get('clickedArguments').push(rowId);
                } else {
                    points = 2;
                }
                user.set('points', user.get('points') + points);
                this.send('showSuccess', points);
                user.save();
            }
        },
        imageClicked: function(_imageId) {
            let imageId = parseInt(_imageId);
            let user = this.get('currentUser.user');                                                                                 
            if(user) {
                let clickedImages = user.get('clickedImages');
                let points = 0;
                let idx = clickedImages.indexOf(imageId);
                console.log("imageIndex", idx);
                if(idx<0) {
                    points = 5;
                    clickedImages.push(imageId);
                } else {
                    points = 2;
                }
                user.set('points', user.get('points') + points);
                this.send('showSuccess', points);
                user.save();
            }
        },
        showSuccess: function(addedPoints) {
            let user = this.get('currentUser.user');
            let userPoints = user.get('points');
            this.set('successMessage', `+${addedPoints} Punkte! Neue Punktzahl: ${userPoints}`);
            Ember.$('#successMessage').fadeIn();
            setTimeout(() => {
                Ember.$('#successMessage').fadeOut();
            }, 2200);
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
                        { key: "Accept", value: "*/*"}
                    ];
                    if(token) {
                        headers.push({ key: "Authorization", value: "Bearer " + token});
                    }
                    this.get('store').findRecord('rotate-image', this.get('model.unit.rotateImage.id')).then( (rotateImage) => {
                        let viewer = new Viewer("rotate-canvas", "api/get-rotate-image/" + rotateImage.get('id') + "/", rotateImage.get('numImages'), headers, false);
                        this.set('rotateViewer', viewer);
                    });
                } else {
                    let viewer = this.get('rotateViewer');
                    viewer.renderImage();
                }
            });
        },
        viewerFS: function() {
            if(this.get('rotateViewer')) {
                this.get('rotateViewer').fullscreen();
            }
        },
        goto: function(pageType) {
            let gotoPage = this.get('model.unit.pages').find(function(item, index) {
                 return item.get('page_type') === pageType;
             });
            this.transitionToRoute('page', this.get('model.unit.id'), gotoPage.get('id'));
        }
    }
});
