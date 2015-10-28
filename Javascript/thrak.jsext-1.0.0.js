/**************************************************************************************************************

    NAME
        thrak.jsext-1.0.0.js

    DESCRIPTION
        Extensions to the fucked-up javascript core objects.

    AUTHOR
        Christian Vigh, 10/2015.

    HISTORY
    [Version : 1.0]    [Date : 2015/10/27]     [Author : CV]
        Initial version.

 **************************************************************************************************************/


( function ( )
   {
	/*==============================================================================================================
	
	        Private utility functions.
	
	  ==============================================================================================================*/
	function  toInteger ( value )
	   {
		var	intval		=  value ;

		if  ( typeof ( value )  !=  'number' )
			intval	=  parseInt ( value ) ;

		if  ( isNaN ( intval ) )
			throw ( "Invalid integer value " + value ) ;

		return ( value ) ;
	    }

	/*==============================================================================================================

		Array extensions.

	  ==============================================================================================================*/

	// Array. create ( dimension1 [, dimension2 ... dimension n] ) -
	//	Creates an array with the specified dimensions.
	Array. create			=  function ( )
	   {
		function	__do_create ( array, dimensions )
		   {
			if  ( dimensions. length )
			   {
				for  ( var  i = 0 ; i  <  array. length ; i ++ )
					array [i]	=  __do_create ( new Array ( toInteger ( dimensions [0] ) ), dimensions. slice ( 1 ) ) ;
			    }

			return ( array ) ;
		    }

		if  ( arguments. length  ==  0 )
			return ( [] ) ;
		else 
			return ( __do_create ( new Array ( toInteger ( arguments [0] ) ), Array. prototype. slice. call ( arguments, 1 ) ) ) ;
	    }

    } ) ( ) ;