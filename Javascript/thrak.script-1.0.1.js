/**************************************************************************************************************

    NAME
        thrak.script-1.0.0.js

    DESCRIPTION
        Script-helper methods that allows to retrieve script url parameters.

	The $. script function will reflect data related to the currently included script. It can be called in
	two ways :

	1) In classic scripts, from the top-level context ; for example :

		var	lang	=  $. script ( ). get ( 'lang', 'fr' ). toLowerCase ( ) ;

	2) In JQuery extensions :

		( function ( $, me )
		    {
			...
		     } 
		 ) ( jQuery, $. script ( ) ;

	   After that, the "me" parameter will refer to the current script.

	$.script() returns an object related to the current script, and contains the following members 
	(note that the given examples refer to the following url : http://www.example.com/dir/file.js?lang=fr) :

	- basename :
		Script file name (eg, "file.js").

	- domain :
		Script domain (eg, "www.example.com").

	- dirname :
		Script directory (eg, "/dir").

	- object :
		The DOM <script> element.

	- parameters :
		An object containing the parameters specified in the query string part of the url.
		In our example, the "parameters" member will contain the following :

		{
			lang : "fr"
		 }

	- path :
		Url path, without query parameters (eg, "http://www.example.com/dir/file.js").

	- query :
		Query parameters (eg, "?lang=fr").

	- url :
		The whole script url (eg, "http://www.example.com/dir/file.js?lang=fr").

	- get ( name, defval ) :
		Retrieves the value of parameter "name". If undefined, "defval" will be returned.

    AUTHOR
        Christian Vigh, 10/2015.

    CREDITS
	This script is inspired from the excellent article :
		http://feather.elektrum.org/book/src.html

    NOTES
	If you want to debug this module, you will have to put a breakpoint somewhere in the calling script.
	Trying to print values after a page is loaded will print the values for the very last <script> 
	node that was encountered in the page, which is certainly not the script you wanted to inspect.

	Also, script parameters MUST NOT be retrieved from a function located in your script file because,
	since your function could be called from everywhere, it would mean that the current script whould be the
	one who called your function, unless you put it in a JQuery extension. 

    HISTORY
    [Version : 1.0]	[Date : 2015/10/07]     [Author : CV]
        Initial version.

    [Version : 1.0.1]	[Date : 2015/10/22]     [Author : CV]
	. Added the 'basename' and 'dirname' actions.
	. Completely remodeled the object architecture.

 **************************************************************************************************************/

 ( function ( $ )
    {
	/*-------------------------------------------------------------------------------------------------------------
	 *
	 *  __get_this_script -
	 *	Returns the DOM <script> object for the calling script.
	 *
	 *-------------------------------------------------------------------------------------------------------------*/
	function  __get_this_script ( )
	   {
		var	scripts		=  document. getElementsByTagName ( 'script' ) ;

		// There are at least 2 scripts on the stack, since this one has been included and called from within another script
		// So checking scripts.length for zero will be useless
		var	this_script	=  scripts [ scripts. length - 1 ] ;		

		return ( this_script ) ;
	    }


	/*-------------------------------------------------------------------------------------------------------------
	 *
	 *  __get_parameters -
	 *	Returns script url parameters as a Javascript object.
	 *
	 *-------------------------------------------------------------------------------------------------------------*/
	function  __get_parameters ( src )
	   {
		// Get query string without the url path
		var	query		=  src. replace ( /^[^\?]+\??/, '' ) ;

		// Returned result is an object containing parameter names/values, or an empty object if no query string
		// was specified
		var	result		=  {} ;
		
		// 
		if (  query )
		   {
			// Split "key=value" pairs that are separated by the ampersand character
			var	key_value_pairs		=  query. split ( /[;&]/ ) ;

			// Loop through results
			for  ( var  i  =  0 ; i  <  key_value_pairs. length ; i ++ )
			   {
				var	key_value	=  key_value_pairs [i]. split ( /=/ ) ;
				
				if  ( ! key_value )	// Paranoia
					continue ;

				var	key		=  key_value [0] ;
				var	value		=  key_value [1] || '' ;	// Empty values are authorized 

				result [ key ]		=  value ;			// Add the key/value pair to the result
			    }
		    }

		return ( result ) ;
	    }


	/*-------------------------------------------------------------------------------------------------------------
	 *
	 *  __get_path, __get_query -
	 *	Returns script path, without query parameters, or query string, without path
	 *
	 *-------------------------------------------------------------------------------------------------------------*/
	function  __get_path ( src )
	   {
		return ( src. replace ( /\?.*/, '' ). replace ( /\\/, '/' ) ) ;
	    }

	function  __get_query ( src )
	   {
		return ( src. replace ( /.*\?/, '?' ) ) ;
	    }


	/*-------------------------------------------------------------------------------------------------------------
	 *
	 *  $. script -
	 *	Returns an object for the current script.
	 *
	 *-------------------------------------------------------------------------------------------------------------*/
	$. script	=  function ( )
	   {
		// Get the currently invoking script
		var	this_script	=  __get_this_script ( ) ;
		var	this_path	=  __get_path ( this_script. src ) ;
		var	this_parameters	=  __get_parameters ( this_script. src ) ;
		var	this_query	=  __get_query ( this_script. src ) ;
		var	path_elements	=  this_path. split ( /\// ) ;

		var	this_basename,
			this_dirname,
			start_index	=  ( path_elements [1]  ==  '' ) ?  2 : 1,
			this_domain	=  path_elements [ start_index ] ;

		this_basename		=  path_elements. pop ( ) ;
		this_dirname		=  '/' + path_elements. slice ( start_index + 1 ). join ( '/' ) ;


		var	script_data	= 
		   {
			basename		:  this_basename,
			domain			:  this_domain,
			dirname			:  this_dirname,
			object			:  this_script,
			parameters		:  this_parameters,
			path			:  this_path,
			query			:  this_query,
			url			:  this_script. src,
			get			:  function  ( name, defval )
			   {
				if  ( this. parameters [ name ]  !==  undefined )
					return ( this. parameters [ name ] ) ;
				else
					return ( defval ) ;
			    }
		    }

		return ( script_data ) ;
	    }
	/*
	$. script	=  function  ( action, name, default_value )
	   {
		// Get the currently invoking script
		var	this_script	=  __get_this_script ( ) ;
		// "action" defaults to "object" if unspecified (ie, return the DOM <script> object)
		var	action		=  ( arguments. length  >  0 ) ?  action. toLowerCase ( ) : 'object' ;

		var	params, result, path_elements ;


		// Handle requested action
		switch ( action ) 
		   {
			// src -
			//	Returns the full url, including url query string
			case	'src' :
				return ( this_script. src ) ;

			// path -
			//	Returns the full url, without the query string
			case	'path' :
				return ( __get_path ( this_script. src ) ) ;

			// dirname -
			//	Returns the directory part of the script.
			case	'dirname' :
				path_elements	=  __get_path ( this_script. src ). split ( /\// ) ;
				path_elements. pop ( ) ;
				
				return ( path_elements. join ( '/' ) ) ;

			// basename -
			//	Returns the filename part of the script.
			case	'basename' :
				path_elements	=  __get_path ( this_script. src ). split ( /\// ) ;

				return ( path_elements. pop ( ) ) ;

			// params or parameters -
			//	Returns an object containing the url parameters.
			case	'params' :
			case	'parameters' :
				return ( __get_parameters ( this_script. src ) ) ;

			// names -
			//	Returns the url parameter names.
			case	'names' :
				result		=  [] ;
				params		=  __get_parameters ( this_script. src ) ;

				for  ( var  i  in  params )
				   {
					if  ( typeof ( params [i] )  ==  'string' )
						result. push ( i ) ;
				    }

				return ( result ) ;

			// param or parameter -
			//	Returns the value of the specified parameter, or a default value if undefined.
			case	'param' :
			case	'parameter' :
				params		=  __get_parameters ( this_script. src ) ;

				if  ( params [ name ] )
					return ( params [ name ] ) ;
				else
					return ( default_value ) ;
					
			// object or undefined argument -
			//	Returns the DOM <script> component.
			case	'object' :
			default :
				return ( this_script ) ;
		    }
	    }
	    */
     } ( jQuery ) ) ;