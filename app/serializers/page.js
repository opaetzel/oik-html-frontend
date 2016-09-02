import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
    attrs: {
        rows: {embedded: 'always' },
        unit: { 
            serialize: 'id',
            deserialize: 'id'
        }
    },
    serializeBelongsTo: function(record, json, relationship) {
        this._super(record, json, relationship);
        var key = relationship.key;
        var json_key = this.keyForRelationship ? this.keyForRelationship(key, "belongsTo") : key;
        console.log(json[json_key]);
        json[json_key] = parseInt(json[json_key]);
    }
});
