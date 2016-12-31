var path = require('path');
var fm = require('file-matcher');

var fileMatcher = new fm.FileMatcher();

var dir = path.resolve(__dirname, 'node_modules');

var criteria = {
    path: dir,
    fileFilter: {
        fileNamePattern: '**/*.js',
        content: /use strict/,
        attributeFilters: [
            {
                type: fm.AttributeType.ModifiedDate,
                operator: fm.PredicateOperator.LessThan,
                value: new Date()
            }
        ]
    },
    recursiveSearch: true
};

fileMatcher.find(criteria)
    .then(files => {
        console.log(files);
    })
    .catch(error => {
        console.log(error);
    });