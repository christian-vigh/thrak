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
	. Added the outerHtml() function for JQuery elements.

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
	$. thrak	=  function  ( context )
	    {
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
				else
					throw ( "You must specify a language string and a language options object when calling the thrak() function " +
						"with two arguments." ) ;
				break ;
		    }

		// Set the default locale
		if  ( language )
			$. locale ( language ) ;

		// Make all buttons cancel the default button action
		$('input[type="button"], button, .button:not(a)', context). button ( ). click
		   (
			function  ( e )
			   {
				e  &&  e. preventDefault  &&  e. preventDefault  ( ) ;
				e  &&  e. stopPropagation &&  e. stopPropagation ( ) ;
			    }
		    ) ;

		// Button styling
		$('a.button', context). button ( ) ;
		$('input[type="submit"]', context ). button ( ) ;

		// Tooltips
		$('.tooltip', context). simpletooltip 
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

		datepicker_options	=  $. extend ( {}, datepicker_options, $. locale ( ). options. datepicker ) ;
		$('.date', context). datepicker ( datepicker_options ) ;
		
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
		     
		datetimepicker_options	=  $. extend ( {}, datetimepicker_options, $. locale ( ). options. datetimepicker ) ;
		$('.datetime', context). datetimepicker ( datetimepicker_options ) ;

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

		timepicker_options	=  $. extend ( {}, timepicker_options, $. locale ( ). options. timepicker ) ;
		$('.time', context). timepicker ( timepicker_options ) ;

		// Tristate buttons
		$('.tristate', context). dblclick 
		   (
			function ( )
			   {
				$(this). prop ( "indeterminate", true ) ;
			    }
		    ) ;

		// Repeatable fields
		$('.repeatable'		, context). repeatable ( ) ;

		// Special masks
		$('.phone-number'	, context). mask ( $. locale ( ). options. masks [ "phone-number"	] ) ;
		$('.zipcode'		, context). mask ( $. locale ( ). options. masks [ "zipcode"		] ) ;
		$('.date'		, context). mask ( $. locale ( ). options. masks [ "date"		] ) ;

		// Numeric values
		$(".integer"		, context). numeric ( false ) ;
		$(".numeric"		, context). numeric ( ) ;
		$(".positive-numeric"	, context). numeric ( { negative: false } ) ;
		$(".positive-integer"	, context). numeric ( { decimal: false, negative: false } ) ;

		// Checkboxes - allow associated labels to be clickable
		$('.checkbox'). each
		   (
			function  ( index, obj )
			   {
				var	$this		=  $(obj) ;
				var	$this_label	=  $('label[for="' + $this. attr ( 'id' ) + '"]') ;

				
				if  ( $this_label. length  == 0 )
					return ;

				$this_label
					.css ( 'cursor', 'pointer' )
					.addClass ( 'unselectable' ) ;
			    }
		    ) ;

		// A few additions to JQuery objects...
		$. fn. outerHtml	=  function ( html )
		   { 
			if  ( html  ===  undefined )
				return ( this [0]. outerHTML ) ; 
			else
				this. replaceWith ( html ) ;
		    }
	    }


	/*==============================================================================================================
	 *
	 *   NAME
	 *	debug - Used for activating the debugging tools.
	 *
	 *   PROTOTYPE
	 *	$.debug ( activate ) ;
	 *
	 *   DESCRIPTION
	 *	Activates the debugger, when "activate" is set to true. The debugger script is then loaded and activated.
	 *
	 *   PARAMETERS
	 *	activate (boolean) -
	 *		Indicates whether the debugger should be activated or not.
	 *
	 *   NOTES
	 *	When the debugger has been activated, $.debug is replaced with the real debugger object. Thus, calling
	 *	$. debug ( false ) will call the debugger version of $. debug instead of this one.
	 *
	 *==============================================================================================================*/
	$.debug		=  function ( activate )
	   {
		if  ( activate )
		   {
			$. system. loadScript ( "thrak.debug-1.0.0.js" ) ;
		    }
	    }

    } ( jQuery ) ) ;
