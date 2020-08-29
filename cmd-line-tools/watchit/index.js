#!/usr/bin/env node

const debounce = require("lodash.debounce");
const chokidar = require("chokidar");
const program = require("caporal");
const fs = require("fs");
const fsPromises = fs.promises;
const { spawn } = require("child_process");
const chalk = require("chalk");

program
  .version("0.0.1")
  .argument("[filename]", "Name of a file to execute")
  .action(async ({ filename }) => {
    const name = filename || "index.js";

    try {
      await fsPromises.access(name);
    } catch (err) {
      throw new Error(`Could not find the file ${name}`);
    }

    let proc;
    const start = debounce(() => {
      if (proc) {
        proc.kill();
      }
      console.log(chalk.green(">>>> Starting process..."));
      proc = spawn("node", [name], { stdio: "inherit" });
    }, 100);

    chokidar
      .watch(filename || ".")
      .on("add", start)
      .on("change", start)
      .on("unlink", start);
  });

program.parse(process.argv);
