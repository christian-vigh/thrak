/**************************************************************************************************************

    NAME
        thrak.include-1.0.0.js

    DESCRIPTION
	A JQuery extension for remote file inclusions.
	The following methods are available :

	. $.include.js   ( path, [ callback [, selector [, once ]]] )
	  $.include.css  ( path, [ callback [, selector [, once ]]] )
	  $.include.html ( path, [ callback [, selector [, once ]]] )
	  $.include.text ( path, [ callback [, selector [, once ]]] )
	  $.include.use  ( path, [ callback [, selector [, once ]]] )
		Includes the contents of the specified path in the document. 

		$.include.js() includes a javascript document, whatever its extension is.
		$.include.css() includes a document as a css document.
		$.include.html() includes a document and puts it in a <div> element.
		$.include.text() includes anything and puts it in a <div> element.
		$.include.use() determines the type of inclusion based on the supplied file extension.

		Arguments are :

		. path (string) -
			Url of the file whose contents are to be downloaded.

		. callback (function) -
			Optional. Specifies a user-function to be called when file inclusion (ie, http request)
			will be finished. The callback has the following signature :

				callback ( status, path, object, errmsg ) 

			Callback parameters are described below :
			. status :
				One of the following constants :
				. $.include.INCLUDE_OK -
					File has been successfully included.
				. $.include.INCLUDE_IGNORED -
					The "once" parameter of the inclusion function has been specified as
					true, and the specified path was already included, so no http request
					has been performed.
				. $.include.INCLUDE_ERRROR -
					Http request returned an error code ; in this case, the "errmsg" 
					contains the error message.
			. path :
				The path that has been specified to the js/css/html inclusion function.

			. object :
				The JQuery object that holds the included data.

			. errmsg :
				Contains the error message, when status is equal to $.include.INCLUDE_ERROR.
				In all other cases, this parameter is undefined.

			No return value is expected from this callback function.

		. selector (string or JQuery object) -
			A selector that identifies the part of the html documents which is to receive the
			downloaded contents. It can be for example the id of a <div> element (either '#theid'
			or $('#theid')).
			If not specified, the data will be appended to the document.

		. once (boolean) -
			When true, files are only included once. ; when false, a new DOM element will be 
			created for each inclusion.
			Note that there is a separate download history for css, js and html files.

	. $.include. chain ( file(s) [, callback [, once ] ] ) -
		Includes several files at once, ensuring that they are loaded EXACTLY in the order they were 
		specified (ie, file2 will not be loaded before the loading of file1 has finished, same for
		file3 after file2, etc.).

		Parameters can be specified in any order :

		. file(s) -
			A list of filenames specified either as :
			- a string :
				File to be loaded ; file type will be determined based on its extension :
				css for ".css", javascript for ".js", "html" for html and php files, and
				text for all other extensions.

			- an object :
				Object containing the following members :
				- path (string) :
					The path of the file to be included. This is the only mandatory
					member of this object.
				- type (string) -
					File type : either "css", "js", "html" or "text".
				- callback (function) :
					A callback function, having the same signature as for other inclusion
					directives.
				- once (boolean) :
					Specifies whether files should be included only once or not. The 
					default is false.
				- selector (string or jQuery object) :
					Item which will receive the inclusion directive.

	$.include can also be called as a function :
	
	. $.include ( 'option', options ) -
		Defines the global options for the file inclusions.
		Currently, the "options" object supports the following fields :

		. callback (function) -
			A default callback function that will be called when the js(), css() and html() 
			functions are called without specifying a callback.

		. once (boolean) -
			Indicates if files should be included only once.

	. $.include ( 'option', name, value ) -
		Sets the "name" option to the specified value.

	. $.include ( 'option' ) -
		Returns the current inclusion options.

	. $.include ( 'option', name ) -
		Retrieves the value of the option specified by "name".

	. $.include ( type, path, [ callback [, selector [, once ]]] ) -
		Includes the file specified by "path" ; the "type" parameter can be any one of "css", "js" 
		or "html".

	. $.include ( path, [ callback [, selector [, once ]]] ) -
		Includes the specified file. File type is determined by its extension.

	Javascript contents are inserted using <script> tags ; Css uses <style> tags ; and html contents are
	enclosed with a <div>.

	All the newly created tags have the following attributes :

	. data-type -
		Inclusion type ("js", "css" or "html").

	. data-source -
		Source file name.

	A class="thrak-include" is also added to the inserted data.
	The purpose of defining those classes and attributes is to be able to easily locate the newly inserted 
	tags with their inner data.

    AUTHOR
        Christian Vigh, 10/2015.

    HISTORY
    [Version : 1.0]    [Date : 2015/10/31]     [Author : CV]
        Initial version.

 **************************************************************************************************************/


( function ( $, $script )
   {
	// Global options for $.include()
	var	options		=  
	   {
		callback		:  undefined,
		once			:  false,
		fileTypes		:  
		   {
			'css'		:  
			   {
				tag		:  '<style %a>%s</style>',
				extensions	:  [ 'css' ]
			    },
			'js'		:  
			   {
				tag		:  '<script type="text/javascript" language="javascript" %a>%s</script>',
				extensions	:  [ 'js' ]
			    },
			'html'		:  
			   {
				tag		:  '<div %a>%s</div>',
				extensions	:  [ 'html', 'html', 'php', 'php3', 'php4', 'php5' ]
			    },
			'text'		:
			   {
				tag		:  '<div %a>%s</div>',
				extensions	:  []
			    }
		    },
		includedFiles		:  []
	    } ;


	// get_path -
	//	Prepends the directory part of the current script if the specified path does not start with a slash.
	function  get_path ( path )
	   {
		if  ( path. charAt ( 0 )  !=  '/' )
			path	=  $script. dirname + '/' + path ;

		return ( path ) ;
	    }


	// get_element -
	//	Returns the DOM element corresponding to the include file specified by "path".
	//	Include files are typed ("js", "css" or "html").
	function  get_element ( type, path )
	   {
		var	selector	=  '[data-type="' + type + '"][data-source="' + path + '"]' ;

		return ( $(selector) ) ;
	    }


	// get_extension_type -
	//	Returns the fileType entry corresponding to the specified extension.
	function  get_extension_type ( file )
	   {
		var	match			=  /^.*\.(.*)$/. exec ( file ) ;
		var	extension_type		=  'text' ;


		if  ( match  ===  null )
			return ( extension_type ) ;

		for  ( var  typename  in  options. fileTypes )
		   {
			var	type	=  options. fileTypes [ typename ] ;

			if  ( type. extensions. length  ===  0 )
				break ;

			for  ( var  i = 0 ; i  < type. extensions. length ; i ++ )
			   {
				var	extension	=  type. extensions [i]. toLowerCase ( ) ;

				if  ( extension  ===  match [1] )
				   {
					extension_type	=  extension ;
					break ;
				    }
			    }
		    }

		return ( extension_type ) ;
	    }

	// is_included -
	//	Returns true if the specified path of the specified type has already been included.
	function  is_included ( type, path )
	   {
		for  ( var  i = 0 ; i  <  options. includedFiles. length ; i ++ )
		   {
			var	included_file	=  options. includedFiles [i] ;

			if  ( included_file. type  ==  type  &&  included_file. path  ==  path )
				return ( true ) ;
		    }

		return ( false ) ;
	    }


	// include_file -
	//	Performs file inclusion. Allows the callback, obj and once parameters to be specified in any order.
	function  include_file ( type, path )
	   {
		var	callback	=  undefined,
			obj		=  undefined,
			once		=  options. once ;

		path		=  get_path ( path ) ;

		for  ( i = 2 ; i  <  arguments. length ; i ++ )
		   {
			var	arg		=  arguments [i] ;

			if  ( arg  ===  undefined )
				continue ;

			var	arg_type	=  typeof ( arg ) ;
			
			if  ( arg_type  ==  'function' )
				callback	=  arg ;
			else if  ( arg_type  ==  'object' )
				obj		=  arg ;
			else if  ( arg_type  ==  'boolean' )
				once		=  arg ;
			else
				throw ( 'Unexpected argument of arg_type "' + arg_type + '"' ) ;
		    }

		callback	=  callback  ||  options. callback ;

		do_include ( type, path, callback, obj, once ) ;
	    }


	// append_data -
	//	Once an ajax query has been successful, appends the data to the specified selector
	//	or to document.body if none specified.
	function  append_data ( $this, data, type, path ) 
	   {
		var	attr_string	=  'class="thrak-include" data-type="' + type + '" data-source="' + path + '"' ;
		var	code		=  options. fileTypes [ type ]. tag
						.replace ( '%s', "\n" + data + "\n" )
						.replace ( '%a', attr_string ) ;

		// Use the template defined in type_options to build the final html code
		// Append it to the JQuery object specified by the selector parameter of the js/css/html() calls...
		if  ( $this. length  >  0 )
			$this. append ( code ) ;
		// ... or, if not specified, appends it to the document
		else
			$('body'). append ( code ) ;
	    }


	// do_include -
	//	Responsible for doing the real file inclusion job. Note that here, the order of parameters is important...
	function  do_include ( type, path, callback, obj, once )
	   {
		var	$this		=  $(obj) ;


		// Check if the file was already included
		if  ( once  &&  is_included ( type, path ) )
		   {
			// ... and if yes, invoke the callback function anyway
			if  ( callback )
				callback ( $. include. INCLUDE_IGNORED, path, get_element ( type, path ) ) ;

			return ;
		    }

		// Save type and path of this included file
		options. includedFiles. push ( { type : type, path : path } ) ;

		// Perform the download
		$. ajax
		   ({
			url		:  path,
			async		:  true,
			data		:  $script. parameters,		// Allow url query parameters
			dataType	:  'text',

			// success -
			//	Either append the contents to the document or put them in the user-supplied JQuery object.
			success		:  function ( data ) 
			   { 
				append_data ( $this, data, type, path ) ;

				// Don't forget to invoke the callback, telling it that the inclusion was ignored due to the fact
				// that the specified file was already included (this should not be considered as an error)
				if  ( callback )
					callback ( $. include. INCLUDE_OK, path, get_element ( type, path ) ) ;
			    },

			// error -
			//	Error handler is only here to invoke the user-supplied callback in case of error.
			error		:  function  ( xhr, status, errmsg )
			   {
				if  ( callback )
				   {
					var	msg	=  'Inclusion failed for file \"' + path + '"' ;
					var	extra	=  '' ;

					if  ( status )
						extra	+= '[' + status + '] ' ;

					if  ( errmsg )
						extra	+=  errmsg ;

					if  ( extra  !=  '' )
						msg	+=  ' : ' + extra ;

					callback ( $. include. INCLUDE_ERROR, path, undefined, msg ) ;
				    }
			    }
		     }) ;
	    }


	// $.include ( directive [, args... ] ) -
	//	Main entry point.
	$. include		=  function ( )
	   {
		var	argv		=  Array. prototype. slice. call ( arguments ) ;
		var	argc		=  argv. length ;

		if  ( argc  ==  0 )
			throw ( "$.include() expects at least one argument." ) ;

		var	keyword		=  argv [0]. toLowerCase ( ) ;

		switch  ( keyword )
		   {
			// 'option' keyword :
			//	4 case are possible :
			//	. $.include ( 'option' ) -
			//		Returns the options currently defined.
			//	. $.include ( 'option', object ) -
			//		Sets the current options.
			//	. $.include ( 'option', name ) -
			//		Retrieves the value of the "name" option.
			//	. $.include ( 'option', name, value ) -
			//		Sets the value of the "name" option to "value'.
			case	'option' :
				switch  ( argc )
				   {
					case	1 :
						return ( options ) ;

					case	2 :
						if  ( typeof ( argv [1] )  ==  'object' )
							options		=  argv [1] ;
						else
							return ( options [ argv [1] ] ) ;
						break ;

					case	3 :
					default :
						options [ argv [1] ]	=  argv [2] ;
				    }
				break ;

			// 'css', 'js' or 'html' file inclusion :
			case	'css' :
			case	'js' :
			case	'html' :
				include_file. apply ( null, argv ) ;
				break ;

			// Other cases :
			//	First argument is a filename to be included ; determine its type 
			default :
				var	extension_type		=  get_extension_type ( keyword ) ;

				include_file. apply ( null, [ extension_type ]. concat ( argv ) ) ;
		    }

		return ( $. include ) ;
	    }
		
	// Include status constants
	$. include.  INCLUDE_OK			=  1 ;
	$. include.  INCLUDE_IGNORED		=  2 ;
	$. include.  INCLUDE_ERROR		=  0 ;

	// Inclusion directives
	$. include.  css			=  function ( path, callback, obj, once )
	    { include_file ( 'css', path, callback, obj, once ) ;  return ( $. include ) ; } ;

	$. include.  js				=  function ( path, callback, obj, once )
	    { include_file ( 'js', path, callback, obj, once ) ;  return ( $. include ) ; },

	$. include.  html			=  function ( path, callback, obj, once )
	    { include_file ( 'html', path, callback, obj, once ) ;  return ( $. include ) ; }

	$. include.  text			=  function ( path, callback, obj, once )
	    { include_file ( 'text', path, callback, obj, once ) ;  return ( $. include ) ; }

	$. include. use				=  function ( path, callback, obj, once )
	   {
		var	extension_type		=  get_extension_type ( path ) ;

		include_file ( extension_type, path, callback, obj, once ) ;  
		
		return ( $. include ) ;
	    }

	// chained inclusions
	$. include. chain			=  function ( )
	   {
		var	callback		=  undefined ;
		var	once			=  false ;
		var	entries			=  [] ;

		// First step : 
		//	Collect all the parameters and put them into the appropriate variables.
		//	Function argument represents the callback function.
		//	Boolean argument indicates if files should be included only once.
		//	String arguments is the name of a file to be included.
		//	Object arguments can have the following members :
		//	- path (mandatory string)
		//	- callback (function)
		//	- selector (jquery selector)
		//	- type (string)
		//	- once (boolean indicating whether the file should be included only once)
		for  ( var  i = 0 ; i  < arguments. length ; i ++ )
		   {
			var	arg		=  arguments [i] ;
			var	argtype		=  typeof ( arg ). toLowerCase ( ) ;

			switch  ( argtype )
			   {
				// String parameter :
				//	Name of a file to be included.
				case	'string' :
					entries. push ( { path : arg } ) ;
					break ;

				// Object parameter :
				//	Allows to specify an include file + additional information.
				case	'object' :
					if  ( arg. path  ===  undefined )
						throw ( "Parameter #" + ( i + 1 ) + " should have at least one member called 'file'." ) ;

					entries. push ( arg ) ;
					break ;

				// Function parameter :
				//	Specifies a callback function to be called when the last specified file will be loaded.
				case	'function' :
					callback	=  arg ;
					break ;

				// Boolean parameter :
				//	Specifies if the files are to be loaded only once. Can be overriden when an include file
				//	is specified as an object.
				case	'boolean' :
					once		=  arg ;
					break ;

				default :
					throw ( "Invalid type " + argtype + " for parameter #" + ( i + 1 ) ) ;
			    }
		    }

		// Second step : complete all the missing members in the entries array
		for  ( var  i = 0 ; i  <  entries. length ; i ++ )
		   {
			var	entry	=  entries [i] ;

			entry. path	=  get_path ( entry. path ) ;

			if  ( entry. callback  ===  undefined )
				entry. callback		=  undefined ;

			if  ( entry. selector  ===  undefined )
				entry. selector		=  undefined ;

			if  ( entry. once  ===  undefined )
				entry. once	=  once ;

			if  ( entry. type  ===  undefined )
				entry. type	=  get_extension_type ( entry. path ) ;

			entry. status		=  undefined ;
			entry. error		=  undefined ;
		    }

		// Third step : include the specified files in sequential order
		chain_entries ( entries, [], [], [], callback ) ;
	    }


	// chain_entries -
	//	Sequentially loads the specified files.
	function  chain_entries ( entries, included_files, ignored_files, error_files, callback )
	   {
		// No more files to include : invoke the callback function and return
		if  ( entries. length  ===  0 )
		   {
			if  ( callback )
				callback ( included_files, ignored_files, error_files ) ;

			return ;
		    }

		var	entry	=  entries [0] ;
		var	$this	=  $(entry. selector) ;

		// File is to be included once : add it to the list of ignored files
		if  ( entry. once  &&  is_included ( entry. type, entry. path ) )
			ignored_files. push ( entry ) ;
		// File is to be downloaded
		else
		   {
			$. ajax
			   ({
				url		:  entry. path,
				async		:  true,
				data		:  $script. parameters,		// Allow url query parameters
				dataType	:  'text',

				// success -
				//	Either append the contents to the document or put them in the user-supplied JQuery object.
				success		:  function ( data ) 
				   { 
					// Add this file contents to the document
					append_data ( $this, data, entry. type, entry. path ) ;

					// Add it to the list of processed files
					entry. status	=  true ;
					included_files. push ( entry ) ;

					// Then same player shoot again, with the rest of files
					chain_entries ( entries. slice ( 1 ), included_files, ignored_files, error_files, callback ) ;
				    },

				// error -
				//	Error handler is only here to invoke the user-supplied callback in case of error.
				error		:  function  ( xhr, status, errmsg )
				   {
					entry. status	=  false ;
					entry. error	=  '' ;

					if  ( status )
						entry. error	=  '[' + status + '] ' ;

					if  ( errmsg )
						entry. error	+=  errmsg ;

					error_files. push ( entry ) ;

					chain_entries ( entries. slice ( 1 ), included_files, ignored_files, error_files, callback ) ;
				    }
			     }) ;
		    }
	    }

    } ) ( jQuery, $. script ( ) ) ;
