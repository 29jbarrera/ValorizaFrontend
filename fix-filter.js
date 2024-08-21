const { readdirSync, writeFileSync, readFileSync } = require("fs");

const folder = "src/app/typescript-angular-client-generated/api/";

const files = readdirSync(folder).filter((file) =>
  file.endsWith(".service.ts")
);
// Replace all ocurrences of the string in the file
const ocurrences = `queryParameters = queryParameters.set('Filters', <any>filters);`;

const remplacement = `Object.keys(filters).forEach((key) => {queryParameters = queryParameters.set(key, filters[key]);});`;
console.log(`Replacing ${files.length} `);
files.forEach((file) => {
  const path = `${folder}/${file}`;
  let content = readFileSync(path, "utf8");
  //  Replace all  ocurrences of the string in the file

  while (content.includes(ocurrences)) {
    content = content.replace(ocurrences, remplacement);
  }
  const result = content;
  // Save
  writeFileSync(path, result, "utf8");
});
