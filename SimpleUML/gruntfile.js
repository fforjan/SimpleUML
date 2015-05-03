module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-typescript');
 
    grunt.initConfig({
        pkg: grunt.file.readJSON('./package.json'),
        typescript: {
            base: {
                src: ['server/**/*.ts','client/**/*.ts', 'server.ts'],
                options: {
                    module: 'commonjs',
                    target: 'es5'
                }
            }
        }
    });
 
    grunt.registerTask('default', ['typescript']);
 
}
