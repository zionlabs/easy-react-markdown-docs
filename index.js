#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const argv = require('yargs').argv;
const glob = require('glob');
const reactDocgen = require('react-docgen');
const ReactDocGenMarkdownRenderer = require('react-docgen-markdown-renderer');

const componentDirectoryArg = argv.path || './components';
const docsDirectoryArg = argv.docs || './docs';

const renderer = new ReactDocGenMarkdownRenderer({
  componentsBasePath: process.cwd(),
  template: require('./template')
});

const componentDirectoryPath = path.join(process.cwd(), componentDirectoryArg);
const docsDirectoryPath = path.resolve(process.cwd(), docsDirectoryArg)

/**
 * Docs directory must exist before running file
 */
if (!fs.existsSync(docsDirectoryPath)) {
  console.log('Error cannot find directory %s to save documation', docsDirectoryPath); 
}

//React component documentation
let docs = '';

/**
 * Step 1: Get list of components
 */
glob(`${componentDirectoryPath}/**/*.{js,jsx}`, {dot:true}, (error, files) => {

  //Ignore test and spec files
  const filteredFiles = files.filter((filePath) => {
    return filePath.match(/spec.js|test.js|spec.jsx|test.jsx/g) ? false : true;
  });

  generateComponentDocs(filteredFiles, docs, (finalDocumentation) => {
    writeDocumationToFile(finalDocumentation);
  })
});

/**
 * Step 2: Recursively retrieve markdown documentation for each component
 */
function generateComponentDocs(files, docs, cb) {

  if (files < 1) return cb(docs);
  
  const filePath = files.pop();

  fs.readFile(filePath, (error, content) => {
    if (error) throw error;

    const doc = reactDocgen.parse(content);

    /**
     * To retrieve the proper component name using structure
     *
     * ./components
     *   /Button
     *    ./index.js
     *    ./style.css
     *    ./etc
     *
     * We need to get the name of the parent folder of the index.js file.
     */
    const directories = filePath.split('/');
    const componentName = directories[directories.length - 2];

    docs += `## ${componentName}\n`;
    docs += renderer.render(
      /* The path to the component, used for linking to the file. */
      filePath,
      /* The actual react-docgen AST */
      doc,
      /* Array of component ASTs that this component composes*/
      []
    );

    generateComponentDocs(files, docs, cb); 

  });

}

/**
 * Step 3: Recursively retrieve markdown documentation for each component
 */
function writeDocumationToFile(finalDocumentation) {

  const documentationPath = `${path.resolve(__dirname, docsDirectoryPath)}/components${renderer.extension}`;

  fs.writeFile(documentationPath, finalDocumentation, (error) => {
    if (error) throw error;
    console.log('SUCCESS: Component docs saved to %s', documentationPath);
  });

}


