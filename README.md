## easy-react-markdown-docs.js

Easiest way to generate simple react markdown documentation for you components. Built on top of [react-docgen](https://github.com/reactjs/react-docgen).

## Installation


```
npm install --save easy-react-markdown-docs
```

## Getting Started
Run in terminal:

```
erd --path <react_components_directory_path> --docs <docs-directory-path>
```
* `erd` stands for "easy react docs".
* `--path` defaults to `./src/components`
* `--docs` defaults to `./docs`. 

Make sure that both your component and docs directories are valid and exist before running the script.

After running the script a file called `components.md` will be placed in your docs (specified or default) directory.

## HOW TO

* **Correctly Document Components:** Review [react-docgen](https://github.com/reactjs/react-docgen) for guidance on component documentation.
* **Component Arcitecture:** Components should follow:

```
//It will look for .js and .jsx files. 
//Supports component nesting within the specified components directory.
//Any files that contain test.js, spec.js, test.jsx, and spec.jsx in the name will be ignored.

./<component_directory>
	./Button
		./*{.js|.jsx}


```
		
You can nest components under folders for better organization in the component directory.

```
src/
  componets/
    /*Single Component Example*/
    Button/ 
      index.js
      index.test.js
      style.scss
    /*Nested Components Example*/
    Notifications/
      Alert/ 
        index.js
        index.test.js
        style.scss
      DismissIcon/ 
        index.js
        index.test.js
        style.scss

```
