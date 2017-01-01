import * as path from 'path';
import { FileMatcher, FindOptions, PredicateOperator, FileFilter, AttributeType } from 'file-matcher';

let fileMatcher = new FileMatcher();
let progress

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
        let numberOfFiles: number = files ? files.length : 0;
        console.log('Number of matched files: ', numberOfFiles);
    })
    .catch(error => {
        console.log('Ops an error happened', error);
    });

// Listening to the library events
fileMatcher.on('preSearchDirectory', dir => {
    console.log('> preSearchDirectory: ', dir);
});

fileMatcher.on('endSearchDirectory', (files, totalOfFiles) => {
    console.log('<< endSearchDirectory: ', files, totalOfFiles);
});

fileMatcher.on('contentMatch', (file, processed) => {
    console.log('<< contentMatch: ', file, processed);
});