// people-validator for dogwood
//
// This script checks to make sure there is a document in the `_people` 
// directory for every `author` and `speaker` referenced in your `_posts`.
// This isn't strictly necessary but it enables linking people with the
// various content they're associated with.
//
// Use the `--fix=true` option to automatically create missing files.
// Use the `--strict=false` option to output warnings instead of errors.
//
// Note that the name is the only unique identifier for a person. This
// means you can only reference one person for each unique name,
// and that different version of the name (Jim vs. Jimmy) will be
// treated as different people.

import fs from 'fs';
import graymatter from 'gray-matter';

import process from 'process';
import minimist from 'minimist';
const argv = minimist(process.argv.slice(2));
let shouldFix = process.env.npm_config_fix || argv.fix;
let hasUnfixedIssue = false;

let sourcePath = process.env.npm_config_srcdir || argv.srcdir || '.';
if (sourcePath.endsWith('/')) sourcePath.slice(0, -1);

let isStrict = true;
if (("npm_config_strict" in process.env && !process.env.npm_config_strict) ||
    process.argv.includes("--strict=false")) {
    isStrict = false;
}

let expectedPeople = {};

function recordPostData(data) {
    let peopleKeys = ["author", "speaker"];
    peopleKeys.forEach(function(key) {
        let value = data[key];
        if (typeof value === 'string') {
            expectedPeople[value] = true;
        } else if (Array.isArray(value)) {
            value.forEach(function(item) {
                if (typeof item === 'string') {
                    expectedPeople[item] = true;
                }
            });
        }
    });
}

function processFiles(path) {
  const dir = fs.opendirSync(path);
  let dirent;
  while ((dirent = dir.readSync()) !== null) {
    const subpath = path + '/' + dirent.name;
    if (dirent.isFile()) {
        const filedata = fs.readFileSync(subpath);
        const info = graymatter(filedata);

        // ignore files not in Jekyll format
        if (Object.keys(info.data).length > 0) {
            recordPostData(info.data);
        }
    } else if (dirent.isDirectory()) {
        processFiles(subpath);
    }
  }
  dir.closeSync();
}

function validatePeopleBasedOnPosts() {
    let peopleList = Object.keys(expectedPeople).sort();
    peopleList.forEach(function(name) {
        let slug = name.replaceAll(" ", "-").replaceAll(".", "").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
        let path = sourcePath + '/_people/' + slug + '.md';
        if (!fs.existsSync(path)) {
            // ignore groups
            if (!name.match(/(Team|Committee|Organization|Staff|Board|Community|OpenStreetMap)/gi)) {
                if (shouldFix) {
                    let newFileString = `---\ntitle: "${name}"\n---`;
                    fs.writeFileSync(path, newFileString);
                    console.log(`Created file for ${name} at ${path}`);
                } else {
                    console.error(`Missing file for ${name} at ${path}`);
                    hasUnfixedIssue = true;
                }
            }
        } else {
            let personData = graymatter(fs.readFileSync(path)).data;
            // the document title needs to match the name listed in the post meta or else Jekyll can't link them 
            if (personData.title !== name) {
                console.error(`Unexpected name "${personData.title}" for ${name} at ${path}`);
                hasUnfixedIssue = true;
            }
        }
    });
}

processFiles(sourcePath + '/_posts');
validatePeopleBasedOnPosts();

if (hasUnfixedIssue && isStrict) {
    // nonzero exit for GitHub Actions 
    process.exit(1);
}