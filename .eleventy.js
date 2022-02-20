const fs = require('fs');
const htmlmin = require("html-minifier");
const { EleventyRenderPlugin } = require("@11ty/eleventy");
const sass = require('sass');
const path = require('path');

module.exports = function (config) {

  config.setQuietMode(true);
  config.setUseGitIgnore(false);

  config.addWatchTarget("src/assets/");
  config.addPassthroughCopy({ "src/assets": "/" });

  config.addLayoutAlias("base", "base.njk");

  config.addTransform("htmlMin", async function(content, outputPath) { 
    if (outputPath && outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }
    return content;
  });
  
  config.addTemplateFormats("scss");

  // Creates the extension for use
  config.addExtension("scss", {
    outputFileExtension: "css", // optional, default: "html"

		compileOptions: {
      permalink: false,
    },

    // `compile` is called once per .scss file in the input directory
    compile: function (inputContent, inputPath) {
      let parsed = path.parse(inputPath);

      let result = sass.compileString(
        inputContent, 
        {
          loadPaths: [
            parsed.dir || ".",
            this.config.dir.includes
          ],
          style: "compressed"
        }
      );

      return (data) => {
        return result.css.replace(/^\uFEFF/gm, "");
      };
    }
  });

  config.addPlugin(EleventyRenderPlugin);

  config.addPairedShortcode("encode", function (svg) {
    return encodeURIComponent(svg);
  });
  
  config.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, bs) {
        bs.addMiddleware('*', (req, res) => {
          const content_404 = fs.readFileSync('build/404.html');
          res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
          res.write(content_404);
          res.end();
        });
      }
    }
  });

  return {
    markdownTemplateEngine: "njk",
    jsDataFileSuffix: '.data',
    dir: {
      input: 'src',
      output: 'build',
      layouts: 'templates',
      includes: 'components',
      data: 'data'
    }
  };
};
