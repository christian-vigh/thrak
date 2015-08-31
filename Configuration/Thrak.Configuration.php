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
			"public://include"
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
			"thrak://CSS", 
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
		'error-reporting'	=>  'default'
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
			'version'		=>  "1.10.2",
			'minified'		=>  true
	   	     ),
		// JQuery UI
	   	'jquery-ui'			=>  array
	   	    (
		        'location'		=>  "//ajax.googleapis.com/ajax/libs/jqueryui/%v/jquery-ui.%m.js",
			'version'		=>  "1.10.3",
			'minified'		=>  true
	   	     ),
		// JQuery UI themes
		'jquery-ui-themes'		=>  array
		   (
			'location'		=>  "themes/%t/jquery-ui-%v.%c.%m.css",
			'version'		=>  "1.10.3",
			'minified'		=>  true,
			'custom'		=>  true
		    )
	    ),
	// Security
	'Security'				=>  array
	   (
		// When set to true, the default verifications apply (blacklisted domains or ips, ips sending too much http requests)
		// This parameter can be set to false to unactivate 'verify-domain', 'verify-ip' and 'verify-frequency' settings.
		'verify'			=>  false,
		// When true, the referrer domain name is checked against blacklisted domains
		'verify-domain'			=>  false,
		// When true, the referrer ip is checked against blacklisted ips
		'verify-ip'			=>  true,
		// When true, the frequency of http requests coming from the same ip is verified.
		// If frequency is too high, the originator will be blacklisted
		'verify-frequency'		=>  true,
		// When true, a mail is sent for each failure
		'send-mail-on-failure'		=>  false,
		// Time to wait in seconds before a response is sent back to the requester
		'shutdown-time'			=>  3,
		// Redirection target
		'shutdow-redirect-to'		=>  'undefined.php',
		// Frequency settings ; every array defines how many http requests a user is allowed to perform in a certain time, along
		// with the duration of its IP address blocking.
		// The entries of each array are :
		// - count :
		//	Number of authorized http requests.
		// - interval :
		//	Interval, in seconds, during which the end-user is allowed at most 'count' http requests.
		// - duration :
		//	Specifies the number of seconds an IP address will remain blocked if it issues more than 'count' http request
		//	within 'interval' seconds.
		// If no appropriate entry is found in this array, the IP address will be blocked forever.
		'frequencies'			=>  array 
		   (
			array 
			   (
				'count'		=>  30,
				'interval'	=>  10,
				'duration'	=>  3 * 60
			    ),
			array 
			   (
				'count'		=>  50,
				'interval'	=>  30,
				'duration'	=>  5 * 60
			    ),
			array 
			   (
				'count'		=>  3,
				'interval'	=>  1, 
				'duration'	=>  1 * 60
			    )
		    )
	    ),
	// The Site entry holds various definitions for the site
	'Site'					=>  array
	   (
		// Default email address for anything
		'webmaster-recipient'		=>  'some.address@some.domain',
		// Address where all the alerts & errors will be mailed to
		'errors-recipient'		=>  'some.address@some.domain'
	    )
    ) ;