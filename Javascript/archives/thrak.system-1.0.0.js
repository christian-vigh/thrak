/**************************************************************************************************************

    NAME
        thrak.system-1.0.0.js

    DESCRIPTION
        A jQuery plugin that provides sometimes dirty global extensions to jQuery.
	
    AVAILABLE FUNCTIONS
	$. system. wait ( ms ) -
		Waits for the specified number of milliseconds. This function blocks all UI events.

	$. system. getObjectClass ( obj ) -
		Tries to retrieve the real object name of the specified value.

    AUTHOR
        Christian Vigh, 11/2013.

    HISTORY
    [Version : 1.0]    [Date : 2013/11/09]     [Author : CV]
        Initial version.

 **************************************************************************************************************/

( function ( $ )
   {
	// Make sure there is a "system" and "debug" "namespaces" defined, but don't override an existing one !
	if  ( ! $. system )
		$. system	=  {} ;

	if  ( ! $. debug )
		$. debug	=  {} ;


	// wait ( ms ) -
	//	Waits for the specified number of milliseconds.
	//	This is brute wait, blocking the whole UI.
	$. system. wait	=  function ( ms )
	   {
		var  finished	=  false ;
		var  start	=  ( new Date ( ) ). getTime ( ) ;
	
		setTimeout
		   (
			function ( ) { finished = true ; }, 
			ms
		    ) ;
	    
	    
		while  ( ! finished )
		   {
			if  ( ( new Date ( ) ). getTime ( ) - start  >  ms )
				break ;
		    }
	    }

	
	// getObjectClass ( obj ) -
	//	Tries to retrieve the real class of an object, as a string.
	$. system. getObjectClass	=  function ( obj )
	   {
		// Undefined value
		if  ( typeof ( obj )  ==  "undefined" )
			return ( "undefined" ) ;

		// Null value
		if  ( obj  ==  null )
			return ( "null" ) ;

		// Treat "obj" as an object and obtain its class name from its string representation ("[object something]")
		var	realclass	=  Object. prototype. toString. call ( obj ). match ( /^\[object\s(.*)\]$/ ) [1] ;
		 
		// Some structures may implement a toString() member function like in the following example :
		//	var  s = { field : 1, toString : function ( ) { return ( "structure" ) ; } }
		// When converted to a string, the "structure" string is returned.
		// However, when calling Object. prototype. toString. call(), the string "[object Object]" is returned.
		// In this case, we want to return what the toString() implementation returns.
		if  ( obj. toString )
		   {
			if  ( realclass  ===  'Object' )
				return ( obj. toString ( ) ) ;
		    }

		// Other cases : we have an object class name to return
		return ( realclass ) ;
  	    }


	// loadScript -
	//	Dynamically loads a script.
	$. system. loadScript		=  function  ( path, wait )
	   {
		var	head		=  $('head') [0] ;
		var	script		=  document. createElement ( 'script' ) ;
		var	done		=  false ;


		script. setAttribute ( 'src',  path ) ;
		script. setAttribute ( 'type', 'text/javascript' ) ;

		script. onload			=  
		script. onreadystatechange	=   function ( )
		   {
			if  ( ! done  &&
				( ! this. readyState  ||  this. readyState  ==  'loaded'  ||  this. readyState  ==  'complete' ) )
			   {
				done	=  true ;
				script. onload = script. onreadystatechange = null ;
				callback &&  callback ( ) ;
			    }
		    } ;

		head. insertBefore ( script, head. firstChild ) ;
	    }

    } ( jQuery ) ) ;
