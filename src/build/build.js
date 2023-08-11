import fs from "fs";
import { marked } from "marked";
import fm from "front-matter";

import { Page } from "./templates/page.js";

export function CreatePage(pagePath) {
  const data = fs.readFileSync(pagePath, "utf8");
  const content = fm(data);
  content.body = marked(content.body);
  content.path = pagePath;
  return content;
}

export function CreatePages(pages, config) {
  pages.forEach((page) => {
    if (!fs.existsSync(`${config.buildDir}/${page.path}`) && !page.attributes.homepage)
      fs.mkdirSync(`${config.buildDir}/${page.path}`, { recursive: true });
  });
  //call twice so that folder structure is built first, for page calls to reference paths
  pages.forEach((page) => {
    if(page.attributes.homepage) {
      return
    }
    fs.writeFile(`${config.buildDir}/${page.path}/index.html`, Page(page, config), (e) => {
      if (e) throw e;
      console.log(`${page.path}/index.html was created successfully`);
    });
  });
}

export function CreateHomePage(pages, config) {
  let page;
  pages.forEach((e) => {
    if(e.attributes.homepage){
      page = e
    }

  })
    fs.writeFile(`${config.buildDir}/index.html`, Page(page, config), e => {
      if (e) throw e;
      console.log(`index.html was created successfully`);
    });
  };
  