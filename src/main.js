import fs from "fs";
import path from "path";
import { CreateHomePage, CreatePage, CreatePages } from "./build/build.js";
const docPaths = [];

function getFilePaths(options) {
  traverseDir("./", options.extension, options.excludeDir);
}

function traverseDir(dir, extension, exclude) {
  //Recursive file path function.
  //Get all .md || .dsdoc.md files in the root project folder.
  fs.readdirSync(dir).forEach((file) => {
    let fullPath = path.join(dir, file);

    if (exclude.findIndex((e) => dir.endsWith(e)) > -1) {
      //This should skip any directories that are in the excluded list including subdirectories
      return;
    }

    if (fs.lstatSync(fullPath).isDirectory()) {
      //Check if file path is in the excluded list from ds-docs.json
      traverseDir(fullPath, extension, exclude);
    } else {
      if (fullPath.endsWith(extension)) {
        docPaths.push(fullPath);
      }
    }
  });
}

export default async function Main(options) {
  const pages = [];
  //FS functions
  if (!fs.existsSync(options.buildDir)) {
    fs.mkdirSync(options.buildDir);
  }
  getFilePaths(options);

  // HTML Generation functions
  docPaths.forEach((path) => {
    const page = CreatePage(path);
    pages.push(page);
  });
  CreatePages(pages, options);
  CreateHomePage(pages, options);
}
