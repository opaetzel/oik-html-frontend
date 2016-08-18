import Ember from 'ember';

export default Ember.Controller.extend({
    init: function () {
        this._super();
        Ember.run.schedule("afterRender", this, function() {
            console.log("after render"+Ember.$('#affix-left'));
            Ember.$('#affix-left').affix({
                offset: {
                    top: 70,
                    bottom: function () {
                        return (this.bottom = $('.footer').outerHeight(true))
                    }
                }
            });

            var containerLeft = Ember.$('#main-container').offset().left;
            var newPos = containerLeft-20;
            if(newPos>0) {
                console.log(newPos);
                Ember.$('#affix-left').css({left: newPos +"px",position: "fixed"});
            } else {
                Ember.$('#affix-left').hide();
            }
            Ember.$('#affix-left').on('affix.bs.affix', function() {
                console.log("affixing");
                var containerLeft = Ember.$('#main-container').offset().left;
                var newPos = containerLeft-20;
                if(newPos>0) {
                    Ember.$(this).css({left: newPos +"px"});
                } else {
                    Ember.$(this).hide();
                }
            });
        });
    }
});
