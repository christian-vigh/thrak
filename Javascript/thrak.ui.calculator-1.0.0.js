/**************************************************************************************************************

    NAME
        thrak.ui.calculator-1.0.0.js

    DESCRIPTION
        A calculator widget.

    AUTHOR
        Christian Vigh, 10/2015.

    HISTORY
    [Version : 1.0]    [Date : 2015/10/26]     [Author : CV]
        Initial version.

 **************************************************************************************************************/


 ( function ( $ )
   {
	/*-------------------------------------------------------------------------------------------------------------
	 *
	 *  $.calculator -
	 *	Global calculator management. Can be called with the following arguments :
	 *
	 *	$. calculator ( 'layout' ) -
	 *		Returns the default layout.
	 *
	 *	$. calculator ( 'layout', name ) -
	 *		Returns the structure of the layout specified by 'name'.
	 *	
	 *	$. calculator ( 'layout', name, options ) -
	 *		Defines a new layout. Returns the layout definition (which will be more complete than the
	 *		supplied options).
	 *
	 *	It also contains the following members :
	 *	. keys -
	 *		Key identifiers.
	 *
	 *	. buttons -
	 *		Button definitions 
	 *
	 *-------------------------------------------------------------------------------------------------------------*/
	$. calculator	= function ( )
	   {
		var	argc	=  arguments. length ;


		if  ( ! argc )
			return ( undefined ) ;

		switch  ( arguments [0]. toLowerCase ( ) )
		   {
			case	'layout' :
			   {
				var	name	=  'standard' ;
				var	obj	=  undefined ;

				switch  ( argc )
				   {
					case	2 :
						name	=  arguments [1] ;
						break ;

					case	3 :
					default :
						name	=  arguments [1] ;
						obj	=  arguments [2] ;
				    }

				if  ( obj  !==  undefined )
					__set_layout ( name, obj ) ;

				return ( __get_layout ( name ) ) ;
			    }
		    }
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
		ID_DIGIT_F		:  15
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

				// Install calculator event handlers
				this. _calculator_events ( me. options. data. calculator ) ;

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
					return ( me. options. layout ) ;

				var	layout	=  $. calculator ( 'layout', name ) ;

				me. options. data. calculator. html ( layout. html ( ) ) ;

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
				$('[colspan]:not([colspan=""])'). each 
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
				$('[rowspan]:not([rowspan=""])'). each 
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

	var	layouts		=
	   {
		'standard'		:
		   {
			initialized		:  false,
			definitions		:  
			   {
				cols			:  5,
				rows			:  7,
				template		:
					'									\
						<line>	\
							<lcd width="5">						\
						</line>	\
						<group width="3" class="numeric-keypad">			\
							<line>						\
								<button name="digit_7"/>			\
								<button name="digit_8"/>			\
								<button name="digit_9"/>			\
							</line>						\
							<line>						\
								<button name="digit_4"/>			\
								<button name="digit_5"/>			\
								<button name="digit_6"/>			\
							</line>						\
							<line>						\
								<button name="digit_1"/>			\
								<button name="digit_2"/>			\
								<button name="digit_3"/>			\
							</line>						\
							<line>						\
								<button name="digit_0" width="2"/>		\
							</line>						\
						</group>							\
					'
			    }
		    }
	    } ;


	function  __get_layout ( name )
	   {
		if  ( name  in  layouts )
		   {
			if  ( ! layouts [ name ]. initialized )
				__initialize_layout ( name ) ;

			return  ( layouts [ name ]. definitions ) ;
		    }
		else 
			return ( undefined ) ;
	    }


	function  __set_layout ( name, options )
	   {
	    }


	function  __generate_layout ( layout, $template )
	   {
		var	layout_array	=  Array. create ( layout. definitions. rows, layout. definitions. cols ) ;
		var	html		=  '<table class="ui-calculator-content" cellpadding="0" cellspacing="0">' ;
	    }


	function  __initialize_layout ( name ) 
	   {
		var	layout		=  layouts [ name ] ;
		var	template	=  layout. definitions. template ;

		//layout. html		=  __generate_layout ( layout, template ) ;

		layout. definitions. html	=  function ( )
		   {
			html	=  '<table class="ui-calculator-content" cellpadding="0" cellspacing="0">' +
				   '	<tr>' +
				   '		<td colspan="5">' +
				   '			<div class="lcd">lcd</div>' +
				   '		</td>' +
				   '	</tr>' +
				   '	<tr>' +
				   '		<td colspan="3" rowspan="4">' +
				   '			<table class="group numeric-keypad" cellpadding="0" cellspacing="0">' +
				   '				<tr>' +
				   '					<td><div class="button" id="digit_7">Z7</div></td>' +
				   '					<td><div class="button" id="digit_8">Z8</div></td>' +
				   '					<td><div class="button" id="digit_9">Z9</div></td>' +
				   '				</tr> ' +
				   '				<tr>' +
				   '					<td><div class="button" id="digit_4">Z4</div></td>' +
				   '					<td><div class="button" id="digit_5">Z5</div></td>' +
				   '					<td><div class="button" id="digit_6">Z6</div></td>' +
				   '				</tr> ' +
				   '				<tr>' +
				   '					<td><div class="button" id="digit_1">Z1</div></td>' +
				   '					<td><div class="button" id="digit_2">Z2</div></td>' +
				   '					<td><div class="button" id="digit_3">Z3</div></td>' +
				   '				</tr> ' +
				   '				<tr>' +
				   '					<td colspan="2"><div class="button" id="digit_0" colspan="2">Z0</div></td>' +
				   '					<td class="empty">0e</td>' +
				   '				</tr> ' +
				   '			</table>' + 
				   '		</td>' +
				   '		<td class="empty">e11</td>' +
				   '		<td class="empty">e12</td>' +
				   '	</tr>' + 
				   '	<tr>' +
				   '		<td class="empty button-width-1 button-height-1">e21</td>' +
				   '		<td class="empty button-width-1 button-height-1">e22</td>' +
				   '	</tr>' +
				   '	<tr>' +
				   '		<td class="empty button-width-1 button-height-1">e31</td>' +
				   '		<td class="empty button-width-1 button-height-1">e32</td>' +
				   '	</tr>' +
				   '	<tr>' +
				   '		<td class="empty button-width-1 button-height-1">e41</td>' +
				   '		<td class="empty button-width-1 button-height-1">e42</td>' +
				   '	</tr>' +
				   '</table>' ;

			return ( html ) ;

		    }
	    }


	/*-------------------------------------------------------------------------------------------------------------
	 *
	 *	Calculator functions.
	 *
	 *-------------------------------------------------------------------------------------------------------------*/
	function  accumulate ( )
	   {
	    }

    } ( jQuery ) ) ;

