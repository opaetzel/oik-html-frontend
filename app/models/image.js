import Ember from 'ember';
import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
    session: Ember.inject.service('session'),
    caption: attr(),
    credits: attr(),
    name: attr(),
    blobUrl: Ember.computed('id', 'uploaded', function() {
        if(!this.get('uploaded')) {
            return;
        }
        let self = this;
        let token = this.get('session.data.authenticated.token');
        let imageId = this.get('id');
        if(imageId === undefined || isNaN(imageId) || imageId == null) {
            return;
        }
        let imageSrc = "/api/get-image/" + imageId;
        let xhr = new XMLHttpRequest();
        xhr.targetId = this.get('elementId');
        xhr.open("GET", imageSrc);
        xhr.setRequestHeader("Authorization", "Bearer " + token);
        xhr.setRequestHeader("Accept", "*/*");
        xhr.responseType = "blob";
        xhr.onload = response;
        xhr.send(); 
        function response() {
            let urlCreator = window.URL || window.webkitURL;
            let imageUrl = urlCreator.createObjectURL(this.response);
            self.set('blobUrl', imageUrl);
        }
    }),
    unit: belongsTo('unit'),
    selected: attr('boolean'),
    uploaded: Ember.computed(function() {
        return !this.get('isNew');
    })
});
