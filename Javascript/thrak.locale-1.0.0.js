/**************************************************************************************************************

    NAME
        thrak.locale-1.0.0.js

    DESCRIPTION
        Internationalization class.
	
    AUTHOR
        Christian Vigh, 12/2013.

    HISTORY
    [Version : 1.0]    [Date : 2013/12/01]     [Author : CV]
        Initial version.

 **************************************************************************************************************/

 ( function ( $ )
   {
	var	language		=  "default" ;		// Current language
	var	default_options		=			// Default options for new languages
	   {
		language		:  "default",
		variant			:  undefined,
		options			:  {},
		toString		:  function ( )
		   {
			var	s	=  language ;

			if  ( variant )
				s  +=  "-" + variant ;

			return ( s ) ;
		    },
		locale			:  $. locale
	    } ;
	var	locales			=  {} ;			// List of installed locales

	// Set the default locale
	locales [ "default" ]		=  $. extend ( {}, default_options ) ;
	locales [ "default" ]. options	= 
	   {
		datepicker	:
		   {
			altFormat		:  "yy-mm-dd",
			dateFormat		:  "yy-mm-dd",
			buttonText		:  "Choose",
			closeText		:  "Close",
			currentText		:  "Now",
			dayNames		:  [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
			dayNamesMin		:  [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],
			dayNamesShort		:  [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
			monthNames		:  [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
			monthNamesShort		:  [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
			nextText		:  "Next month",
			prevText		:  "Previous month",
			showMonthAfterYear	:  true,
			weekHeader		:  "W",
			yearSuffix		:  ""
		    },
		datetimepicker	:
		   {
			altFormat		:  "yy-mm-dd",
			dateFormat		:  "yy-mm-dd",
			buttonText		:  "Choose",
			closeText		:  "Close",
			currentText		:  "Now",
			dayNames		:  [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
			dayNamesMin		:  [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],
			dayNamesShort		:  [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
			monthNames		:  [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
			monthNamesShort		:  [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
			nextText		:  "Next month",
			prevText		:  "Previous month",
			showMonthAfterYear	:  true,
			weekHeader		:  "W",
			yearSuffix		:  ""
		    },
		timepicker :
		   {
			closeText		:  "Close",
			currentText		:  "Now",
			amNames			:  [ 'AM', 'A' ],
			closeText		:  "Close",
			timeFormat		:  "hh:mm",
			pmNames			:  [ 'PM', 'P' ],
			timeOnlyTitle		:  "Choose hour",
			timeText		:  "Time",
			hourText		:  "Hour",
			minuteText		:  "Minute",
			secondText		:  "Second",
			millisecText		:  "Millisecond",
			microsecText		:  "Microsecond",
			timezoneText		:  "Timezone"
		    },
		masks	:
		   {
			"phone-number"		:  "99 99 99 99 99",
			"zipcode"		:  "999999",
			"date"			:  "99/99/9999"
		     },
		msgbox	:
		   {
			alert			:  
			   {
				title		:  "Message"
			    },
			error			:  
			   {
				title		:  "Error"
			    },
			confirm			:  
			   {
				title		:  "Confirmation"
			    }
		    }
		} ;


	/*==============================================================================================================
	
	    __getLanguage -
	        Returns a language and its variant based on the supplied language string.
		If the language string does not contain a variant (for example, "fr" instead of "fr-FR"), and the set of
		defined locales does not contain such a language with no variant, then the first language with a variant
		will be used.
		The function returns the language string that can be used to index the locales[] array.
	
	  ==============================================================================================================*/
	function  __getLanguage ( language )
	   {
		var	items		=  language. split ( /-/ ) ;
		var	code		=  undefined ;
		var	variant		=  undefined ;

		// Language string does not specify a variant
		if   ( items. length  ===  1 )
			code	=  items [0] ;
		// A variant is specified
		else if  ( items. length  ===  2 )
		   {
			code	=  items [0] ;
			variant	=  items [1] ;
		    }
		// Other case : consider this is a hardware developer failure, simply return the default locale
		else
			return ( "default" ) ;

		// Loop through the locales object
		var	found_language	=  false ;		// Name of existing locale with no variant
		var	found_variant	=  false ;		// Name of existing locale with variant

		for  ( var  locale  in  locales )
		   {
			if  ( locale  ===  code )
				found_language	=  locale ;

			if  (  variant  &&  locale  ===  code + '-' + variant )
				found_variant	=  locale ;
		    }

		// If language + variant has been found, return it
		if  ( found_variant )
			return ( found_variant ) ;

		// But downgrade to language only locale if the specified variant (if any) has not been found
		if  ( found_language )
			return ( found_language ) ;

		// All other cases : return the default locale
		return ( "default" ) ;
	    }


	/*==============================================================================================================
	
	    __defineLocale -
	        Defines a new locale.
	
	  ==============================================================================================================*/
	function  __defineLocale ( language, options )
	   {
		var	items		=  ( language ) ?  language. split ( /-/ ) : [] ;
		var	code		=  undefined ;
		var	variant		=  undefined ;
		var	name		=  "default" ;
		var	locale		=  $. extend ( {}, default_options ) ;


		if  ( code  !==  undefined )
		   {
			if  ( variant  !==  undefined )
				name	=  code + '-' + variant ;
			else
				name  =  code ;
		    }

		locales [ name ]		=  locale ;
		locales [ name ]. options	=  options ;

		return ( locales [ name ] ) ;
	    }


	/*==============================================================================================================
	
	    __getLocale -
	        Returns the current default locale.
	
	  ==============================================================================================================*/
	function  __getLocale ( )
	   {
		return ( locales [ language ] ) ;
	    }


	/*==============================================================================================================
	
	    __setLocale -
	        Sets the default locale to be the specified one (one argument version).
	
	  ==============================================================================================================*/
	function  __setLocale ( language )
	   {
		var	this_language	=  __getLanguage ( language ) ;

		return ( locales [ language ] ) ;
	    }


	/*==============================================================================================================
	 *
	 *   NAME
	 *	$.locale - Gets/sets language options.
	 *
	 *   PROTOTYPE
	 *	$. locale ( ) ;
	 *	$. locale ( language ) ;
	 *	$. locale ( language, language_options ) ;
	 *
	 *   DESCRIPTION
	 *	Gets/sets localization options.
	 *
	 *   PARAMETERS
	 *	language (string) -
	 *		A language string of the form : "name[-variant]", for example "fr", "fr-FR", "en-US", etc.
	 *
	 *	language_options (object) -
	 *		Language options that will be merged with an existing one if any, or created if necessary.
	 *
	 *   RETURN VALUE
	 *	Apart from the forms [5] and [8], which returns a option value, all other call types return a locale
	 *	structure, which has the following member :
	 *
	 *	- language :
	 *		Language code (eg, "en").
	 *
	 *	The object also contains two members functions :
	 *	- toString(), which returns the string representation of the language code (eg, "en-US").
	 *	- locale(), which is an alias to $.locale()
	 *
	 *==============================================================================================================*/
	$. locale	=  function  ( )
	   {
		switch  ( arguments. length )
		   {
			case    1 :
				return (  __setLocale ( arguments [0] ) ) ;

			case	2 : 
				return ( __defineLocale ( arguments [0], arguments [1] ) ) ;

			case	0 :
			default	:
				return  ( __getLocale ( ) ) ;
		    }
	    }
    } ( jQuery ) ) ;