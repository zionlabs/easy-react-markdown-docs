## easy-react-markdown-docs.js

Easiest way to generate simple react markdown documentation for you components. Built on top of [react-docgen](https://github.com/reactjs/react-docgen).

## Installation


```
npm install --save easy-react-markdown-docs
```

## Getting Started
Run in terminal:

```
erd --path=<react_components_directory_path> --docs=<docs-directory-path>
```
* `erd` stands for "easy react docs".
* `--path` defaults to `./src/components`
* `--docs` defaults to `./docs`. 

Make sure that both your component and docs directories are valid and exist before running the script.

After running the script a file called `components.md` will be place in your docs (specified or default) directory.

## HOW TO

* **Correctly Document Components:** Review [react-docgen](https://github.com/reactjs/react-docgen) for guidance on component documentation.
* **Component Arcitecture:** Components should follow:

```
//It will look for either .js or .jsx files. 
//Any files that contian __test__ in the name will be ignored.

./<component_directory>
	./Button
		./*{.js|.jsx}
		
```