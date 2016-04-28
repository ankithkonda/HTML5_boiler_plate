module.exports = function(grunt){

	grunt.initConfig({
		concurrent:{
			app:["watch:dev_reload", "watch:js_ugly", "browserify", "watch:scss_bundle"],
			options: {
				logConcurrentOutput: true
			}
		},
		browserify: {
			dist: {
				files: {
				  'build/js/app.js': ['www/js/**/*.js']
				},
				options:{
					watch: true,
					keepAlive: true
				}
			}
		},
		watch:{
			
			scss_bundle:{
				files:["www/sass/**/*.scss"],
				tasks:["sass"]
			},
			js_ugly:{
				files:["build/js/app.js"],
				tasks:["uglify:js"]
			},
			dev_reload:{
				files:["build/js/app.js", "build/css/app.css", "index.html"],
				options: {
			      livereload: {
			        host: 'localhost',
			      }
			    }
			},
		},
		uglify: {
		    js: {
		      files: {
		        'build/js/app.min.js': ['build/js/app.js']
		      }
		    }
	  	},
		sass: {
			dist: {
				files: {
					'build/css/app.css': 'www/sass/main.scss',
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-sass');


	grunt.registerTask('run', ["concurrent:app"]);
}