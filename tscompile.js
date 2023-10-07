/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const chokidar = require('chokidar');
const UglifyJS = require("uglify-js");

// Function to compile TypeScript code to JavaScript
function compileToJs(tsCode) {
  const compilerOptions = {
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
    esModuleInterop: true,
  };
  const result = ts.transpileModule(tsCode, {
    compilerOptions,
  });
  const jsCode = result.outputText;
  let modifiedCode = jsCode.replace(/(import .* from\s+['"])([^'"]+)(?=['"])/g, '$1$2.js')

  return modifiedCode;
}
// Function to minify the JavaScript code
function minifyJsCode(jsCode) {
  const minifiedCode = UglifyJS.minify(jsCode);
  if (minifiedCode.error) {
    throw new Error(`Failed to minify JavaScript code: ${minifiedCode.error}`);
  }
  return minifiedCode.code;
}

// Function to read a TypeScript file, compile, minify, modify, and save as JavaScript
async function convertTsToJs(filePath) {
  const tsCode = fs.readFileSync(filePath, 'utf8');
  const jsCode = compileToJs(tsCode);
  const minifiedJsCode = minifyJsCode(jsCode);
  // Modify the jsCode as needed (e.g., add custom transformations)
  const jsFilePath = filePath.replace('.ts', '.js');
  fs.writeFileSync(jsFilePath, minifiedJsCode, 'utf8');
  console.log(`Converted ${filePath} to ${jsFilePath}`);
}
// Watch for changes in TypeScript files and run the convert.js script
const targetDirectory = '.'; // Change this to your desired directory
const watcher = chokidar.watch(targetDirectory, {
  ignoreInitial: true,
});
watcher.on('change', (filePath) => {
  console.log(`File changed: ${filePath}`);
  if (path.extname(filePath) === '.ts' && !filePath.includes('.d.ts')) {
    convertTsToJs(filePath);
  }
});
