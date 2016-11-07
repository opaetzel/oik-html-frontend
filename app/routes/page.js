import Ember from 'ember';
import ResetScrollPositionMixin from '../mixins/reset-scroll-position';

export default Ember.Route.extend(ResetScrollPositionMixin, {
    model(params) {
        return Ember.RSVP.hash({
            page: this.store.findRecord('page', params.page_id),
            unit: this.store.findRecord('unit', params.unit_id)
        });
    },
    afterModel: function(model) {
        let currentPage = model.unit.get('pages').indexOf(model.page);
        model.unit.set('currentPage', currentPage);
        let numPages = model.unit.get('pages.length');
        Ember.run.schedule("afterRender", this, () => {
            console.log("after render"+Ember.$('#affix-left'));
            Ember.$('#affix-left').affix({
                offset: {
                    top: 70,
                    bottom: function () {
                        return (this.bottom = Ember.$('.footer').outerHeight(true));
                    }
                }
            });
            $(document).on('click', function (e) {
                $('[data-toggle="popover"],[data-original-title]').each(function () {
                    //the 'is' for buttons that trigger popups
                    //the 'has' for icons within a button that triggers a popup
                    if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {                
                        (($(this).popover('hide').data('bs.popover')||{}).inState||{}).click = false  // fix for BS 3.3.6
                    }

                });
            });
            Ember.$('.container').popover({
                selector: '.has-popover',
                content: function() {
                    return $('#' + this.id + "-content").html();
                },
                container: 'body',
                html: true
            });

            var containerLeft = Ember.$('#main-container').offset().left;
            var newPos = containerLeft-35;
            if(newPos>0) {
                console.log(newPos);
                Ember.$('#affix-left').css({left: newPos +"px",position: "fixed"});
            } else {
                Ember.$('#affix-left').hide();
            }
            Ember.$('#affix-left').on('affix.bs.affix', function() {
                console.log("affixing");
                var containerLeft = Ember.$('#main-container').offset().left;
                var newPos = containerLeft-35;
                if(newPos>0) {
                    Ember.$(this).css({left: newPos +"px"});
                } else {
                    Ember.$(this).hide();
                }
            });
            let canvas = Ember.$('#affix-left').children()[0];
            let ctx = canvas.getContext('2d');
            ctx.clearRect(0,0,canvas.width, canvas.height);
            for(var i=0; i<numPages; i++) {
                let y = i*12+50;
                if(i===currentPage) {
                    ctx.beginPath();
                    ctx.moveTo(0, y);
                    ctx.lineTo(15, y);
                    ctx.strokeStyle = 'green';
                    ctx.stroke();
                } else {
                    ctx.beginPath();
                    ctx.moveTo(0, y);
                    ctx.lineTo(8, y);
                    ctx.strokeStyle = 'black';
                    ctx.stroke();
                }
            }
        });
    }
});
