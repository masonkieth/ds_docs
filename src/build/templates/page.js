import dirTree from "directory-tree";

export const Page = (data, config) =>
  `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${data.attributes.description}" />
        <title>${data.attributes.title}</title>
        
        <link rel="stylesheet" href="https://unpkg.com/@highlightjs/cdn-assets@11.8.0/styles/default.min.css">
        <script src="https://unpkg.com/@highlightjs/cdn-assets@11.8.0/highlight.min.js"></script>
        <script src="https://unpkg.com/@highlightjs/cdn-assets@11.8.0/languages/sql.min.js"></script>
        <script src="https://unpkg.com/@highlightjs/cdn-assets@11.8.0/languages/javascript.min.js"></script>
        <script>hljs.highlightAll();</script>

        <link
        rel="stylesheet"
        href="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/version/v1.28.0/grid.css"
        />
        <link
          rel="stylesheet"
          href="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/version/v1.28.0/plex.css"
        />
        <script
          type="module"
          src="https://1.www.s81c.com/common/carbon/web-components/version/v1.28.0/ui-shell.min.js"
        ></script>
      <style>
        p {
          margin-left: 1rem;
        }
        bx-header ~ bx-side-nav {
          margin-top: 3rem;
          height: calc(100% - 3rem);
        }
        .content {
          margin-left: 275px;
          margin-right: 2rem;
          margin-top: 4rem;
        }
        ul {
          margin: 1rem;
          list-style-type: disc;
          list-style-position: inside;
        }
        pre {
          background: #f4f4f4;
          border: 1px solid #ddd;
          border-left: 3px solid #0f62fe;
          color: #666;
          page-break-inside: avoid;
          font-family: monospace;
          font-size: 15px;
          line-height: 1.6;
          margin-bottom: 1.6em;
          max-width: 100%;
          overflow: auto;
          padding: 1em 1.5em;
          display: block;
          word-wrap: break-word;
        }
        pre:hover {
          background: #f4f4f4;
          border: 1px solid #ddd;
          border-left: 3px solid #d12771;
          color: #666;
          page-break-inside: avoid;
          font-family: monospace;
          font-size: 15px;
          line-height: 1.6;
          margin-bottom: 1.6em;
          max-width: 100%;
          overflow: auto;
          padding: 1em 1.5em;
          display: block;
          word-wrap: break-word;
        }

      </style>

    </head>
    <body>
        <bx-header aria-label=${config.projectName}>
            <bx-header-menu-button
                button-label-active="Close menu"
                button-label-inactive="Open menu"
            ></bx-header-menu-button>
                <bx-header-name href="javascript:void 0" prefix="DS-Docs"
            >${config.projectName}</bx-header-name>
        </bx-header>

        <bx-side-nav aria-label="Side navigation" expanded>
          <bx-side-nav-items>
            ${getFileStructure(config)}
          </bx-side-nav-items>
        </bx-side-nav>
        <div class="content">
                <h1>${data.attributes.title}</h1>
            <p>${new Date(parseInt(data.attributes.date)).toDateString()}</p>
            <hr />
            ${data.body}
        </div>
    </body>
</html>
`;

function genNavMenu(jsonObj, extension) {
  if (!Array.isArray(jsonObj)) {
    return;
  }
  let html = "";
  for (const item of jsonObj) {
    if (item.name.endsWith(extension)) {
      let navPath = item.path.substring(item.path.indexOf('/') + 1)
      html += `<bx-side-nav-link href="/${navPath}">${item.name}</bx-side-nav-link>`;
    } else if(!item.name.endsWith(".html")) {
      html += `<bx-side-nav-menu title=${item.name}>`;
      html += genNavMenu(item.children, extension);
      html += `</bx-side-nav-menu>`;
    }
  }
  html += "";
  return html;
}

function getFileStructure(options) {
  let tree = dirTree(options.buildDir);
  let template = genNavMenu(tree.children, options.extension);
  return template;
}
