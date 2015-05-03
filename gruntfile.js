module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-tslint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-wget');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-mkdir');
    
    var tsSourceFiles = ['server/**/*.ts','client/**/*.ts', 'server.ts', '!**/*d.ts'];
    var packageContentSrcFile = ["package.json", "server.js",'server/**/*', 'client/**/*', '!**/*d.ts', '!**/Typescript/*'];
    var electronVersion = "v0.25.2";
    
    var electronDarwin = "https://github.com/atom/electron/releases/download/" +electronVersion +
                           "/electron-"+ electronVersion + "-darwin-x64.zip";
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('./package.json'),
        typescript: {
            base: {
                src: tsSourceFiles,
                options: {
                    module: 'commonjs',
                    target: 'es5'
                }
            }
        },
        tslint: {
            options: {
                configuration: grunt.file.readJSON("tslint.json")
            },
            files: {
                src: tsSourceFiles
            }
        },
        copy: {
            deployContentDarwin : {
                    files: [
                        {expand: true, src: packageContentSrcFile, dest: 'dist/darwin/Electron.app/Contents/Resources/app/', filter: 'isFile'}
                    ]
            }
        },
        wget: {
          electronDarwin: {
            files: {
              'tmp/electronDarwin.zip': electronDarwin,
            }
          }
        },
         exec: {
             unzipElectronDarwin: {
                 
                    command: 'unzip tmp/electronDarwin.zip -d dist/darwin/'
                 
             }
         },
         mkdir: {
             dist: 
                {
                     options: {
                     create: ['dist']
                }
             },
         }
    });


    grunt.registerTask('extractElectronDarwin', ['wget:electronDarwin', 'exec:unzipElectronDarwin']);
    grunt.registerTask('make-dist-darwin', ['mkdir:dist', 'extractElectronDarwin', 'copy:deployContentDarwin']);
    
    
    grunt.registerTask('default', ['typescript', 'deploy-source']);
    grunt.registerTask('travis', ['typescript', 'tslint']);
 
};
