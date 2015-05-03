module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-tslint');
    
    var sourceFiles = ['server/**/*.ts','client/**/*.ts', 'server.ts', '!**/*d.ts'];
    grunt.initConfig({
        pkg: grunt.file.readJSON('./package.json'),
        typescript: {
            base: {
                src: sourceFiles,
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
                src: sourceFiles
            }
        }
    });
 
    grunt.registerTask('default', ['typescript']);
    grunt.registerTask('travis', ['typescript', 'tslint']);
 
};
