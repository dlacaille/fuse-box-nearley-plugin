import { Plugin, WorkFlowContext, File } from 'fuse-box/dist/typings';

const nearley = require("nearley/lib/nearley.js");
const compile = require("nearley/lib/compile.js");
const generate = require("nearley/lib/generate.js");
const lint = require("nearley/lib/lint");
const rawGrammar = require("nearley/lib/nearley-language-bootstrapped.js");
const nearleyGrammar = nearley.Grammar.fromCompiled(rawGrammar);

export class NearleyPluginClass implements Plugin {
    public test: RegExp = /\.ne$/;

    public init(context: WorkFlowContext) {
        context.allowExtension(".ne");
    }

    public transform(file: File) {
        file.loadContents();

        var parser = new nearley.Parser(nearleyGrammar);
        parser.feed(file.contents);

        var compilation = compile(parser.results[0], {
            file: file.relativePath,
            args: [file.relativePath]
        });

        lint(compilation, {});

        file.contents = generate(compilation, "grammar");

        file.analysis.parseUsingAcorn();
        file.analysis.analyze();
    }
}

export const NearleyPlugin = () => new NearleyPluginClass();