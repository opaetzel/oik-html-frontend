import Ember from 'ember';

export default Ember.Component.extend({
    imageCache: Ember.inject.service(),
    tagName: 'canvas',
    width: 400,
    height: 400,
    attributeBindings: ['width', 'height'],
    didInsertElement: function() {
        this.set('ctx', this.get('element').getContext('2d'));
        this.draw();
    },
    draw: function() {
        if(!this.get('image')) {
            this.getImage().then( () => {
                this.draw();
            });
            return;
        }
        this.clear()
        let ctx = this.get('ctx');
        let foundCircles = this.get('foundCircles');
        if(!foundCircles) {
            if(this.get('showErrors')) {
                foundCircles = [];
                this.get('errorImage.errorCircles').forEach( (circle) => {
                    foundCircles.push(circle.get('id'));
                });
                this.set('foundCircles', foundCircles);
            } else {
                return;
            }
        }
        this.get('errorImage.errorCircles').forEach( (circle)=> {
            if(foundCircles.indexOf(circle.get('id'))<0) {
                return;
            }
            ctx.beginPath();
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 1;
            ctx.arc(circle.get('centerX'), circle.get('centerY'), circle.get('radius')+1, 2*Math.PI, false);
            ctx.stroke();
            ctx.beginPath();
            ctx.strokeStyle = '#eee';
            ctx.arc(circle.get('centerX'), circle.get('centerY'), circle.get('radius'), 2*Math.PI, false);
            ctx.stroke();
        });
    },
    getImage: function() {
        let tryGetImageCount = this.get('tryGetImageCount');
        if(tryGetImageCount && tryGetImageCount > 2) {
            return;
        }
        if(tryGetImageCount === undefined) {
            this.set('tryGetImageCount', 0);
        } else {
            this.set('tryGetImageCount', tryGetImageCount+1);
        }
        let imageId = this.get('errorImage.id');
        let imageSrc = "/api/get-error-image/" + imageId;
        return new Promise( (resolve, reject) => { 
            this.get('imageCache').getImage(imageSrc).then( blobUrl => {
                let img = new Image();
                img.onload = () => {
                    if(!this.get('errorImage.scale')) {
                        let scale = this.get('width')/img.width;
                        if(scale*img.height>this.get('height')) {
                            scale = this.get('height')/img.height;
                        }
                        this.get('errorImage').set('scale', scale);
                    }
                    this.set('image', img);
                    resolve();
                };
                img.src = blobUrl;
            }, reason => { 
                resolve();
            });
        });
    },
    clear: function() {
        let ctx = this.get('ctx');
        ctx.clearRect(0,0,this.get('width'), this.get('height'));
        let img = this.get('image');
        let scale = this.get('errorImage.scale');
        ctx.drawImage(img, 0, 0, img.width*scale, img.height*scale);
    },
    click: function(event) {
        //check for hits
        let firstHit = this.get('errorImage.errorCircles').find( (item) => {
            let x0 = item.get('centerX');
            let y0 = item.get('centerY');
            let x1 = event.offsetX;
            let y1 = event.offsetY;
            let dist = Math.sqrt((x1-x0)*(x1-x0) + (y1-y0)*(y1-y0));
            return dist < item.get('radius');
        });
        if(firstHit) {
            let foundCircles = this.get('foundCircles');
            if(!foundCircles) {
                foundCircles = [];
                this.set('foundCircles', foundCircles);
            }
            let id = firstHit.get('id');
            if(foundCircles.indexOf(id)<0) {
                foundCircles.push(id);
                this.attrs.foundError();
            }
            if(foundCircles.length === this.get('errorImage.errorCircles.length')) {
                this.set('foundAll', true);
                this.attrs.foundAll();
            }
            this.draw();
        }
    }
});
