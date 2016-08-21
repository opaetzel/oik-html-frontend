import Ember from 'ember';

export default Ember.Component.extend({
    session: Ember.inject.service('session'),
    response: function(e) {
        let urlCreator = window.URL || window.webkitURL;
        let imageUrl = urlCreator.createObjectURL(this.response);
        document.querySelector("#"+this.targetId).children[0].src = imageUrl;
    },
    didRender: function() {
        this._super(...arguments);
        let token = this.get('session.data.authenticated.token');
        let xhr = new XMLHttpRequest();
        xhr.targetId = this.get('elementId');
        xhr.open("GET", "/api/get-image/" + this.getProperties('imageId').imageId);
        xhr.setRequestHeader("Authorization", "Bearer " + token);
        xhr.setRequestHeader("Accept", "*/*");
        xhr.responseType = "blob";
        xhr.onload = this.response;
        xhr.send(); 
    }
});
