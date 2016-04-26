module.exports = function(grunt){



	grunt.initConfig({
	
		concat:{
			scss:{
				src: ['css/*.scss'],
      			dest: 'css/bundle/bundle.scss',
			}
		},
		concurrent:{
			app:["watch:dev_reload", "watch:js_ugly", "watch:css_ugly", "browserify", "watch:scss_bundle"],
			options: {
				logConcurrentOutput: true
			}
		},
		browserify: {
			dist: {
				files: {
				  'build/js/app.js': ['www/js/*.js']
				},
				options:{
					watch: true,
					keepAlive: true
				}
			}
		},
		watch:{
			
			scss_bundle:{
				files:["css/*.scss"],
				tasks:["concat:scss", "sass"]
			},
			js_ugly:{
				files:["build/js/app.js"],
				tasks:["uglify:js"]
			},
			css_ugly:{
				files:["build/css/app.css"],
				tasks:["uglify:css"]
			},
			dev_reload:{
				files:["build/js/app.js", "build/css/app.css"],
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
		    },
		    css:{
		    	files: {
		        'build/css/app.min.css': ['build/css/app.css']
		      }
		    }
	  	},
		sass: {                              // Task 
			dist: {                            // Target 
				options: {                       // Target options 
					style: 'compressed'
				},
				files: {                         // Dictionary of files 
					'build/css/app.css': 'css/bundle/bundle.scss',       // 'destination': 'source' 
				}
			}
		}
	});


	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-sass');


	grunt.registerTask('deploy', ["concurrent:app"]);
}