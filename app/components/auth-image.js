import Ember from 'ember';

export default Ember.Component.extend({
    imageCache: Ember.inject.service(),
    didRender: function() {
        this._super(...arguments);
        let imageSrc = this.getProperties('imageSrc').imageSrc;
        let imageId = this.getProperties('imageId').imageId;
        if(imageId === undefined || isNaN(imageId) || imageId == null) {
            return;
        }
        imageSrc = imageSrc.replace("${id}", imageId);
        this.get('imageCache').getImage(imageSrc).then( value => {
            document.querySelector("#"+this.get('elementId')).children[0].src = value;
        }).catch( reason => {
            console.log(reason);
        });
    }
});
