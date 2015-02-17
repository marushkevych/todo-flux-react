module.exports = function(grunt) {

    grunt.initConfig({
        watchify: {
            options: {
                debug: true
            },
            dist: {
                src: './js/index.js',
                dest: 'dist/bundle.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-watchify');

    grunt.registerTask('default', ['watchify:dist:keepalive']);
};
