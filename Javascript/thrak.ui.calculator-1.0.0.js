/**************************************************************************************************************

    NAME
        thrak.ui.calculator-1.0.0.js

    DESCRIPTION
        A calculator widget. *** UNDER DEVELOPMENT ***

    AUTHOR
        Christian Vigh, 10/2015.

    HISTORY
    [Version : 1.0]    [Date : 2015/10/26]     [Author : CV]
        Initial version.

 **************************************************************************************************************/


 ( function ( $, script )
   {
	/*-------------------------------------------------------------------------------------------------------------
	 *
	 *  $.calculator -
	 *	Global calculator management. Can be called with the following arguments :
	 *
	 *-------------------------------------------------------------------------------------------------------------*/
	$. calculator	= function ( )
	   {
	    }

	$. calculator. keys	=  
	   {
		ID_DIGIT_0		:   0,
		ID_DIGIT_1		:   1,
		ID_DIGIT_2		:   2,
		ID_DIGIT_3		:   3,
		ID_DIGIT_4		:   4,
		ID_DIGIT_5		:   5,
		ID_DIGIT_6		:   6,
		ID_DIGIT_7		:   7,
		ID_DIGIT_8		:   8,
		ID_DIGIT_9		:   9,
		ID_DIGIT_A		:  10,
		ID_DIGIT_B		:  11,
		ID_DIGIT_C		:  12,
		ID_DIGIT_D		:  13,
		ID_DIGIT_E		:  14,
		ID_DIGIT_F		:  15,
		ID_DOT			:  16
	    } ;

	$. calculator. buttons	=
	   [
		{
			id		:  $. calculator. keys. ID_DIGIT_0,
			key		:  '0',
			label		:  '0',
			virtual		:  false,
			callback	:  accumulate,
			class		:  'digit binary-digit octal-digit decimal-digit hexadecimal-digit'
		 },
		{
			id		:  $. calculator. keys. ID_DIGIT_1,
			key		:  '1',
			label		:  '1',
			virtual		:  false,
			callback	:  accumulate,
			class		:  'digit binary-digit octal-digit decimal-digit hexadecimal-digit'
		 },
		{
			id		:  $. calculator. keys. ID_DIGIT_2,
			key		:  '2',
			label		:  '2',
			virtual		:  false,
			callback	:  accumulate,
			class		:  'digit octal-digit decimal-digit hexadecimal-digit'
		 },
		{
			id		:  $. calculator. keys. ID_DIGIT_3,
			key		:  '3',
			label		:  '3',
			virtual		:  false,
			callback	:  accumulate,
			class		:  'digit octal-digit decimal-digit hexadecimal-digit'
		 },
		{
			id		:  $. calculator. keys. ID_DIGIT_4,
			key		:  '4',
			label		:  '4',
			virtual		:  false,
			callback	:  accumulate,
			class		:  'digit octal-digit decimal-digit hexadecimal-digit'
		 },
		{
			id		:  $. calculator. keys. ID_DIGIT_5,
			key		:  '5',
			label		:  '5',
			virtual		:  false,
			callback	:  accumulate,
			class		:  'digit octal-digit decimal-digit hexadecimal-digit'
		 },
		{
			id		:  $. calculator. keys. ID_DIGIT_6,
			key		:  '6',
			label		:  '6',
			virtual		:  false,
			callback	:  accumulate,
			class		:  'digit octal-digit decimal-digit hexadecimal-digit'
		 },
		{
			id		:  $. calculator. keys. ID_DIGIT_7,
			key		:  '7',
			label		:  '7',
			virtual		:  false,
			callback	:  accumulate,
			class		:  'digit octal-digit decimal-digit hexadecimal-digit'
		 },
		{
			id		:  $. calculator. keys. ID_DIGIT_8,
			key		:  '8',
			label		:  '8',
			virtual		:  false,
			callback	:  accumulate,
			class		:  'digit decimal-digit hexadecimal-digit'
		 },
		{
			id		:  $. calculator. keys. ID_DIGIT_9,
			key		:  '9',
			label		:  '9',
			virtual		:  false,
			callback	:  accumulate,
			class		:  'digit decimal-digit hexadecimal-digit'
		 },
		{
			id		:  $. calculator. keys. ID_DIGIT_A,
			key		:  'a',
			label		:  'a',
			virtual		:  false,
			callback	:  accumulate,
			class		:  'digit hexadecimal-digit'
		 },
		{
			id		:  $. calculator. keys. ID_DIGIT_B,
			key		:  'b',
			label		:  'b',
			virtual		:  false,
			callback	:  accumulate,
			class		:  'digit hexadecimal-digit'
		 },
		{
			id		:  $. calculator. keys. ID_DIGIT_C,
			key		:  'c',
			label		:  'c',
			virtual		:  false,
			callback	:  accumulate,
			class		:  'digit hexadecimal-digit'
		 },
		{
			id		:  $. calculator. keys. ID_DIGIT_D,
			key		:  'd',
			label		:  'd',
			virtual		:  false,
			callback	:  accumulate,
			class		:  'digit hexadecimal-digit'
		 },
		{
			id		:  $. calculator. keys. ID_DIGIT_E,
			key		:  'e',
			label		:  'e',
			virtual		:  false,
			callback	:  accumulate,
			class		:  'digit hexadecimal-digit'
		 },
		{
			id		:  $. calculator. keys. ID_DIGIT_F,
			key		:  'f',
			label		:  'f',
			virtual		:  false,
			callback	:  accumulate,
			class		:  'digit hexadecimal-digit'
		 },
		{
			id		:  $. calculator. keys. ID_DOT,
			key		:  [ '.', ',' ],
			label		:  '.',
			virtual		:  false,
			callback	:  accumulate,
			class		:  'digit hexadecimal-digit'
		 }
	    ] ;

	/*-------------------------------------------------------------------------------------------------------------
	 *
	 *	Widget definition.
	 *
	 *-------------------------------------------------------------------------------------------------------------*/
	$. widget 
	   (
		'thrak.calculator',
		{
			// Widget options
			options		:  
			   {	
				layout		:  'standard'
			    },

			// Internal data
			data		:
			   {
				currentId	:  0,
				icon		:  undefined,
				calculator	:  undefined
			    },

			// _create -
			//	Creates a new instance of the widget. At least minInstances instances of the template will be created.
			_create			:  function ( )
			   {
				var	me		=  this ;
				var	$this		=  me. element ;
				var	$parent		=  $this. parent ( ) ;
				var	this_id		=  $this. attr ( 'id' ) ;

				// Add the calculator icon
				$this
					.addClass ( 'ui-calculator-input' ) 
					.after ( '<div class="ui-calculator-icon"></div>' ) ;

				// Internal data
				me. options. data		=  $. extend ( {}, me. data ) ;
				me. options. data. icon		=  $this. next ( '.ui-calculator-icon' ) ;

				// Icon click handler (opens the calculator)
				me. options. data. icon
					.click
					   (
						function ( e ) 
						   {
							me. open ( ) ;
						    }
					    ) ;
				// Same for F4 keypress in the input field
				$this. keydown
				   (
					function ( e )
					   {
						if  ( e. keyCode  ==  115 )
							me. open ( ) ;
					    }
				    ) ;

				// Create a <div> to hold the calculator
				var	id	=  'calculator-' + ( ++ me. options. data. currentId ) ;

				$('body'). append ( '<div id="' + id + '" class="ui-calculator ui-calculator-hidden ui-calculator-layout-' +
							me. options. layout + '"></div>' ) ;

				me. options. data. calculator		=  $('#' + id). css ( 'position', 'absolute' ) ;

				// Add the "calculator-id" to input field and calculator button
				$this. attr ( 'calculator-id', id ) ;
				me. options. data. icon. attr ( 'calculator-id', id ) ;

				// Set current layout
				this. layout ( me. options. layout ) ;
			    },

			// _destroy -
			//	Remove elements created by this instance.
			_destroy			:  function ( )
			   {
				var	me	=  this. element ;

				me. options. data. calculator. remove ( ) ;
			    },
			
			// _position -
			//	Positions the calculator relatively to its input field.
			_position			:  function ( )
			   {
				var	me		=  this. element ;
				var	$this		=  this. options. data. calculator ;
				var	position	=  me. offset ( ) ;
				
				position. top	+=  me [0]. offsetHeight ;
				$this. css ( { top : position. top + 'px', left : position. left + 'px' } ) ;
			    },

			// _set_visible -
			//	Displays/hides the calculator.
			_set_visible			:  function ( show )
			   {
				var	$this		=  this. options. data. calculator ;

				if  ( show )
					$this. removeClass ( 'ui-calculator-hidden' ). addClass ( 'ui-calculator-visible' ) ;
				else
					$this. removeClass ( 'ui-calculator-visible' ). addClass ( 'ui-calculator-hidden' ) ;
			    },

			// _calculator_events -
			//	Install calculator event handlers.
			_calculator_events		:  function ( $this )
			   {
				var	me	=  this ;

				// document. mousedown -
				//	Hide the calculator if the user clicked outside.
				$(document)
					.mousedown
					   ( 
						function  ( e ) 
						   {
							var	$target		=  $(e. target) ;

							if  ( ! $target. hasClass ( 'ui-calculator' )  &&
							      $target. parents ( '.ui-calculator' ). length  ==  0 )
							   {
								me. _set_visible ( false ) ;
							    }
						    }
					    ) ;
			    },

			// layout -
			//	Sets/retrieves the current layout.
			layout			:  function ( name )
			   {
				var	me	=  this ;

				if  ( name  ===  undefined )
					name	=  me. options. layout ;

				if  ( me. options. data. layout  ===  undefined )
				   {
					if  ( ! name  in  layouts )
					   {
						callback ( { name : name, html : function ( ) { return ( '*** UNDEFINED CALCULATOR LAYOUT ' + name + ' ***' ) ; } } ) ;
						return ;
					    }

					if  ( layouts [ name ]. html  ===  undefined )
					   {
						var	layout	=  layouts [ name ] ;

						layout. name	=  name ;
			
						if  ( layout. url  ===  undefined )
							layout. url	=  script. dirname + '/' + layouts_url + '/' + name + '.html' ;

						$. ajax
						   ({
							url		:  layout. url,
							async		:  true,
							dataType	:  'html',
							success		:  function ( data ) 
							   {
								layout. html	=  function ( )
								   {
									return  ( data ) ;
								    }

								new_layout ( me, layout ) ;
							    }
						     }) ;
					    }
				    }
			     },


			// open -
			//	Opens the calculator
			open			:  function ( )
			   {
				var	$this	=  this. options. data. calculator ;

				this. _position ( ) ; 
				$this. removeClass ( 'ui-calculator-hidden' ). addClass ( 'ui-calculator-visible' ) ;
			    }
		  }
	    ) ;


	/*-------------------------------------------------------------------------------------------------------------
	 *
	 *	Layout management.
	 *
	 *-------------------------------------------------------------------------------------------------------------*/

	var	layouts_url	=  'calculator.layouts' ;
	var	layouts		=
	   {
		'standard'		:
		   {
		    }
	    } ;


	function  new_layout ( me, layout ) 
	   {
		// Insert html code for the current layout
		me. options. data. layout	=  $. extend ( {}, layout ) ;
		me. options. data. calculator. html ( layout. html ( ) ) ;

		// Install calculator event handlers
		me. _calculator_events ( me. options. data. calculator ) ;

		// 

		// Buttonify the contents
		var	$buttons		=  $('.button', me. options. data. calculator). button ( ). removeClass ( 'button' ) ;

		// Get the default outer width and height of a button
		var	$example_button		=  $buttons. first ( ) ;
		var	button_real_height	=  $example_button. outerHeight ( ),
			button_real_width	=  $example_button. outerWidth ( ),
			button_height		=  $example_button. height ( ),
			button_width		=  $example_button. width ( ),
			height_delta		=  button_real_width - button_width,
			width_delta		=  button_real_height - button_height ;
					
		// Set cell widths for table cells having a colspan
		$('[colspan]:not([colspan=""])', me. options. data. calculator). each 
		   (
			function ( )
			   {
				var	$this		=  $(this) ;
				var	width		=  $this. width ( ) ;
				var	colspan		=  parseInt ( $this. attr ( 'colspan' ) ) ;
				var	new_width	=  ( button_width + width_delta ) * colspan ;


				$this. css ( 'width', new_width + 'px' ) ;

				$('.ui-button[colspan]:not([colspan=""])', $this). each
				   (
					function ( )
					   {
						var	$this_button	=  $(this) ;

						$this_button. css ( 'width', new_width + 'px' ) ;
					    }
				    ) ;
			    }
		    ) ;

		// Same for rowspan and table cell height
		$('[rowspan]:not([rowspan=""])', me. options. data. calculator). each 
		   (
			function ( )
			   {
				var	$this		=  $(this) ;
				var	height		=  $this. height ( ) ;
				var	rowspan		=  parseInt ( $this. attr ( 'rowspan' ) ) ;
				var	new_height	=  ( button_height + height_delta ) * rowspan ;


				$this. css ( 'height', new_height + 'px' ) ;

				$('.ui-button[rowspan]:not([rowspan=""])', $this). each
				   (
					function ( )
					   {
						var	$this_button	=  $(this) ;

						$this_button. css ( 'height', new_height + 'px' ) ;
					    }
				    ) ;
			    }
		    ) ;
	    } ;


	/*-------------------------------------------------------------------------------------------------------------
	 *
	 *	Calculator functions.
	 *
	 *-------------------------------------------------------------------------------------------------------------*/
	function  accumulate ( )
	   {
	    }

    } ( jQuery, $. script ( ) ) ) ;

