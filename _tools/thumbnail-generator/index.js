// thumbnail-generator for dogwood
//
// This script creates thumbnail versions of images that are displayed
// at small sizes on some pages in order to reduce load times.
// It is hardcoded for special directories (it works recursively):
//     /img/people/ – avatar images for people
//     /img/posts/ – header images for posts
// And it saves the output to:
//     /img-thumbnails/people/
//     /img-thumbnails/posts/
// In your Jekyll documents you should specify images like
// "image: /img/posts/john.jpg" And the theme will automatically
// output "/img-thumbnails/posts/john.jpg" in places where smaller
// images are appropriate.
//
// Note that if you specify images in the special directories
// but do not run this script before building your site then
// your images will 404.

import fs from 'fs';
import sharp from 'sharp';

import process from 'process';
import minimist from 'minimist';
const argv = minimist(process.argv.slice(2));
let sourcePath = process.env.npm_config_srcdir || argv.srcdir || '.';
if (sourcePath.endsWith('/')) sourcePath.slice(0, -1);

var imgDir = sourcePath + '/img/';
var imgThumbDir = sourcePath + '/img-thumbnails/';

if (!fs.existsSync(imgThumbDir)) fs.mkdirSync(imgThumbDir);

processFiles('posts', 720, null);
processFiles('people', 48, 48);

function processFiles(subdir, width, height) {
  let inDir = imgDir + subdir;
  let outDir = imgThumbDir + subdir;

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  const dir = fs.opendirSync(inDir);
  let dirent;
  while ((dirent = dir.readSync()) !== null) {
    
    //ignore hidden files
    if (dirent.name[0] === '.') continue;

    if (dirent.isFile()) {
      const subpath = inDir + '/' + dirent.name;
      let outPath = outDir + '/' + dirent.name + '.webp';
      const buffer = fs.readFileSync(subpath);

      sharp(buffer, { animated: true, limitInputPixels: false })
        .resize(width, height, { withoutEnlargement: true })
        .toFile(outPath)
        .catch(err => {
          console.log("cannot create thumbnail for: " + subpath);
          console.error(err);
        });
      
    } else if (dirent.isDirectory()) {
      processFiles(subdir + '/' + dirent.name, width, height);
    }
  }
  dir.closeSync();
}
