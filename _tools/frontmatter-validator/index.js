// frontmatter-validator for dogwood
//
// This script checks that the frontmatter in all your
// Jekyll documents matches a known format. This is important
// since the theme relies on many custom variables.
//
// By default, the script will throw an error if you have
// additional properties to those expected. This catches
// typos like `authors` instead of `author`. Use the
// `--strict=false` option to turn off this behavior.

import fs from 'fs';
import graymatter from 'gray-matter';
import path from 'path';
import {fileURLToPath} from 'url';

import process from 'process';
import minimist from 'minimist';
const argv = minimist(process.argv.slice(2));
let sourcePath = process.env.npm_config_srcdir || argv.srcdir || '.';
if (sourcePath.endsWith('/')) sourcePath.slice(0, -1);

import ZSchema from 'z-schema';

let zSchemaOptions = {};

let isStrict = true;
if (("npm_config_strict" in process.env && !process.env.npm_config_strict) ||
    process.argv.includes("--strict=false")) {
    isStrict = false;
}

if (isStrict) {
    let strictOptions = {
        assumeAdditional: true,
        forceItems: true,
        forceMinItems: true,
        forceMinLength: true,
        forceProperties: true,
        noEmptyArrays: true,
        noEmptyStrings: true,
        //noExtraKeywords: true,
        noTypeless: true,
    };
    Object.assign(zSchemaOptions, strictOptions);
}

const jsonValidator = new ZSchema(zSchemaOptions);

let hasInvalid = false;

function validateJson(json, schema) {
    const valid = jsonValidator.validate(json, schema);
    const errors = jsonValidator.getLastErrors();
    if (!valid) {
        errors.forEach(function(error) {
            console.log(error);
        });
        hasInvalid = true;
    }
}

function validateFrontmatter(path, schemaPath) {
    const schema = JSON.parse(fs.readFileSync(schemaPath));
    const dir = fs.opendirSync(path);
    let dirent;
    while ((dirent = dir.readSync()) !== null) {
      const subpath = path + '/' + dirent.name;
      if (dirent.isFile()) {
          const filedata = fs.readFileSync(subpath);
          const info = graymatter(filedata);
  
          // ignore files not in Jekyll format
          if (Object.keys(info.data).length > 0) {
            // parse to string and back again to make sure dates are in string format
            let data = JSON.parse(JSON.stringify(info.data));
            validateJson(data, schema);
          }
      } else if (dirent.isDirectory()) {
          validateFrontmatter(subpath, schemaPath);
      }
    }
    dir.closeSync();
}

const directory = path.dirname(fileURLToPath(import.meta.url));
var schemasDir = path.join(directory, '/schemas');

validateFrontmatter(sourcePath + '/_posts', schemasDir + '/post.schema.json');
validateFrontmatter(sourcePath + '/_people', schemasDir + '/person.schema.json');
validateFrontmatter(sourcePath + '/_pages', schemasDir + '/page.schema.json');
validateFrontmatter(sourcePath + '/_redirects', schemasDir + '/redirect.schema.json');

if (hasInvalid) {
    // nonzero exit for GitHub Actions 
    process.exit(1);
}