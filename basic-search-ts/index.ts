import * as path from 'path';
import { FileMatcher, FindOptions, PredicateOperator, FileFilter, AttributeType } from 'file-matcher';

let fileMatcher = new FileMatcher();

let dir = path.resolve(__dirname, '../node_modules');

let criteria: FindOptions = {
    path: dir,
    fileFilter: {
        fileNamePattern: '**/*.js',
        content: /use strict/,
        attributeFilters: [
            {
                type: AttributeType.ModifiedDate,
                operator: PredicateOperator.LessThan,
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