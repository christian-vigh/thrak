<?php
/***************************************************************************************************

    NAME
	Thrak.Configuration.php

    DESCRIPTION
	Configuration file for the Thrak library.

    AUTHOR
	Christian Vigh, 10/2012.

    HISTORY
    [Version : 1.0]		[Date : 2012/10/02]		[Author : CV]
	Initial release.

 ***************************************************************************************************/

$Configuration =  array
   (
   	// Site/application environment-related variables
	'Environment'		 		=>  array
	   (
	   	// Directories to look for when searching for a relative include file. The current directory
	   	// (".") is always prepended to the list by the Thrak library
	   	'include-path'			=>  array
	   	    (
			"private://include",
			"public://include",
			"thrak://PHP/Contribs",
			"thrak://PHP/Contribs/is_email"
	   	     ),
		// Javascript include paths. "thrak://" and "site://" references are allowed.
		'js-include-path'	=>  array 
		   (
			".", 
			"thrak://Javascript", 
			"thrak://Javascript/contribs",
			"thrak://Javascript/contribs/jquery",
			"thrak://Javascript/contribs/phpjs/functions/array",
			"thrak://Javascript/contribs/phpjs/functions/bc",
			"thrak://Javascript/contribs/phpjs/functions/classkit",
			"thrak://Javascript/contribs/phpjs/functions/classobj",
			"thrak://Javascript/contribs/phpjs/functions/ctype",
			"thrak://Javascript/contribs/phpjs/functions/datetime",
			"thrak://Javascript/contribs/phpjs/functions/errorfunc",
			"thrak://Javascript/contribs/phpjs/functions/exec",
			"thrak://Javascript/contribs/phpjs/functions/filesystem",
			"thrak://Javascript/contribs/phpjs/functions/funchand",
			"thrak://Javascript/contribs/phpjs/functions/i18n",
			"thrak://Javascript/contribs/phpjs/functions/info",
			"thrak://Javascript/contribs/phpjs/functions/json",
			"thrak://Javascript/contribs/phpjs/functions/language",
			"thrak://Javascript/contribs/phpjs/functions/mail",
			"thrak://Javascript/contribs/phpjs/functions/math",
			"thrak://Javascript/contribs/phpjs/functions/misc",
			"thrak://Javascript/contribs/phpjs/functions/net-gopher",
			"thrak://Javascript/contribs/phpjs/functions/network",
			"thrak://Javascript/contribs/phpjs/functions/objaggregation",
			"thrak://Javascript/contribs/phpjs/functions/outcontrol",
			"thrak://Javascript/contribs/phpjs/functions/pcre",
			"thrak://Javascript/contribs/phpjs/functions/runkit",
			"thrak://Javascript/contribs/phpjs/functions/stream",
			"thrak://Javascript/contribs/phpjs/functions/strings",
			"thrak://Javascript/contribs/phpjs/functions/url",
			"thrak://Javascript/contribs/phpjs/functions/var",
			"thrak://Javascript/contribs/phpjs/functions/xdiff",
			"thrak://Javascript/contribs/phpjs/functions/xml",
			"thrak://Javascript/contribs/phpjs/functions/_phpjs_shared"
		    ),
		// CSS include paths?
		'css-include-path'		=>  array 
		   (
			".",
			"thrak://Css", 
			"thrak://Javascript/contribs/jquery/css", 
			"thrak://Javascript/contribs"
		    ),
		// Log files dir
		'log-dir'			=>  'site://logs',
		// Data directory
		'data-dir'			=>  'site://data'
	    ),

	// Console-mode related parameters
	'Console'		 		=>  array
	   (
	   	// Maximum line width, in characters
	   	'line-width'			=>  110
	    ),

	'autoload'				=>  array
	   (
		// Compression scheme : none, strip (php_strip_whitespace) or gzip
		'compression'			=>  'gzip',
		
		// Display statistics ? (only available for CLI mode)
		// Either true, false or 'environment', where the THRAK_STATISTICS environment variable
		// determines whether to show them or not (integer value)
		'show-statistics'		=>  'environment',
		
		// Reporting level (detailed, summary)
		'reporting-level'		=>  'summary'
	    ),
	   
	// Runtime behavior
	'Runtime'				=>  array
	   (
	   	// 'normal', 'verbose' or 'stacktrace'
		'error-mode'	=>  'verbose',

	   	// Default log level. Messages having a log level above this value will not be logged.
	   	// A negative log level means that all messages will be logged, whatever their log level is.
	   	'log-level'		=>  -1,

	   	// Tells if logging is enabled or not
	   	'log-enabled'		=>  false,
		   
		// Indicates the level of warnings :
		// 'debug'	:  all warnings and notices will be displayed.
		// 'production' :  No messages will be displayed.
		// 'default'	:  Use current PHP parameters
		'error-reporting'	=>  'debug'
	   ),


	// Database parameters
	'Database' 				=>  array
	   (
	   	// Default connection information
	   	'default'	=>  array
	   	   (
	   		'host'		=>  'localhost',		// Host name
	   	   	'port'		=>  3306,			// Port
	   	   	'user'		=>  'thrak',			// User name
	   	   	'password'	=>  'a0xlz86-_p2q9sjmc0s7z1l',	// User password
	   	   	'database'	=>  'thrak',			// Default current database name
	   	   	'driver'	=>  'mysqli',			// Database driver
	   	   	'table-prefix'	=>  '',				// Default prefix for tables and other database objects
	   	   	'log-file'	=>  'tmp://thrak.db.log',	// Log file path
	   	   	'log'		=>  false,			// When true, database query logging is enabled
	   	   	'debug'		=>  false,			// When true, debug information is logged
	   	   	'profile'	=>  false			// When true, queries are timed
	   	    )
	     ),

	// Security
	'Security'				=>  array
	   (
		'random'			=>  array
		   (
			'providers'		=>  array
			   ( 
				'ValueFileRandomProvider'	=>  array
				   (
					'data-file'		=>  "site://Data/randomfifo.bin"
				    ),
				'RandomOrgRandomProvider'	=>  array ( ),
				'DevURandomRandomProvider'	=>  array
				   (
				    ),
				'StandardRandomProvider'	=>  array ( )
			    )
		    )
	    ),
	// Sessions
	'Session'				=>  array
	   (
		// 'autostart' :
		//	When true, a session will be automatically started when the Session object is instanciated
		'autostart'			=>  true
	    ),
	
	// Javascript contribs
	'Javascript'				=>  array
	   (
		// JQuery 
	   	'jquery'			=>  array
	   	    (
		        'location'		=>  "//ajax.googleapis.com/ajax/libs/jquery/%v/jquery.%m.js",
			'version'		=>  "2.1.4",
			'minified'		=>  true
	   	     ),
		// JQuery UI
	   	'jquery-ui'			=>  array
	   	    (
		        'location'		=>  "//ajax.googleapis.com/ajax/libs/jqueryui/%v/jquery-ui.%m.js",
			'version'		=>  "1.11.4",
			'minified'		=>  true
	   	     ),
		// JQuery UI themes
		'jquery-ui-themes'		=>  array
		   (
			'location'		=>  "themes/%t/jquery-ui-%v.%c.%m.css",
			'version'		=>  "1.10.3",
			'minified'		=>  true,
			'custom'		=>  true
		    ),
		// Compression mode for .jss and .css files
		// Can be one of the following values :
		// - 'none' or boolean false :
		//	The normal file inclusion process applies. An http request will be issued on every included
		//	source file.
		// - 'minify', 'file' or boolean true :
		//	A minified version of the original source file will be generated if needed. An http request
		//	will be issued on every minified file.
		// - 'group' :
		//	All js/css files will be grouped and minified into a single file. At most two http requests
		//	will be issued, one for the file containing the minified/grouped version of included javascript
		//	files, one for the css files.
		'compression'		=>
		   [
			'js'			=>  false,
			'css'			=>  false
		    ]
	    ),
	// Security
	'Security'				=>  array
	   (
	    ),
	// The Site entry holds various definitions for the site
	'Site'					=>  array
	   (
	    )
    ) ;