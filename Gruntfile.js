module.exports = function (grunt) {
  "use strict";

  var webAppDir = "webapp";
  var targetDir = "dist";
  var tmpDirUglify = targetDir + "/tmp-uglyfy"
  var tmpDir = targetDir + "/tmp";
  var tmpDirDbg = targetDir + "/tmp-dbg";
  var tmpDirBabel = targetDir + "/tmp-babel";

  var config = {
    babel: {
      options: {
        sourceMap: true,
        presets: [
          [
            "@babel/preset-env",
            {
              "useBuiltIns": "entry",
              "debug": true
            }
          ]
        ]
      },
      dist: {
        files: [{
          expand: true, // Enable dynamic expansion.
          cwd: "webapp/", // Src matches are relative to this path.
          src: ["**/*.js", "!test/**", "!index_local.html"],
          dest: tmpDirBabel, // Destination path prefix.
          //ext: ".js",   // Dest filepaths will have this extension.
          //extDot: "first",   // Extensions in filenames begin after the first dot
          filter: function (filepath) {
            return !filepath.match(new RegExp("webapp/libs", "gi"));
          }
        }]
      }
    },
    uglify: {
      options: {
        mangle: true,
        compress: {
          drop_console: true,
          dead_code: false,
          unused: false
        }
      },
      babel: {
        files: [{
          expand: true,
          cwd: tmpDirBabel,
          src: ["**/*.js", "!test/**", "!index_local.html"],
          dest: tmpDirUglify
        }]
      }
    },
    clean: {
      build: [targetDir],
      cleanBabel: [tmpDirBabel],
      cleanUglify: [tmpDirUglify]
    },
    copy: {
      copyToDbg: {
        files: [{
          expand: true,
          src: "**/*.js",
          dest: tmpDirDbg,
          cwd: tmpDirBabel,
          filter: function (filepath) {
            // prevent js from localService to be copied
            return !filepath.match(new RegExp(webAppDir + "(\\/|\\\\)localService", "gi"));
          }
        }, {
          expand: true,
          src: "libs/**/*.js",
          dest: tmpDir,
          cwd: webAppDir
        }, {
          expand: true,
          src: "**/*.css",
          dest: tmpDirDbg,
          cwd: webAppDir
        }]
      },
      copyToTmp: {
        files: [{
          expand: true,
          src: "**/*.js",
          dest: tmpDir,
          cwd: tmpDirUglify,
          filter: function (filepath) {
            // prevent js from localService to be copied
            return !filepath.match(new RegExp("build" + "(\\/|\\\\)localService", "gi"));
          }
        }, {
          expand: true,
          src: "libs/**/*.js",
          dest: tmpDir,
          cwd: webAppDir
        }, {
          expand: true,
          src: "**/*.css",
          dest: tmpDir,
          cwd: webAppDir
        }, {
          expand: true,
          src: "localService/metadata.xml",
          dest: tmpDir,
          cwd: webAppDir
        }, {
          expand: true,
          src: "**/*",
          dest: tmpDir,
          cwd: webAppDir,
          filter: function (filepath) {
            // prevent js and css files and contents of webapp/test from being copied
            return !filepath.match(new RegExp("(" + webAppDir +
              "(\\/|\\\\)test|${webAppDir}(\\/|\\\\)localService|\\.js$|\\.css$|\\.ts$|\\test.html$)", "gi"));
          }
        }]
      }
    }
  };

  grunt.loadNpmTasks("grunt-babel");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("@sap/grunt-sapui5-bestpractice-build");
  grunt.config.merge(config);

  grunt.registerTask("ui5", "runs my tasks", function () {
    var tasks = [
      "clean:build",
      "babel",
      "uglify:babel",
      "build",
      "lint",
      "clean:cleanBabel",
      "clean:cleanUglify"
    ];

    // Use the force option for all tasks declared in the previous line
    // grunt.option("force", true);
    grunt.option("stack", true);
    grunt.task.run(tasks);
  });
};