import DS from 'ember-data';

export default DS.RESTSerializer.extend({
    serializeBelongsTo: function(record, json, relationship) {
        this._super(record, json, relationship);
        var key = relationship.key;
        var json_key = this.keyForRelationship ? this.keyForRelationship(key, "belongsTo") : key;
        json[json_key] = parseInt(json[json_key]);
    },
    serialize: function(snapshot, options) {
        let json = this._super(snapshot, options);
        if("id" in json){
            json.id = parseInt(json.id);
        }
        return json;
    }
});
