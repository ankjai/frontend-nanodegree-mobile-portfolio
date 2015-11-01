'use strict'

var ngrok = require('ngrok');

module.exports = function(grunt) {

    // Load grunt tasks
    require('load-grunt-tasks')(grunt);

    // Grunt configuration
    grunt.initConfig({
        pagespeed: {
            options: {
                nokey: true,
                locale: "en_GB",
                threshold: 40
            },
            local: {
                options: {
                    url: "http://6d81f893.ngrok.io",
                    strategy: "desktop",
                    threshold: 90
                }
            },
            mobile: {
                options: {
                    url: "http://6d81f893.ngrok.io",
                    strategy: "mobile",
                    threshold: 90
                }
            }
        }
    });

    // Register customer task for ngrok
    grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function() {
        var done = this.async();
        var port = 8000;
        // var url;

        ngrok.connect(port, function(err, url) {
            if (err !== null) {
                grunt.fail.fatal(err);
                return done();
            }
            grunt.config.set('pagespeed.options.url', url);
            grunt.task.run('pagespeed');
            done();
        });
    });

    // Register default tasks
    grunt.registerTask('default', ['psi-ngrok']);
}
