import * as path from 'path';
import * as Progress from 'progress';
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
        let numberOfFiles: number = files ? files.length : 0;
        console.log('Number of matched files: ', numberOfFiles);
    })
    .catch(error => {
        console.log('Ops an error happened', error);
    });


// Initializing node-progress
let progress: Progress = new Progress('Search progress [:bar] -> from contentMatch Event', {
    complete: '=',
    incomplete: '.',
    width: 20,
    total: 100
});

// Listening to contentMatch event to update the progress bar
fileMatcher.on('contentMatch', (file, processed) => {
    progress.update(processed);
});