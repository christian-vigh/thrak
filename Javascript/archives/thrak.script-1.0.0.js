/**************************************************************************************************************

    NAME
        thrak.script-1.0.0.js

    DESCRIPTION
        Script-helper methods that allows to retrieve script url parameters.

	The $. script function will reflect data related to the currently included script. It can be called in
	the following ways :

	$. script ( )  or  $. script ( 'object' ) -
		Returns the Javascript <script> object.

	$. script ( 'src' ) or $. script ( 'source' ) -
		Returns the source path of the script, including url parameters.

	$. script ( 'path' ) -
		Returns the source path of the script, without url parameters.

	$. script ( 'param', name [, default_value] ) -
		Returns the url parameter specified by "name", or the default value if it does not exist.
		'param' can also be specified as 'parameter'.
		If 'name' is not specified, an object containing the parameters and their values is returned.

	$. script ( 'params' )  or  $. script ( 'parameters' ) -
		Returns an object containing the parameter names together with their values.

	$. script ( 'names' ) -
		Returns the name of all the parameters specified in the url.

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
	one who called your function. 

	So a safe way to retrieve script parameters is to place their retrieval in your script in the global
	scope :
	
	// Example.js file
	var  lang	=  $.script ( 'param', 'lang' ) ;

	$(document). ready ( / * some code here * / ) ;

    HISTORY
    [Version : 1.0]    [Date : 2015/10/07]     [Author : CV]
        Initial version.

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
	 *  $. script ( action, name, default_value ) -
	 *	Main entry point.
	 *
	 *-------------------------------------------------------------------------------------------------------------*/
	$. script	=  function  ( action, name, default_value )
	   {
		// Get the currently invoking script
		var	this_script	=  __get_this_script ( ) ;
		// "action" defaults to "object" if unspecified (ie, return the DOM <script> object)
		var	action		=  ( arguments. length  >  0 ) ?  action. toLowerCase ( ) : 'object' ;

		var	params, result ;


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
				return ( this_script. src. replace (/\?.*/, '' ) ) ;

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
     } ( jQuery ) ) ;