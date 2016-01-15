/**************************************************************************************************************

    NAME
        thrak.ui.jqueryext-1.0.1.js

    DESCRIPTION
	Fixes some jQuery strange behaviors and implements additional functions.
		
    USAGE
	// Just include this file...

    AUTHOR
        Christian Vigh, 10/2015.

    HISTORY
    [Version : 1.0]	[Date : 2013/11/25]     [Author : CV]
        Initial version.

    [Version : 1.0.1]	[Date : 2015/10/23]     [Author : CV]
	. Added extensions to JQuery prototypes.

    [Version : 1.0.2]	[Date : 2015/12/04]     [Author : CV]
	. Added the textFirst(), textLast(), textNodes() and textAt() JQuery methods.

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
		   {
			if  ( this [0]. nodeType  ==  3 )
				return ( this [0]. nodeValue ) ;
			else
				return ( this [0]. outerHTML ) ; 
		    }
		else
			this. replaceWith ( html ) ;
	    }


	// innerText -
	//	Returns the contents of all the text nodes within a DOM element.
	$. fn. innerText	=  function ( node_separator, element_separator )
	   {
		node_separator		=  node_separator     ||  ' ' ;
		element_separator	=  element_separator  ||  ' ' ;

		var	result		=  $. map 
		   (
			this, 
			function ( element )
			   {
				var	text		=  [] ;

				for  ( var  child  =  element. firstChild ; child ; child  =  child. nextSibling )
					child. nodeType  ===  3  &&  text. push ( child. nodeValue ) ;

				return ( text. join ( node_separator ) ) ;
			    }
		    ). join ( element_separator ) ;

		return ( result ) ;
	    }


	// textFirst, textLast -
	//	Returns the first/last text element of a node.
	$. fn. textFirst	=  function ( element_separator )
	   {
		element_separator	=  element_separator  ||  ' ' ;

		var	result		=  $. map 
		   (
			this, 
			function ( element )
			   {
				var	text		=  undefined ;

				for  ( var  child  =  element. firstChild ; child ; child  =  child. nextSibling )
				   {
					if  ( child. nodeType  ===  3 )  
					   {
						text		=  $(child) ;
						break ;
					    }
				    }

				return ( text ) ;
			    }
		    ) ;

		return ( $(result) ) ;
	    }


	$. fn. textLast	=  function ( )
	   {
		var	result		=  $. map 
		   (
			this, 
			function ( element )
			   {
				var	text		=  undefined ;

				for  ( var  child  =  element. lastChild ; child ; child  =  child. previousSibling )
				   {
					if  ( child. nodeType  ===  3 )  
					   {
						text		=  $(child) ;
						break ;
					    }
				    }

				return ( text ) ;
			    }
		    ) ;

		return ( $(result) ) ;
	    }


	// textNodes -
	//	Returns all the child text nodes of a dom element.
	$. fn. textNodes	=  function ( )
	   {
		var	result		=  $. map 
		   (
			this, 
			function ( element )
			   {
				var	nodes		=  [] ;

				for  ( var  child  =  element. firstChild ; child ; child  =  child. nextSibling )
					child. nodeType  ===  3  &&  nodes. push ( $(child) ) ;

				return ( nodes ) ;
			    }
		    ) ;

		return ( $(result) ) ;
	    }


	// textAt -
	//	Returns the nth text item in a dom element.
	$. fn. textAt	=  function ( index )
	   {
		var	nodes	=  this. textNodes ( ) ;

		if  ( index  >=  0  &&  index  <  nodes. length )
			return ( $([ nodes [index] ]) ) ;
		else
			return ( undefined ) ;
	    }


	// attr -
	//	Extends the original attr() function to return all attributes for a given jQuery object.
	//	This function is defined as a traditional one (__attr), because nesting such constructs :
	//		( function ( p ) { } ( $. fn. something ) )
	//	within an anonymous function has strange side effects (it makes for example the this.replaceWith() call
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


	// tag -
	//	Returns the name of the tag in lowercase for the specified node.
	$. fn. tag	=  function ( index )
	   {
		if  ( this [0]. tagName )
			return ( this [0]. tagName. toLowerCase ( ) ) ;
		else
			return ( undefined ) ;
	    }


	// killEvent -
	//	I was fed up to check if an event was not undefined, if it contained preventDefault() and stopxxx(),
	//	when all I wanted to do was really preventing the event from propagating anymore.
	$. fn. killEvent	=  
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
