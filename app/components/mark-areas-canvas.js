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
    draw: Ember.observer('errorImage.errorCircles.@each.centerX', 'errorImage.errorCircles.@each.centerY', 'errorImage.errorCircles.@each.radius', function() {
        if(!this.get('image')) {
            this.getImage().then( () => {
                this.draw();
            });
            return;
        }
        this.clear()
        let ctx = this.get('ctx');
        this.get('errorImage.errorCircles').forEach( (circle)=> {
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
    }),
    getImage: function() {
        let imageId = this.get('errorImage.imageId');
        //TODO: change back to imageId
        let imageSrc = "/api/get-image/" + 32;//imageId;
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
    mouseDown: function(event) {
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
            this.set('dragger', firstHit);
            this.set('dist', {x: event.offsetX - firstHit.get('centerX'), y: event.offsetY - firstHit.get('centerY')});
            if(event.ctrlKey) {
                this.set('ctrlKey', true);
                let oldDist = this.get('dist');
                this.set('radiusDiff', firstHit.get('radius') - Math.sqrt(oldDist.x*oldDist.x + oldDist.y*oldDist.y))
            }
        }
    },
    mouseMove: function(event) {
        let dragger = this.get('dragger');
        if(!dragger) {
            return;
        }
        if(this.get('ctrlKey')) {
            let newDist = {x: event.offsetX - dragger.get('centerX'), y: event.offsetY - dragger.get('centerY')};
            let oldDist = this.get('dist');
            let newRadius = this.get('radiusDiff') + (Math.sqrt(newDist.x*newDist.x + newDist.y*newDist.y));
            if(newRadius < 10) {
                return;
            }
            dragger.set('radius', newRadius);
        } else {
            let dist = this.get('dist');
            dragger.set('centerX', event.offsetX-dist.x);
            dragger.set('centerY', event.offsetY-dist.y);
        }
    },
    mouseUp: function(event) {
        this.set('dragger', undefined);
        this.set('ctrlKey', false);
    },
    mouseLeave: function(event) {
        this.set('dragger', undefined);
        this.set('ctrlKey', false);
    }
});
