import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    currentUser: Ember.inject.service('current-user'),
    model(params) {
        return Ember.RSVP.hash({
            page: this.store.findRecord('page', params.page_id),
            unit: this.store.findRecord('unit', params.unit_id)
        });
    },
    beforeModel(transition) {
        if(!(this.get('currentUser.user')) || !(this.get('currentUser.user.groups').indexOf('editor') > -1)) {
            this.transitionTo('index');
        }

        console.log("beforeModel - edit page", transition);
        if("doEdit" in transition.data && !transition.data.doEdit) {
            console.log(transition);
            console.log("redirecting to new page", transition.params["edit-page"].unit_id);
            this.transitionTo('new-page', transition.params["edit-page"].unit_id, transition.data.nextType);
        }
    },
    afterModel() {
        $(document).on('click', function (e) {
            $('[data-toggle="popover"],[data-original-title]').each(function () {
                if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {                
                    (($(this).popover('hide').data('bs.popover')||{}).inState||{}).click = false  // fix for BS 3.3.6
                }

            });
        });
        Ember.run.schedule("afterRender", this, () => {
            console.log("afterRender");
            Ember.$('.container').popover({
                selector: '.has-popover',
                content: function() {
                    console.log("getting content");
                    return $('#' + this.id + "-content").html();
                },
                container: 'body',
                html: true
            });
        });
    }
});
