module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: [
                    'src/*.js'
                ],
                dest: 'build/ua.js'
            }
        },

        uglify: {
            build: {
                src: 'build/ua.js',
                dest: 'build/ua.min.js'
            }
        },

        watch: {
            scripts: {
                files: ['src/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['concat', 'uglify', 'watch']);

};