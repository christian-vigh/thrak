/**************************************************************************************************************

    NAME
        thrak.ui.jqueryfix-1.0.0.js

    DESCRIPTION
	Fixes some jQuery strange behaviors.
		
    USAGE
	// Just include this file...

    AUTHOR
        Christian Vigh, 11/2013.

    HISTORY
    [Version : 1.0]	[Date : 2013/11/25]     [Author : CV]
        Initial version.

    [Version : 1.0.1]	[Date : 2015/10/23]     [Author : CV]
	. Added extensions to JQuery prototypes.

 **************************************************************************************************************/

( function ( $ )
   {
	// Tooltips : re-enable HTML contents in [title] attributes, that were suppressed with jQuery 1.9.x.
	$. widget 
	   ( 
		"ui.tooltip", 
		$. ui. tooltip, 
		{
			options	: 
			   {
				content	:  function ( ) 
				   {
					return ( $(this). attr ( 'title' ) ) ;
				    }
			    }
		 }
	    ) ;	       
	       
	// outerHtml -
	//	Same as html(), but for outer html
	$. prototype. outerHtml	=  function ( html )
	   { 
		if  ( html  ===  undefined )
			return ( this [0]. outerHTML ) ; 
		else
			this. replaceWith ( html ) ;
	    }

	// killEvent -
	//	I was fed up to check if an event was not undefined, if it contained preventDefault() and stopxxx(),
	//	when all I wanted to do was really preventing the event from propagating anymore.
	$. prototype. killEvent	=  
	Event. prototype. kill	=  function  ( e )
	   {
		if ( e )
		   {
			e. preventDefault		&&  e. preventDefault ( ) ;
			e. stopPropagation		&&  e. stopPropagation ( ) ;
			e. stopImmediatePropagation	&&  e. stopImmediatePropagation ( ) ;
		    }
	    }
    } ( jQuery ) ) ;
