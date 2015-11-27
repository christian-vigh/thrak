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

$Configuration =  
   [
   	// Site/application environment-related variables
	'Environment'		 		=>  
	   [
	   	// Directories to look for when searching for a relative include file. The current directory
	   	// ["."] is always prepended to the list by the Thrak library
	   	'include-path'			=>  
	   	    [
			"private://include",
			"public://include",
			"thrak://PHP/Contribs",
			"thrak://PHP/Contribs/is_email"
	   	     ],
		// Javascript include paths. "thrak://" and "site://" references are allowed.
		'js-include-path'	=>   
		   [
			".", 
			"thrak://Javascript", 
			"thrak://Javascript/contribs",
			"thrak://Javascript/contribs/jquery",
			"thrak://Javascript/contribs/phpjs/functions/",
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
		    ],
		// CSS include paths?
		'css-include-path'		=>   
		   [
			".",
			"thrak://Css", 
			"thrak://Javascript/contribs/jquery/css", 
			"thrak://Javascript/contribs"
		    ],
		// Log files dir
		'log-dir'			=>  'site://logs',
		// Data directory
		'data-dir'			=>  'site://data'
	    ],

	// Console-mode related parameters
	'Console'		 		=>  
	   [
	   	// Maximum line width, in characters
	   	'line-width'			=>  110
	    ],

	'autoload'				=>  
	   [
		// Compression scheme : none, strip [php_strip_whitespace] or gzip
		'compression'			=>  'gzip',
		
		// Display statistics ? [only available for CLI mode]
		// Either true, false or 'environment', where the THRAK_STATISTICS environment variable
		// determines whether to show them or not [integer value]
		'show-statistics'		=>  'environment',
		
		// Reporting level [detailed, summary]
		'reporting-level'		=>  'summary'
	    ],
	   
	// Runtime behavior
	'Runtime'				=>  
	   [
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
	   ],


	// Database parameters
	'Database' 				=>  
	   [
	   	// Default connection information
	   	'default'	=>  
	   	   [
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
	   	   	'profile'	=>  false,			// When true, queries are timed,
			'persistent'	=>  true			// When true, the established connection will be persistent
	   	    ]
	     ],
	// Sms
	'Sms'					=>
	   [
		'free-mobile.fr'		=>
		   [
			'send-url'		=>  'https://smsapi.free-mobile.fr/sendmsg',
			'method'		=>  'get'
		    ]
	    ],
	// Security
	'Security'				=>  
	   [
		'random'			=>  
		   [
			'providers'		=>  
			   [ 
				'ValueFileRandomProvider'	=>  
				   [
					'data-file'		=>  "site://Data/randomfifo.bin"
				    ],
				'RandomOrgRandomProvider'	=>   [],
				'DevURandomRandomProvider'	=>   [],
				'StandardRandomProvider'	=>   []
			    ]
		    ],

	    ],
	// Sessions
	'Session'				=>  
	   [
		// 'autostart' :
		//	When true, a session will be automatically started when the Session object is instanciated
		'autostart'			=>  true
	    ],
	
	// Javascript contribs
	'Javascript'				=>  
	   [
		// JQuery 
	   	'jquery'			=>  
	   	    [
		        'location'		=>  "//ajax.googleapis.com/ajax/libs/jquery/%v/jquery.%m.js",
			'version'		=>  "2.1.4",
			'minified'		=>  true
	   	     ],
		// JQuery UI
	   	'jquery-ui'			=>  
	   	    [
		        'location'		=>  "//ajax.googleapis.com/ajax/libs/jqueryui/%v/jquery-ui.%m.js",
			'version'		=>  "1.11.4",
			'minified'		=>  true
	   	     ],
		// JQuery UI themes
		'jquery-ui-themes'		=>  
		   [
			'location'		=>  "themes/%t/jquery-ui-%v.%c.%m.css",
			'version'		=>  "1.10.3",
			'minified'		=>  true,
			'custom'		=>  true
		    ],
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
	    ],
	// Security
	'Security'				=>  
	   [
		/***
			Security options processed by the WebSite class. A typical example would be the following :

			// When true, http requests, together with the contents of the following superglobals :
			//	$_GET, $_POST, $_COOKIE, $_FILES, $_SESSION
			// are stored in the tracking_buffer table as serialized data.
			// A cron job later analyzes their contents and put them in the tracking_http_access,
			// tracking_http_server_vars and tracking_string_store tables.
			'track-http-requests'		=>  true,

			// Blacklisted domain processing ; it can have the following entries :
			// - table :
			//	Name of the table containing the list of blacklisted domains.
			// - log-table :
			//	Name of the table where http requests from blacklisted domains are recorded.
			// - enabled :
			//	Set it to true to enable blacklisted domain checking.
			// - error-handlers :
			//	A list of error handlers to be called when a blacklisted domain has tried an http
			//	request. Error handlers have two entries : 'action', which determines the action
			//	to be performed (corresponds to one of the \Thrak\Security\***ErrorHandler classes) ;
			//	and 'parameters', which are either a value or an array of values passed as arguments
			//	to the class constructor.
			//	Note that when specified as an array, each array item represents one argument of the
			//	class constructor.
			//	Current, the following actions are defined :
			//	- 'wait' :
			//		Waits the number of seconds specified by the 'parameters' entry.
			//		If specified as an array of two values, then the script will wait for a random
			//		number of seconds ranging comprised between the first and second value.
			//	- 'error-page' :
			//		Generates an error page with the specified http response code.
			//		This action terminates the script.
			'blacklisted-domains'		=>  
			   [
				'table'			=>  'tracking_blacklisted_domains',
				'log-table'		=>  'tracking_blacklist_log',
				'enabled'		=>  true,
				'error-handlers'	=>
				   [
					[ 'action' => 'wait'		, 'parameters' =>  [ 1, 2 ] ],
					[ 'action' => 'error-page'	, 'parameters' =>  500 ] 
				    ]
			    ],
			// Blacklisted email processing. Similar to blacklisted domain processing.
			'blacklisted-emails'		=>  
			   [
				'table'			=>  'tracking_blacklisted_emails',
				'log-table'		=>  'tracking_blacklist_log',
				'enabled'		=>  true,
				'error-handlers'	=>
				   [
					[ 'action' => 'wait'		, 'parameters' =>  [ 1, 2 ] ]
				    ]
			    ]
		 ***/
	    ],
	// The Site entry holds various definitions for the site
	'Site'					=>  
	   [
	    ]
    ] ;