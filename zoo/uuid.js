const uuid = require('uuid/v4');

(function(){
'use strict';

module.exports = function(schema, options) {
    if(!schema.paths.uuid) {
        schema.add({
            'uuid': {
                type: String,
                index: {
                    unique: true
                }
            }
        });
    }

    schema.pre('save', function(next) {
        if(this.isNew)
            this.uuid = uuid().split('-').join('');

        return next();
    });
};

})();