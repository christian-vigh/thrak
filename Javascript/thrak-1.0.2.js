/**************************************************************************************************************

    NAME
        thrak-1.0.0.js

    DESCRIPTION
        Initialization plugin for Thrak objects.
	
    AUTHOR
        Christian Vigh, 12/2013.

    HISTORY
    [Version : 1.0]	[Date : 2013/12/01]     [Author : CV]
        Initial version.

    [Version : 1.0.1]	[Date : 2015/10/14]     [Author : CV]
	. Checkboxes are remapped so that the checkbox text becomes clickable.
	. Added the $.repeatable() initialization
	. Added the outerHtml() and killEvent() functions for JQuery elements.

    [Version : 1.0.2]	[Date : 2016/09/22]     [Author : CV]
	. To avoid runtime errors, checkboxes, radiobuttons, date pickers, numerics, masks, etc. DOM elements 
	   are initialized only if the corresonding object has been defined by including the appropriate js file

 **************************************************************************************************************/

 ( function ( $ )
   {
	/*==============================================================================================================
	 *
	 *   NAME
	 *	thrak - Initializes the thrak package.
	 *
	 *   PROTOTYPE
	 *	[1] $. thrak ( ) ;
	 *	[2] $. thrak ( context ) ;
	 *	[3] $. thrak ( language ) ;
	 *	[4] $. thrak ( language, context ) ;
	 *	[5] $. debug ( activate ) ;
	 *
	 *   DESCRIPTION
	 *	Initializes the thrak package.
	 *	Form [1] initializes the package using the top window as the context, and the document language as the default language.
	 *	Form [2] specifies a context other than 'window', the default.
	 *	Form [3] specifies a language other than the one associated with the page.
	 *	Form [4] specifies both a language and a context object.
	 *	The 5th form does not belong to the thrak namespace but since thrak should be included in every script,
	 *	that was the ideal place to put it. When the "activate" flag is on, debugging tools are activated.
	 *
	 *   PARAMETERS
	 *	context (object) -
	 *		Context object to be used for all jQuery calls.
	 *
	 *	language (string) -
	 *		A country language, with an optional country variant, such as "en-US". The default value comes
	 *		from the englobing page country language definition.
	 *
	 *   DEPENDENCIES
	 *	thrak.system, thrak.debug, thrak.browser.
	 *
	 *==============================================================================================================*/
	$. thrak	=  function  ( )
	    {
		var	context		=  undefined ;
		var	language	=  document. documentElement. lang ;


		// Arguments can be :
		// - None
		// - A string, specifying the language
		// - An object, specifying the context
		// - A string, specifying the language, followed by an object specifying language options
		// - An object specifying the context, then an optional string specifying the language, then an object specifying language options
		switch  ( arguments. length )
		   {
			case	0 :
				break ;

			case	1 :
				if  ( typeof ( arguments [0] )  ==  'string' )
					language	=  arguments [0] ;
				else if  ( typeof ( arguments [0] )  ==  'object' )
					context		=  arguments [0] ;
				else
					throw ( "You must specify either a language string or a context object when calling the thrak() function " +
						"with one argument." ) ;
				break ;

			case	2 :
				if  ( typeof ( arguments [0] )  ==  'string'  &&  typeof ( arguments [1] )  ==  'object' )
				   {
					language	=  arguments [0] ;
					context 	=  arguments [1] ;
				    }
				else if  ( arguments [0]  ==  undefined  &&  typeof ( arguments [1] )  ==  'object' )
				   {
					language	=  $. locale ( ). language ;
					context 	=  arguments [1] ;
				    }
				else
					throw ( "You must specify a language string and a language options object when calling the thrak() function " +
						"with two arguments." ) ;
				break ;
		    }

		// Set the default locale
		if  ( language )
			$. locale ( language ) ;

		// Make all buttons cancel the default button action
		/*
		$('input[type="button"], button, .button:not(a)', context). button ( ). click
		   (
			function  ( e )
			   {
				e  &&  e. preventDefault  &&  e. preventDefault  ( ) ;
				e  &&  e. stopPropagation &&  e. stopPropagation ( ) ;
			    }
		    ) ;
		*/

		// Button styling
		$('a.button', context). button ( ) ;
		$('input[type="submit"]', context ). button ( ) ;

		// Tooltips
		$(document). simpletooltip  &&  $('.tooltip', context). simpletooltip 
		   ({ 
			showEffect	:  "fadeIn", 
			hideEffect	:  "fadeOut", 
			margin		:  60,
			showDelay	:  1.6,
			showCallback	:  function ( target )
			   {
				// Correct the simpletooltip bug that can display another tooltip when one is already visible
				// and covers a part of the other tooltip
				$('.tooltip-contents'). each
				   (
					function  ( ) 
					   {
						var	id	=  $(target). attr ( 'href' ). substr ( 1 ) ;
					   
						if  ( id  !==  $(this). attr ( 'id' ) )
							$(this). css ( 'display', 'none' ) ;
					    }
				    ) ;
			    }
		     }) ;

		// Links that have the "jquery-link" class will never call their href when clicked on ; it is the duty
		// of the page to catch click events on such links
		$('.jquery-link'). click
		   (
			function ( e )
			   {
				$. browser. cancelEvent ( e ) ;
			    }
		    ) ;

		// Datepicker options
		var	datepicker_options	=
		   {
			autoSize	:  true,
			changeMonth	:  true,
			constrainInput	:  true,
			firstDay	:  1,
			showWeek	:  true
		     } ;

		var	extra_datepicker_options	=   ( $. locale  &&  $. locale ( ) ) ?  $. locale ( ). options. datepicker : {} ;

		datepicker_options	=  $. extend ( {}, datepicker_options, extra_datepicker_options ) ;
		$(document). datepicker  &&  $('.date', context). datepicker ( datepicker_options ) ;
		
		// Datetimepicker options
		var	datetimepicker_options	=
		   {
			autoSize	:  true,
			defaultDate	:  'c',
			changeMonth	:  true,
			constrainInput	:  true,
			firstDay	:  1,
			showWeek	:  true
		     } ;
		var	extra_datetimepicker_options	=   ( $. locale  &&  $. locale ( ) ) ?  $. locale ( ). options. datetimepicker : {} ;
		     
		datetimepicker_options	=  $. extend ( {}, datetimepicker_options, extra_datetimepicker_options ) ;
		$(document). datetimepicker  &&  $('.datetime', context). datetimepicker ( datetimepicker_options ) ;

		// Timepicker options
		var	timepicker_options	=
		   {
			autoSize	:  true,
			defaultDate	:  'c',
			changeMonth	:  true,
			constrainInput	:  true,
			firstDay	:  1,
			showWeek	:  true
		     } ;
		var	extra_timepicker_options	=   ( $. locale  &&  $. locale ( ) ) ?  $. locale ( ). options. timepicker : {} ;

		timepicker_options	=  $. extend ( {}, timepicker_options, extra_timepicker_options ) ;
		$(document). timepicker  &&  $('.time', context). timepicker ( timepicker_options ) ;

		// Tristate buttons
		$('.tristate', context). dblclick 
		   (
			function ( )
			   {
				$(this). prop ( "indeterminate", true ) ;
			    }
		    ) ;

		// Repeatable fields
		$(document). repeatable  &&  $('.repeatable', context). repeatable ( ) ;

		// Special masks
		if  ( $(document). mask )
		   {
			$('.phone-number'	, context). mask ( $. locale ( ). options. masks [ "phone-number"	] ) ;
			$('.zipcode'		, context). mask ( $. locale ( ). options. masks [ "zipcode"		] ) ;
			$('.date'		, context). mask ( $. locale ( ). options. masks [ "date"		] ) ;
		    }

		// Numeric values
		if  ( $(document). numeric )
		   {
			$(".integer"		, context). numeric ( false ) ;
			$(".numeric"		, context). numeric ( ) ;
			$(".positive-numeric"	, context). numeric ( { negative: false } ) ;
			$(".positive-integer"	, context). numeric ( { decimal: false, negative: false } ) ;
		    }

		// Checkboxes - allow associated labels to be clickable
		$(document). checkbox  &&  $('.checkbox', context). checkbox ( ) ;

		// Same for radiobuttons
		$(document). radio  &&  $('.radio', context). radio ( ) ;

		// Calculator
		$. calculator &&
			$('.calculator'		, context). calculator ( ) ;

		// Auto-select field contents for numeric values
		$('.integer, .float'	, context). focus
		   (
			function  ( )
			   {
				$(this). select ( ) ;
			    }
		    ) ;

		// Embedded menus
		$(document). menutree  &&  $('.menutree', context). menutree ( ) ;
	    }
    } ( jQuery ) ) ;
