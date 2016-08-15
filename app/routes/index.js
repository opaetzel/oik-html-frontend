import Ember from 'ember';

export default Ember.Route.extend({
    activate: function(){
        Ember.$('html,body').toggleClass("full");
        console.log("entering index")
    },
    deactivate: function(){
        Ember.$('html,body').toggleClass("full");
    }
});
