import arg from "arg";
import fs from "fs";
import Main from "./main.js";

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--config": String,
      "--init": Boolean,
      "-c": "--config",
      "-i": "--init",
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  return {
    configFile: args["--config"] || "./ds-docs.json",
    init: args["--init"] || false,
    targetDirectory: process.cwd(),
  };
}

//init task --
// make config file -- ds-docs.json
  // "requireDoc": --DEFAULT[false]
  // "excludeDir": ["node_modules", ".git"],
  // "buildDir": --DEFAULT[./ds-docs] --ASK
  // "projectName": "Project Name" --ASK[Required] ,
  // "projetDescription": "Directly/Directory structured documentation." --ASK

function loadConfigFile(options) {
  try {
    const config = JSON.parse(fs.readFileSync(options.configFile));
    return {
      ...options,
      ...config,
    };
  } catch {
    process.stderr("Could not find ./ds-docs.json")
    process.exit(1);
  }
}

export default async function cli(args) {
  //Parse options and load config file
  let options = parseArgumentsIntoOptions(args);
  options = loadConfigFile(options);
  options.extension = options.requireDoc ? ".doc.md" : ".md"
  //Do stuff -- pass options to main
  Main(options);
}
