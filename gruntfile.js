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
    var electronWindows = "https://github.com/atom/electron/releases/download/" +electronVersion +
                           "/electron-"+ electronVersion + "-win32-ia32.zip";
                           
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
            },
            deployContentWindows : {
                    files: [
                        {expand: true, src: packageContentSrcFile, dest: 'dist/windows/resources/app/', filter: 'isFile'}
                    ]
            }
        },
        wget: {
          electronDarwin: {
            files: {
              'tmp/electronDarwin.zip': electronDarwin,
            }
          },
          electronWindows: {
            files: {
              'tmp/electronWindows.zip': electronWindows,
            }
          }
        },
         exec: {
             unzipElectronDarwin: {
                    command: 'unzip -o tmp/electronDarwin.zip -d dist/darwin/'
             },
             unzipElectronWindows: {
                    command: 'unzip -o tmp/electronWindows.zip -d dist/windows/'
             },
             zipSimpleUMLDarwin: {
                    command: 'cd ./dist/darwin; zip -ry ../SimpleUML-darwin-x64.zip .'
             },
             zipSimpleUMLWindows: {
                    command: 'cd ./dist/windows; zip -ry ../SimpleUML-windows-x32.zip .'
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
    grunt.registerTask('extractElectronWindows', ['wget:electronWindows', 'exec:unzipElectronWindows']);
    
    grunt.registerTask('make-dist-darwin', ['mkdir:dist', 'extractElectronDarwin', 'copy:deployContentDarwin','exec:zipSimpleUMLDarwin']);
    grunt.registerTask('make-dist-windows', ['mkdir:dist', 'extractElectronWindows', 'copy:deployContentWindows', 'exec:zipSimpleUMLWindows']);
    
    grunt.registerTask('make-dist', ['make-dist-darwin','make-dist-windows']);
    
    grunt.registerTask('default', ['typescript']);
    grunt.registerTask('travis', ['typescript', 'tslint']);
 
};
