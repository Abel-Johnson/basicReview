module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    transport:{
    	webqq: {
    		files:{
    			'.build':['js/drag.js','js/main.js','js/range.js','js/scale.js']
    		}
    	}
    },

    concat: {
      webqq: {
      	files:{
      		'dist/main.js':['.build/js/drag.js','.build/js/main.js','.build/js/range.js','.build/js/scale.js']
      	}
      }
    }
    ,
    uglify: {
    	webqq: {
    		files: {
    			'dist/main.min.js':['dist/main.js']
    		}
    	}
    }
    ,
    babel: {
	    webqq: {
	    	options: {
            presets: ['babel-preset-es2015']
        },
	      files: {
	      	'js/drag.js':'js/drag.js',
	      	'js/main.js':'js/main.js',
	      	'js/range.js':'js/range.js',
	      	'js/scale.js':'js/scale.js'
	      }
	    }
	  }
  });

  // 加载包含 "concat" 任务的插件。
  // grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-cmd-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // 默认被执行的任务列表。
  grunt.registerTask('default', [/*'babel',*/'transport','concat','uglify']);

};