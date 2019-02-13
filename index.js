"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { promisify } = require('util');
const fs = require("fs");
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const path = require("path");
module.exports = function myPlugin(lasso, config) {
    lasso.dependencies.registerJavaScriptType('lasso-any-file', {
        // Declare which properties can be passed to the dependency type
        properties: {
            'path': 'string',
            'out_dir': 'string'
        },
        // Validation checks and initialization based on properties:
        init(context) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!this.path) {
                    throw new Error('"path" is required');
                }
                if (!this.out_dir) {
                    throw new Error('"out_dir" is required');
                }
                // NOTE: resolvePath can be used to resolve a provided relative path to a full path
                this.path = this.resolvePath(this.path);
            });
        },
        // Read the resource:
        read(context) {
            return __awaiter(this, void 0, void 0, function* () {
                const src = yield readFileAsync(this.path);
                let outDir = lasso.config.fileWriterConfig.outputDir;
                let outDirForSound = path.resolve(outDir, ((config && config.dir_name) || "sounds"), this.out_dir);
                !fs.existsSync(outDirForSound) && fs.mkdirSync(outDirForSound, { recursive: true });
                yield writeFileAsync(path.resolve(outDirForSound, path.basename(this.path)), src);
                // return myCompiler.compile(src);
                // console.log(context);
                // fs.writeFileSync('lasso.json', JSON.stringify(lasso.config));
                return "";
                // NOTE: A stream can also be returned
            });
        },
        // getSourceFile is optional and is only used to determine the last modified time
        // stamp and to give the output file a reasonable name when bundling is disabled
        getSourceFile: function () {
            return this.path;
        }
    });
};
