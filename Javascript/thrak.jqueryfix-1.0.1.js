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
	$. fn. outerHtml	=  function ( html )
	   { 
		if  ( arguments. length  ===  0 )
			return ( this [0]. outerHTML ) ; 
		else
			this. replaceWith ( html ) ;
	    }

	// attr -
	//	Extends the original attr() function to return all attributes for a given jQuery object.
	//	This function is defined as a traditional one (__attr), because nesting such constructs :
	//		( function ( p ) { } ( $. fn. something ) )
	//	within an anonymous functions has strange side effects (it makes for example the this.replaceWith() call
	//	in the $.fn.outerHtml() function above non-existent).
	//	Once again, thank you javascript for those endless hours spent into debugging architectural insanities and 
	//	language quirks. Don't know how many developers justify their work upon that.
	function  __attr ( old )
	   {
		$. fn. attr	=  function ( )
		   {
			if  ( arguments. length  ===  0 ) 
			   {
				if  ( this. length  ===  0 ) 
					return ( null ) ;

				var	obj	=  {} ;

				$. each 
				   ( 
					this [0]. attributes, 
					function ( ) 
					   {
						if  ( this. specified ) 
							obj [ this. name ]	=  this. value ;
					    }
				    ) ;

				return ( obj ) ;
			    }

			return ( old. apply ( this, arguments ) ) ;
		    } 
	     } ;

	__attr ( $. fn. attr ) ;


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
