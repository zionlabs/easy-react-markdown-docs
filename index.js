#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const argv = require('yargs').argv
const glob = require('glob');
const reactDocgen = require('react-docgen');
const ReactDocGenMarkdownRenderer = require('react-docgen-markdown-renderer');

const componentDirectoryArg = argv.path || './components';
const docsDirectoryArg = argv.docs || './docs';

const renderer = new ReactDocGenMarkdownRenderer({
  componentsBasePath: process.cwd() 
});

const componentDirectoryPath = path.join(process.cwd(), componentDirectoryArg);
const docsDirectoryPath = path.resolve(process.cwd(), docsDirectoryArg)

/**
 * Docs directory must exist before running file
 */
if (!fs.existsSync(docsDirectoryPath)) {
  console.log('Error cannot find directory %s to save documation', docsDirectoryPath); 
}

/**
 * Step 1: Get list of component names
 */
const componentNames = fs.readdirSync(componentDirectoryPath);

let docs = '';

/**
 * Step 2: Recursively retrieve markdown documentation for each component
 */
function generateComponentDocs(componentNames, docs, cb) {

  if (componentNames < 1) return cb(docs);
  
  const name = componentNames.pop();
  const componentPath = path.resolve(componentDirectoryPath, name);

  glob(`${componentPath}/?(*.js|*.jsx)`, {}, (error, files) => {
    const fileName = files[0];

    fs.readFile(fileName, (error, content) => {
      if (error) throw error;

      const doc = reactDocgen.parse(content);

      docs += renderer.render(
        /* The path to the component, used for linking to the file. */
        componentPath,
        /* The actual react-docgen AST */
        doc,
        /* Array of component ASTs that this component composes*/
        []
      );

      generateComponentDocs(componentNames, docs, cb); 

    });

  })

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

generateComponentDocs(componentNames, docs, (finalDocumentation) => {
  writeDocumationToFile(finalDocumentation);
})


