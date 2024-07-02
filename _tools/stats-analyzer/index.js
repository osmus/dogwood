// stats-analyzer for dogwood

import fs from 'fs';
import graymatter from 'gray-matter';

import process from 'process';
import minimist from 'minimist';
const argv = minimist(process.argv.slice(2));
let sourcePath = process.env.npm_config_srcdir || argv.srcdir || '.';
if (sourcePath.endsWith('/')) sourcePath.slice(0, -1);

var tagCounts = {};

function collectFileStats(json) {
  for (var i in json.tags || []) {
    var tag = json.tags[i];
    if (!tagCounts[tag]) tagCounts[tag] = 0;
    tagCounts[tag] += 1;
  }
}

function collectStats(path) {
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
        collectFileStats(data);
      }
    } else if (dirent.isDirectory()) {
      collectStats(subpath);
    }
  }
  dir.closeSync();
}

collectStats(sourcePath + '/_posts');

let tags = Object.keys(tagCounts).sort();
tags.forEach(function(tag) {
  console.log(tagCounts[tag] + ' ' + tag);
});