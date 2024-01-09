const fs = require('fs');
const path = require('path');

const filePath = process.argv.at(2)
let fileContent = fs.readFileSync(filePath, 'utf8');

// Add Comment
fileContent = '// GENERATED FROM https://github.com/WillKirkmanM/esm-converter\n\n' + fileContent;

// Require to Import
const requireRegex = /(var|let|const)\s+([\w.]+)\s+=\s+require\((['"`])(.*?)\3\)\s*?;?/g;
fileContent = fileContent.replace(requireRegex, 'import $2 from \'$4\';');

// Match var declarations
const varRegex = /var\s+([\w\s,]+)=/g;
let match;
while ((match = varRegex.exec(fileContent)) !== null) {
  const variables = match[1].split(',').map(v => v.trim());

  for (const variable of variables) {
    const reassignRegex = new RegExp(`\\b${variable}\\b\\s*=`);

    reassignRegex.test(fileContent) ? fileContent = fileContent.replace(new RegExp(`var\\s+${variable} =`), `let ${variable} =`) : fileContent = fileContent.replace(new RegExp(`var\\s+${variable} =`), `const ${variable} =`);
  }
}

// Explicit statement to template literal
const explicitStringRegex = /console\.log\('(.+?)'\s+\+\s+(.+?)\s+\+\s+'(.+?)'\s+\+\s+(.+?)\s+\+\s+'(.+?)'\);/g;
fileContent = fileContent.replace(explicitStringRegex, `console.log(\`$1\${$2}$3\${$4}$5\`);`)

// Objects
const objectShorthandRegex = /([\w]+):\s*\1,/g;
fileContent = fileContent.replace(objectShorthandRegex, '$1,');

const objectMethodRegex = /([\w]+):\s*function\s*\((.*?)\)\s*{/g;
fileContent = fileContent.replace(objectMethodRegex, '$1($2) {');

const arrowFunctionRegex = /function\s*\(([\w]*)\)\s*\{\s*return\s*(.*?);\s*\}/g;
fileContent = fileContent.replace(arrowFunctionRegex, '($1) => $2');

const varToObjectRegex = /var\s+([\w]+)\s+=\s+\{/g;
fileContent = fileContent.replace(varToObjectRegex, 'const $1 = {');

// Classes
const classRegex = /function\s+([\w]+)\s*\(([\w]*)\)\s*\{\s*this\.([\w]+)\s*=\s*\2;\s*\};/g;
fileContent = fileContent.replace(classRegex, 'class $1 {\n  constructor($2) {\n    this.$3 = $2;\n  }');

const defaultParamRegex = /([\w]+)\.prototype\.([\w]+)\s*=\s*function\s*\(([\w]*)\)\s*\{([\s\S]*?)(\3\s*=\s*\3\s*\|\|\s*"!";)([\s\S]*?)\s*\};/g;
fileContent = fileContent.replace(defaultParamRegex, '  $2($3 = "!") {\n$4$6\n  }\n}');

const exportsRegex = /exports\.([\w]+)\s*=\s*([\w]+);/g;
fileContent = fileContent.replace(exportsRegex, 'export {$1};');

fs.writeFileSync(path.join(path.dirname(filePath), 'es6.js'), fileContent);