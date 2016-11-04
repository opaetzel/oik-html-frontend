import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    currentUser: Ember.inject.service('current-user'),
    actions: {
        /*willTransition: function(transition) {
          console.log("in willTransition", transition);
          if("edit-page" in transition.params) {
          let pageId = this.controller.get('model.page.id');
          if(transition.params["edit-page"].page_id === pageId) {
          transition.data.doEdit = false;
          transition.data.nextType = this.controller.get('nextType');
          }
          }
          },*/
        editThis(unitId, pageId) {
            this.replaceWith("edit-page", unitId, pageId);
        }
    },
    events: {
        editThis(unitId, pageId) {
            this.replaceWith("edit-page", unitId, pageId);
        }
    },
    beforeModel() {
        if(!(this.get('currentUser.user')) || !(this.get('currentUser.user.groups').indexOf('editor') > -1)) {
            this.transitionTo('index');
        }
    },
    model(params, transition) {
        console.log("data", transition.data);
        console.log(params.unit_id);
        console.log(params.page_type);
        return Ember.RSVP.hash({
            page: this.store.createRecord('page', {
                rows: this.createRows(params.page_type),
                page_type: params.page_type,
                title: this.titleHash[params.page_type]
            }),
            unit: this.store.findRecord('unit', params.unit_id)
        });
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
    },
    createRows: function(pageType) {
        let rows = [this.store.createRecord('row', {left_markdown: "", right_markdown: ""})];
        switch(pageType) {
            case "opening":
                rows = [
                    this.store.createRecord('row', {left_markdown: "## Streitfrage (text)", right_markdown: "Eröffnung (text)"}),
                    this.store.createRecord('row', {left_markdown: "Abbildung zur Sache (image)", left_has_image: true, right_markdown: "Aufruf der Sache (text)"}),
                    this.store.createRecord('row', {left_markdown: "objektbezogene Daten (text)", right_markdown: "Abbildung des Objekts (image)", right_has_image: true})
                ];
                break;
            case "presentation":
                rows = [
                    this.store.createRecord('row', {left_markdown: "# Situation Überschrift (text)  \nAusführungen zur Situation(text)", right_markdown: "## *Zitat zur Situation (text)*"}),
                    this.store.createRecord('row', {left_markdown: "## *Zitat zum Problem (text)*", right_markdown: "# Problem (text)  \nAusführungen zum Problem(text)"})
                ];
                break;
            case "hearing-pro":
                rows = [
                    this.store.createRecord('row', {left_markdown: "# Überschrift Argument Pro (text)  \nArgument Pro (text)", left_is_argument: true, right_markdown: "## *Zitat Pro(text)*"}),
                    this.store.createRecord('row', {left_markdown: "Abbildung Objekt (image)", left_has_image: true, right_markdown: "__Überschrift zur Objektbefragung (text)__  \nFrage an das Objekt(text)", right_is_argument: true}),
                    this.store.createRecord('row', {left_markdown: "__Überschrift zur Zeugenbefragung 1 (text)__  \nZeugenbefragung 1 (text)", left_is_argument: true, right_markdown: "Abbildung Zeuge 1 (image)", right_has_image: true})
                ];
                break;
            case "hearing-con":
                rows = [
                    this.store.createRecord('row', {left_markdown: "## *Zitat Contra (text)*", right_markdown: "# Überschrift Argument Contra (text)  \nArgument Contra (text)", right_is_argument: true}),
                    this.store.createRecord('row', {left_markdown: "__Überschrift zur Objektbefragung (text)__  \nFrage an das Objekt(text)", left_is_argument: true, right_markdown: "Abbildung Objekt (image)", right_has_image: true}),
                    this.store.createRecord('row', {left_markdown: "Abbildung Zeuge 1 (image)", left_has_image: true, right_markdown: "__Überschrift zur Zeugenbefragung 1 (text)__  \nZeugenbefragung 1 (text)", right_is_argument: true})
                ];
                break;
            case "synthesis":
                rows = [
                    this.store.createRecord('row', {left_markdown: "Abbildung Schluss Contra (image)", left_has_image: true, right_markdown: "# Schlussplädoyer Contra (text)"}),
                    this.store.createRecord('row', {left_markdown: "# Schlussplädoyer Pro (text)", right_markdown: "Abbildung Schluss Pro (image)", right_has_image: true}),
                    this.store.createRecord('row', {left_markdown: "Abbildung des Objekts (image)", left_has_image: true, right_markdown: "# Stellungnahme Objekt (text)"})
                ];

                break;
            case "literature":
                rows = [
                    this.store.createRecord('row', {left_markdown: "Literaturangaben", right_markdown: "Literaturangaben"})
                ];
                break;
            default: 
                break;
        }
        return rows;
    },
    titleHash: {
        "opening": "Aufruf der Sache und Aufnahme der objektbezogenen Daten",
        "presentation": "Referat der Streitfrage",
        "hearing-pro": "Beweisaufnahme",
        "hearing-con": "Beweisaufnahme",
        "synthesis": "Schlussplädoyers und Abstimmung",
        "literature": "Literatur"
    },
    typeArray: [
        "opening",
        "presentation",
        "hearing-pro",
        "hearing-con",
        "synthesis",
        "literature"
    ]


});
