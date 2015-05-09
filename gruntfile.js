module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-tslint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-wget');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-typedoc');
    grunt.loadNpmTasks('grunt-tsd');
    
    var packageInfo = grunt.file.readJSON('./package.json');
    
    var tsSourceFiles = ['application/**/*.ts', 'server.ts'];
    var packageContentSrcFile = ["package.json", "server.js",'application/**/*', '!**/*.ts'];

    var electronVersion = 'v' + packageInfo.devDependencies['electron-prebuilt'];

    var electronDarwin = "https://github.com/atom/electron/releases/download/" +electronVersion +
                           "/electron-"+ electronVersion + "-darwin-x64.zip";
    var electronWindows = "https://github.com/atom/electron/releases/download/" +electronVersion +
                           "/electron-"+ electronVersion + "-win32-ia32.zip";
                           
    grunt.initConfig({
        pkg: packageInfo,
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
         },
         typedoc: {
            build: {
                options: {
                    module: 'commonjs',
                    target: 'es5',
                    out: 'docs/',
                    name: 'Simple UML',
                    theme: 'minimal'
                },
                src: tsSourceFiles
            }
        },
        tsd: {
            refresh: {
                options: {
                    // execute a command
                    command: 'reinstall',

                    config: 'tsd.json',

                    // experimental: options to pass to tsd.API
                    opts: {
                        // props from tsd.Options
                    }
                }
            }
        }
    });


    grunt.registerTask('extractElectronDarwin', ['wget:electronDarwin', 'exec:unzipElectronDarwin']);
    grunt.registerTask('extractElectronWindows', ['wget:electronWindows', 'exec:unzipElectronWindows']);
    
    grunt.registerTask('make-dist-darwin', ['mkdir:dist', 'extractElectronDarwin', 'copy:deployContentDarwin','exec:zipSimpleUMLDarwin']);
    grunt.registerTask('make-dist-windows', ['mkdir:dist', 'extractElectronWindows', 'copy:deployContentWindows', 'exec:zipSimpleUMLWindows']);
    
    grunt.registerTask('make-dist', ['make-dist-darwin','make-dist-windows']);
    
    grunt.registerTask('build', ['tsd:refresh', 'typescript'])
    grunt.registerTask('default', ['build']);
    grunt.registerTask('quality', ['tslint', 'typedoc']);
    grunt.registerTask('travis', ['build', 'quality', 'make-dist']);
 
};
