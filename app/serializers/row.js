import DS from 'ember-data';

export default DS.RESTSerializer.extend({
        serializeBelongsTo: function(record, json, relationship) {
        this._super(record, json, relationship);
        console.log(json);
        var key = relationship.key;
        var json_key = this.keyForRelationship ? this.keyForRelationship(key, "belongsTo") : key;
        console.log(json[json_key]);
        json[json_key] = parseInt(json[json_key]);
        console.log(json[json_key]);
    }
});
