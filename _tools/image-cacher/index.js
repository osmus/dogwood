// image-cacher for dogwood
//
// This script fetches remote images referenced in the `image`
// property of `_posts` and `_people` and saves them locally.
// Remote images are sometimes a convenience but they are liable
// to turn into 404s or 403s in time.
//
// Cached images are saved to `/img/posts/cached/` and /img/people/cached/`,
// the `image` property is changed to the local file, and the original `image`
// value is moved to `image_remote` for future reference.
// 
// Remember to re-run the thumbnail-generator tool after cacheing images.

import fs from 'fs';
import followRedirects from 'follow-redirects';
const https = followRedirects.https;
import graymatter from 'gray-matter';

import process from 'process';
import minimist from 'minimist';
const argv = minimist(process.argv.slice(2));
let sourcePath = process.env.npm_config_srcdir || argv.srcdir || '.';
if (sourcePath.endsWith('/')) sourcePath.slice(0, -1);

const imgDir = 'img';

const imgKeys = ['image', 'cover'];

processFiles('_people', 'people');
processFiles('_posts', 'posts');

async function processFiles(jekyllSubdir, imageSubdir) {
  let jekyllDirPath = sourcePath + "/" + jekyllSubdir;
  const dir = fs.opendirSync(jekyllDirPath);
  let dirent;
  while ((dirent = dir.readSync()) !== null) {
    const subpath = jekyllDirPath + '/' + dirent.name;
    if (dirent.isFile()) {
        const filedata = fs.readFileSync(subpath);
        const info = graymatter(filedata);

        // ignore files not in Jekyll format
        if (Object.keys(info.data).length > 0) {
          let newFrontmatter = await cacheRemoteImages(info.data, imageSubdir);
          if (newFrontmatter) {
            let newFileContent = graymatter.stringify(info, newFrontmatter);
            fs.writeFileSync(subpath, newFileContent);
            console.log(`updated ${subpath}`);
          }
        }
    } else if (dirent.isDirectory()) {
        await processFiles(jekyllSubdir + '/' + dirent.name, imageSubdir);
    }
  }
  dir.closeSync();
}

async function cacheRemoteImage(url, toPath) {

  return new Promise((resolve) => {

    var content = "";   
    
    var req = https.request(url, function(res) {
      if (res.statusCode !== 200) {
        console.error(`status ${res.statusCode} for ${url}`);
        resolve(false);
        return;
      }
      res.setEncoding('binary');
      res.on("data", function (chunk) {
          content += chunk;
      });
  
      res.on("end", function () {
          fs.writeFileSync(toPath, content, "binary");
          console.log(`cached ${url}`);
          resolve(true);
      });
    });
    
    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
        resolve(false);
    });
    
    req.end();
  });
}

async function cacheRemoteImages(frontmatter, imageSubdir) {
  

  var didCacheAny = false;
  for (var i in imgKeys) {
    var key = imgKeys[i];
    let imgUrl = frontmatter[key];
    if (imgUrl && imgUrl.startsWith('http')) {
      let slug = encodeURIComponent(imgUrl);
      frontmatter[key + "_remote"] = frontmatter[key];

      var cachedDirPath = imgDir + '/' + imageSubdir + '/cached/';
      if (!fs.existsSync(sourcePath + "/" + cachedDirPath)) fs.mkdirSync(sourcePath + "/" +  cachedDirPath);

      let relativeOutPath =  '/' + cachedDirPath + slug;
      frontmatter[key] = relativeOutPath;
      var didCache = await cacheRemoteImage(imgUrl, sourcePath + relativeOutPath);
      didCacheAny = didCacheAny || didCache;
    }
  }
  if (didCache) return frontmatter;
}
