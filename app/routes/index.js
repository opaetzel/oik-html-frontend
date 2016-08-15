import Ember from 'ember';

export default Ember.Route.extend({
    activate: function(){
        Ember.$('html').toggleClass("full");
        console.log("entering index")
    },
    deactivate: function(){
        Ember.$('html').toggleClass("full");
    }
});
