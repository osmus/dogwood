// embedded-page-cacher for dogwood
//
// This script saves local versions of remote pages linked
// in the `embedded_remote` property of `_posts`. Pages
// and their images are saved to `/embeds/cached/` with the 
// full local URL saved to the `embedded` property. You can
// then use the `embedded-page` layout to display these pages
// in an iframe.
// 
// This script is used on openstreetmap.us to cache our newsletters.
// Cacheing ensures the content will always be available, but also
// fixes cross-origin issues with iframes. For instance, we want
// clicked links to open in the browser window and not within the iframe.

import fs from 'fs';
import followRedirects from 'follow-redirects';
const https = followRedirects.https;
import graymatter from 'gray-matter';
import filenamifyUrl from 'filenamify-url';

import process from 'process';
import minimist from 'minimist';
const argv = minimist(process.argv.slice(2));
let sourcePath = process.env.npm_config_srcdir || argv.srcdir || '.';
if (sourcePath.endsWith('/')) sourcePath.slice(0, -1);

const inDir = sourcePath + '/_posts';
const outRelativeDir = '/embeds/cached'
const outDir = sourcePath + outRelativeDir;

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

cacheRemoteLinks(inDir);

function cacheRemoteLinks(path) {
    
    const dir = fs.opendirSync(path);
    let dirent;
    while ((dirent = dir.readSync()) !== null) {
      const subpath = path + '/' + dirent.name;
      if (dirent.isFile()) {
        
          const filedata = fs.readFileSync(subpath);
          const frontmatter = graymatter(filedata);
  
          // ignore files not in Jekyll format
          if (Object.keys(frontmatter.data).length > 0) {
            let remoteUrl = frontmatter.data.embedded_remote;
            if (remoteUrl) {
                let slug = filenamifyUrl(remoteUrl);
                let outPath = outDir + '/' + slug + '/';
                if (!fs.existsSync(outPath)) {
                    fs.mkdirSync(outPath);
                    cacheRemoteWebpage(remoteUrl, outPath);

                    frontmatter.data.embedded = outRelativeDir + '/' + slug;

                    let newFileContent = graymatter.stringify(frontmatter, frontmatter.data);
                    fs.writeFileSync(subpath, newFileContent);
                    console.log(`updated ${subpath}`);
                }
            }
          }
      } else if (dirent.isDirectory()) {
        cacheRemoteLinks(subpath);
      }
    }
    dir.closeSync();
}


function cacheRemoteWebpage(url, toPath) {
    console.log(url);

    var content = "";   
    
    var req = https.request(url, function(res) {
        res.setEncoding("utf8");
        res.on("data", function (chunk) {
            content += chunk;
        });
    
        res.on("end", function () {
            content = content.trim()
                // we want all links to open in new tabs instead of in the iframe
                .replace('</head>', '<base target="_blank"></head>');

            content = cacheRemoteImages(content, toPath);
            
            fs.writeFileSync(toPath + "index.html", content);
            console.log(`cached ${url} to ${toPath}`);
        });
    });
    
    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });
    
    req.end();
}

function cacheRemoteImage(url, toPath) {

    var content = "";   
    
    var req = https.request(url, function(res) {
        res.setEncoding('binary');
        res.on("data", function (chunk) {
            content += chunk;
        });
    
        res.on("end", function () {
            fs.writeFileSync(toPath, content, "binary");
            console.log(`cached ${url} to ${toPath}`);
        });
    });
    
    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });
    
    req.end();
}

function cacheRemoteImages(html, toPath) {
    if (!fs.existsSync(toPath + "img/")){
        fs.mkdirSync(toPath + "img/");
    }

    let imgRegex = /src="(\S+?\.(?:png|jpg|jpeg|gif|svg|tif|tiff|pdf))\S*?"/gi;
    const matches = html.matchAll(imgRegex);
    for (const match of matches) {
        let imgUrl = match[1];
        let slug = filenamifyUrl(imgUrl);
        html = html.replaceAll(imgUrl, "img/" + slug);
        cacheRemoteImage(imgUrl, toPath + "img/" + slug);
    }
    return html;
}
