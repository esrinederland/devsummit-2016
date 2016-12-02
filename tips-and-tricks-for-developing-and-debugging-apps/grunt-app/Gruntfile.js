module.exports = function (grunt) {
    
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({
        watch: {
            'main': {
                'files': ['src/app/**'],
                'tasks': ['jshint'],
                'options': {
                    'spawn': false,
                    'atBegin': true
                }
            }
        },
        jshint: {            
            allFiles: [
                'src/app/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        clean: {
            'dist': {
                'src': 'dist/**'
            }
        },
        copy: {
            'main': {
                'src': [
                    '**/**.html',
                    '**/**.css'
                ],
                'cwd': 'src',
                'dest': 'dist/',
                'expand': true
            }
        },
        uglify: {
            dist: {
                files: [{
                    expand: true,
                    src: '**/*.js',
                    dest: 'dist/app',
                    cwd: 'src/app'
                }]
            }
        }        
    });

    grunt.registerTask('build', ['jshint', 'clean', 'copy', 'uglify']);
    grunt.registerTask('default', ['watch']);
    
    
}