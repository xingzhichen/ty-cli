#!/usr/bin/env node
const argv = require("yargs").argv;
const shell = require("shelljs");
const path = require("path");
const fs = require("fs-extra");
const { _: args } = argv;
const type = "md";
const os = require("os");
const getPath = name =>
  name ? path.resolve(process.cwd(), name) : process.cwd();
const tyBaseShell = os.platform().match(/^win/)
  ? "start typora"
  : "open -a typora";

let filePath = getPath(args[0]);
if (!fs.pathExistsSync(filePath)) {
  path.extname(filePath)
    ? fs.ensureFileSync(filePath)
    : fs.ensureDirSync(filePath);
}
shell.exec(`${tyBaseShell} ${filePath}`);
