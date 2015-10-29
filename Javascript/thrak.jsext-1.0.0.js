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
	/*-------------------------------------------------------------------------------------------------------------
	 *
	 *	Private utility functions.
	 *
	 *-------------------------------------------------------------------------------------------------------------*/
	function  toInteger ( value )
	   {
		var	intval		=  value ;

		if  ( typeof ( value )  !=  'number' )
			intval	=  parseInt ( value ) ;

		if  ( isNaN ( intval ) )
			throw ( "Invalid integer value " + value ) ;

		return ( value ) ;
	    }


	/*-------------------------------------------------------------------------------------------------------------
	 *
	 *	Object extensions.
	 *
	 *-------------------------------------------------------------------------------------------------------------*/
	 
	Object. defineProperty
	   (
		Object. prototype,
		'getClass',
		{
			enumerable	:  false,
			get		:  function ( )
			   {
				return ( this. constructor. name. toLowerCase ( ) ) ;
			    }
		 }
	    ) ;
	  
	Object. defineProperty
	   (
		Object. prototype,
		'isScalar',
		{
			enumerable	:  false,
			get		:  function ( )
			   {
				switch ( this. class )
				   {
					case	'string' :
					case	'number' :
					case	'boolean' :
						return ( true ) ;

					default :
						return ( false ) ;
				    }
			    }
		 }
	    ) ;
	  
	Object. defineProperty
	   (
		Object. prototype,
		'isObject',
		{
			enumerable	:  false,
			get		:  function ( )
			   {
				switch ( this. class )
				   {
					case	'string' :
					case	'number' :
					case	'boolean' :
						return ( false ) ;

					default :
						return ( true ) ;
				    }
			    }
		 }
	    ) ;



	/*-------------------------------------------------------------------------------------------------------------
	 *
	 *	Array extensions.
	 *
	 *-------------------------------------------------------------------------------------------------------------*/

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

	// Array. createUsing ( initial_value, dimension1 [, dimension2 ... dimension n] ) -
	//	Creates an array with the specified dimensions, using the specified initial value.
	Array. createUsing			=  function ( )
	   {
		function	__do_create ( init_value, array, dimensions )
		   {
			if  ( dimensions. length )
			   {
				for  ( var  i = 0 ; i  <  array. length ; i ++ )
					array [i]	=  __do_create ( new Array ( toInteger ( dimensions [0] ) ), dimensions. slice ( 1 ) ) ;
			    }
			else
			   {
				for  ( var  i = 0 ; i  <  array. length ; i ++ )
					array [i]	=  init_value ;
			    }

			return ( array ) ;
		    }

		if  ( arguments. length  ==  0 )
			return ( [] ) ;
		else if  ( arguments. length  ==  1 )
			return ( [ arguments [0] ] ) ;
		else 
			return ( __do_create ( arguments [0], new Array ( toInteger ( arguments [1] ) ), Array. prototype. slice. call ( arguments, 2 ) ) ) ;
	    }


	// Array. range -
	//	Creates an array containing all values starting from "low" to "high" by "step" (which default to 1).
	Array. range			=  function ( low, high, step )
	   {
		if  ( low  >  high )
			return ( [] ) ;

		step		=  step || 1 ;

		var	result		=  [] ;

		for  ( var  i = low ; i  <=  high ; i += step )
			result. push ( i ) ;

		return ( result ) ;
	    }


	// Array. prototype. sum, product, avg -
	//	Sum/product/average of all the elements in an array.
	Array. prototype. sum		=  function ( )
	   {
		var	result		=  0 ;

		for  ( i = 0 ; i  <  this. length ; i ++ )
			result	+=  this [i] ;

		return ( result ) ;
	    }

	Array. prototype. product		=  function ( )
	   {
		var	result		=  1 ;

		for  ( i = 0 ; i  <  this. length ; i ++ )
			result	*=  this [i] ;

		return ( result ) ;
	    }

	Array. prototype. avg		=  function ( )
	   {
		var	result		=  0 ;

		for  ( i = 0 ; i  <  this. length ; i ++ )
			result	+=  this [i] ;

		return ( result / this. length ) ;
	    }


	/*-------------------------------------------------------------------------------------------------------------
	 *
	 *	Math extensions.
	 *
	 *-------------------------------------------------------------------------------------------------------------*/

	// Math. fact -
	//	The classic factorial function ; since school is over, this is a non-recursive version...
	Math. fact			=  function ( n )
	   {
		if  ( n  <  0 )
			return ( Infinity ) ;

		var	result		=  1 ;

		while  ( n  >  1 )
			result	*=  n -- ;

		return ( result ) ;
	    }

	// Math. comb / perm -
	//	Combinations and permutations.
	Math. comb			=  function  ( n, p )
	   {
	    	var	result 	=  1 ;

		n 		=  Math. abs ( Math. floor ( n ) ) ;
		p 		=  Math. abs ( Math. floor ( p ) ) ;

		if  ( p  >  n )
			return ( 0 ) ;

		var	i	=  n - p + 1 ;

		while  ( i  <  n + 1 )
			result *= i ++ ;

		result /=  Math. fact ( p ) ;

		return ( result ) ;
	    }


	Math. perm			=  function  ( n, p )
	   {
	    	var	result 	=  1 ;

		n 		=  Math. abs ( Math. floor ( n ) ) ;
		p 		=  Math. abs ( Math. floor ( p ) ) ;

		if  ( p  >  n )
			return ( 0 ) ;

		i = n - p + 1 ;

		while  ( i  <  n + 1 )
			result *= i ++ ;

		return ( result ) ;
	    }

    } ) ( ) ;