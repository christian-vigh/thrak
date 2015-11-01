/**************************************************************************************************************

    NAME
        thrak.form-1.0.0.js

    DESCRIPTION
        Forms management.

	position, delayPosition, removeOnClose

    AUTHOR
        Christian Vigh, 10/2015.

    HISTORY
    [Version : 1.0]    [Date : 2015/10/08]     [Author : CV]
        Initial version.

 **************************************************************************************************************/

//# include_once ( "sprintf.js" )
//# include_once ( "intval.js" )
//# include_once ( "floatval.js" )
//# include_once ( "is_numeric.js" )


( function ( $ )
   {
	/*-------------------------------------------------------------------------------------------------------------
	 *
	 *  Globals.
	 *
	 *-------------------------------------------------------------------------------------------------------------*/

	// Constant strings
	var	constants	= 
	   {
		classes		:		// Class names
		   {
			fieldLabel		:  "form-field-label",
			fieldValue		:  "form-field-value",
			requiredField		:  "form-required-field",
			errorFieldValue		:  "form-error-field-value",
			errorFieldLabel		:  "form-error-field-label",
			uploadFile		:  "form-field-upload-file",
			errorFieldMessage	:  "form-error-field-message",
			fieldWrapper		:  "form-field-wrapper",
			requiredFieldTag	:  "form-required-tag"
		    },
		attributes	:		// Specific attribute names
		   {
			fieldType		:  "field-type",
			fieldFormat		:  "field-format",
			fieldLabel		:  "label",
			fieldId			:  "field-id",
			fieldName		:  "field-name",
			fieldDefaultValue	:  "field-default-value",
			formId			:  "form-id",
			fieldValidatedValue	:  "field-validated-value",
			fieldDatepickerIcon	:  "field-datepicker-icon",
			fieldRealtimeValidation	:  "field-realtime-validation",
			fieldMinLength		:  "field-min-length",
			fieldMaxLength		:  "field-max-length",
			fieldMinValue		:  "field-min-value",
			fieldMaxValue		:  "field-max-value"
		    }
	    } ;

	// Default form options that can be overridden by the caller (formOptions field of the dialog options)
	var	default_form_options	=
	   {
		// buttonPaneMessage (optional) -
		//	Can be used to define a message to appear in the button pane ; for example :
		//	buttonPaneMessage	:  '<div class="form-mandatory-field-hint">' + data. mandatory_hint + '</div>'
		buttonPaneMessage	:  false,
		// alertOnError (optional) -
		//	Indicates whether an alert box should be displayed when errors have been encountered during form validation.
		//	Default is false.
		alertOnError		:  true,
		// url (required) -
		//	The url to which form submission results are posted.
		url			:  false,
		// method (optional) :
		//	The method used to submit the form. Can be either "get" or "post". The default is "get".
		method			:  'get',
		// ajax (optional) -
		//	Any data to provide to the $.ajax() call.
		ajax			:  
		   {
			async			:  true,
			dataType		:  "text"
		    },
		// data (optional) -
		//	Form fields are sent through an ajax request using the 'data' member ; this one can be used to specify additional options
		//	before form submission. For example :
		/***
			data			:
			   {
				operation	:  'sendmail'
			    }
		 ***/
		// realtimeValidation (optional) -
		//	When true, the syntax of input fields is checked while the user types characters.
		//	This can be overriden by the "field-realtime-validation" attribute.
		//	The default is false.
		realtimeValidation	:  false,
		// Input field validators, associated to the field-format attribute.
		// Any field format can be defined in the supplied form, provided that the caller supplied the
		// appropriate validator in this object.
		// A field value validator is supplied the following parameters :
		// - form :
		//	The form (dialog) object.
		// - options :
		//	Dialog options (including the formOptions field).
		// - field :
		//	The JQuery object referencing the current field.
		// - result : 
		//	An object containing the following members :
		//	- value :
		//		Contents of the input field.
		//	- status :
		//		A boolean value that must be set by the validator to indicate whether the value is correct or not.
		//	- message :
		//		When status is set to false, message must be set to an error message.
		//		The set_error() internal function can be used for that.
		validators		:  
		   {
			// string validator -
			//	Checks the following attributes :
			//	- field-min-length, field-max-length
			'string'	:  function  ( form, options, field, result )
			   {
				check_field_length ( form, options, field, result ) ;

				if  ( result. status  ===  false )
					return ;
			    },

			// email validator -
			//	Checks that the supplied input is a valid email.
			'email'		:  function  ( form, options, field, result )
			   {
				if  ( ! /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
						. test ( result. value ) )
				   {
					set_error ( options, result, 'invalidEmail' ) ;
				    }
			    },

			// Date validator -
			//	Dates are always converted to the mysql format (yyyy-mm-dd).
			'date'		:  function  ( form, options, field, result )
			   {
				var	date	=  field. datepicker ( 'getDate' ) ;

				if  ( date  ===  null  ||  date  ===  undefined )
					result. value	=  '0000-00-00' ;
				else
					result. value	=  date. getFullYear ( ) + '-' +
							   ( date. getMonth ( ) + 1 ) + '-' + 
							   date. getDate ( ) ;
			    },

			// Integer validator
			//	Ensures that the integer is correct and falls within the optional range specified with
			//	the field-min-value and field-max-value attributes.
			'integer'	:  function  ( form, options, field, result )
			   {
				check_field_numeric_value ( form, options, field, result, true ) ;
			    },

			// Float validator
			//	Ensures that the integer is correct and falls within the optional range specified with
			//	the field-min-value and field-max-value attributes.
			'float'	:  function  ( form, options, field, result )
			   {
				check_field_numeric_value ( form, options, field, result, true ) ;
			    }
		    },
		// Localized messages
		messages	:		
		   {
			'fr'	:
			    {
				formErrors		:  "Des erreurs ont &eacute;t&eacute; rencontr&eacute;es dans les valeurs que vous avez saisies.",
				mandatoryField		:  "Ce champ est obligatoire.",
				invalidEmail		:  "Adresse email invalide.",
				valueTooShort		:  "La valeur saisie doit faire au moins %d caract&egrave;res.",
				valueTooLong		:  "La valeur saisie doit faire au plus  %d caract&egrave;res.",
				invalidValueLength	:  "La valeur saisie doit faire entre %d et %d caract&egrave;res.",
				valueTooLow		:  "Le nombre %s saisi doit &ecirc;tre sup&eacute;rieur ou &eacute;gal &agrave; %g.",
				valueTooHigh		:  "Le nombre %s saisi doit &ecirc;tre inf&eacute;rieur ou &eacute;gal &agrave; %g.",
				valueOutOfRange		:  "Le nombre %s saisi doit &ecirc;tre compris entre %g et %g.",
				integerValueType	:  "entier",
				floatValueType		:  "r&eacute;el"
			     },
			'en'	:
			   {
				formErrors		:  "Errors have been found in your input data.",
				mandatoryField		:  "This field is mandatory.",
				invalidEmail		:  "Invalid email address.",
				valueTooShort		:  "Input value must be at least %d characters long.",
				valueTooLong		:  "Input value must be at most %d characters long.",
				invalidValueLength	:  "Input value must have between %d and %d characters.",
				valueTooLow		:  "Input %s value must be greater than or equal to %g.",
				valueTooHigh		:  "Input %s value must be less than or equal to %g.",
				valueOutOfRange		:  "Input %s value must be between %g and %g.",
				integerValueType	:  "integer",
				floatValueType		:  "float"
			    }
		    }
	    } ;
	
	var	this_form ;


	/*-------------------------------------------------------------------------------------------------------------
	 *
	 *  A JQuery member to create dialog forms.
	 *
	 *-------------------------------------------------------------------------------------------------------------*/
	$. form	=  function ( /* id, [ template, ] dialog_options */ )
	   {
		// Get arguments, in whichever order was specified
		// These must be : string (dialog id), string (dialog template), object (dialog options)
		var	id, template, 
			dialog_options		=  {} ;

		for  ( var  i  =  0 ; i  <  arguments. length ; i ++ )
		   {
			var	arg		=  arguments [i] ;
			var	argtype		=  typeof ( arg ) ;

			if  ( argtype  ==  'string' )
			   {
				if  ( id )
				   {
					if  ( ! template )
						template	=  arg ;
				    }
				else
					id	=  arg ;
			    }
			else if  ( argtype  ==  'object' )
				dialog_options	=  $. extend ( dialog_options, arg ) ;
		    }

		dialog_options. formOptions	=  $. extend ( default_form_options, dialog_options. formOptions, { id : id } ) ;

		// Default value for template
		if  ( template  ===  undefined )
			template	=  '<div><span style="color: #FF0000">*** NO FORM TEMPLATE SPECIFIED FOR #' + id + '</div>' ;

		// Default position is the center of the screen - make sure that it will be recomputed after calling the
		// open() method, which can add its own contents to the dialog box
		if  ( dialog_options. position  ===  undefined  ||  dialog_options. position. toLowerCase ( )  ==  'center' )
			dialog_options. position	=  { my : "center", at : "center", of : window }  ;

		// Default value for "delayPosition" is true
		if  ( dialog_options. delayPosition  ===  undefined )
			dialog_options. delayPosition	=  true ;

		// Default value for "removeOnClose" is true
		if  ( dialog_options. removeOnClose  ===  undefined )
			dialog_options. removeOnClose	=  true ;

		// Append the dialog template
		var	$body		=  $('body') ;
		var	selector	=  '#' + id ;
		var	$form		=  $(selector) ;
		var	$element	=  wrapform ( id, dialog_options. formOptions ) + template + '</form>' ;

		if  ( $form. length  ==  0 )
			$body. append ( $element ) ;
		else 
			$form. replaceWith ( $element ) ;

		// Add dialog id to the newly inserted template
		$form		=  $(selector) ;
		$form. attr ( constants. attributes. formId, id ) ;		// Save dialog id since it's replaced by JQuery

		this_form	=  $form ;

		// Normalize attributes (correct values, add them if not specified, etc.)
		normalize_attributes ( $form ) ;

		// Add field handlers
		install_field_handlers ( $form ) ;

		// Wrap every input field with a div
		$('.' + constants. classes. fieldValue, $form). each
		   (
			function ( )
			   {
				var	$this		=  $(this) ;
				var	this_id		=  $this. attr ( 'id' ) ;
				var	$parent		=  $this. parent ( ) ;

				// Wrap the field
				$this. wrap ( '<div class="' + constants. classes. fieldWrapper + '" field-wrapper-id="' +
						this_id + '"></div>' ) ;

				// Get a reference to the wrapper <div>
				var	$wrapper	=  $('[field-wrapper-id="' + this_id + '"]') ;

				// Append a <div> for a poentential error message
				$parent. append ( '<div class="' + constants. classes. errorFieldMessage + '"></div>' ) ;

				// Add the form-required-tag class for mandatory values if not specified with the field value or its associated label
				if  ( $this. hasClass ( constants. classes. requiredField )  &&  ! $this. hasClass ( constants. classes. requiredFieldTag ) )
				   {
					var	label	=  get_associated_label ( $this ) ;

					if  ( ! label. hasClass ( constants. classes. requiredFieldTag ) )
						$wrapper. addClass ( constants. classes. requiredFieldTag ) ;
				    }
			    }
		    ) ;

		// Initialize the JQuery dialog
		$form. dialog ( dialog_options ) ;

		// All done, return a reference to the dialog object
		return ( $form ) ;
	    }


	/*-------------------------------------------------------------------------------------------------------------
	 *
	 *  Extend the dialog widget class.
	 *
	 *-------------------------------------------------------------------------------------------------------------*/
	$. widget 
	   (
		'thrak.dialog',
		$. ui. dialog,
		{
			// open -
			//	Opens the dialog and makes sure it is correctly repositioned if the delayPosition
			//	option was specified (for dialog boxes whose contents are dynamically loaded)
			open		:  function ( )
			   {
				this. _super ( ) ;

				if  ( this. element. dialog ( 'option', 'delayPosition' ) ) 
					this. element. dialog ( 'widget' ). position ( this. element. dialog ( 'option', 'position' ) ) ;

				// Insert the optional buttonPaneMessage but be careful : this open() function is called twice
				// (but the open() function of the dialog box is only called once)
				var	form_options	=  this. element. dialog ( 'option', 'formOptions' ) ;

				if  ( form_options  &&  form_options. buttonPaneMessage )
				   {
					var	extra		=  $('.ui-dialog-buttonpane .ui-dialog-buttonpane-extra') ;

					if  ( extra. length  ==  0 )
					   {
						var	button_pane	=  $('.ui-dialog-buttonpane') ;
					
						button_pane. append
						   ( 
							'<div class="ui-dialog-buttonpane-extra-wrapper">' +
								'<div class="ui-dialog-buttonpane-extra">' + form_options. buttonPaneMessage +  '</div>' + 
							'</div>' 
						    ) ;
					    }
				    }
			    },

			// close - 
			//	Closes the dialog and removes it from the DOM if the "removeOnClose" option was specified.
			close		:  function ( )
			   {
				this. _super ( ) ;

				if  ( this. element. dialog ( 'option', 'removeOnClose' ) )
					this. element. remove ( ) ;
			    },
			// validate -
			//	Performs form validation. Returns true if everything is ok
			validate	:  function ( )
			   {
				var	status		=  validate ( this. element ) ;

				return ( status ) ;
			    },
			// submit -
			//	Submits the form.
			submit		:  function ( )
			   {
				var	$this		=  this. element ;
				var	form_options	=  $this. dialog ( 'option', 'formOptions' ) ;
			

				// Get input fields
				form_options. data	=  $. extend ( form_options. data, collect_field_values ( $this ) ) ;

				// Form will be submitted normally
				if (  form_options. method  ===  "post"  ||  form_options. method  ===  "get" )
					send_regular_form ( $this, form_options ) ;
				// Form will be submitted using ajax
				else if (  form_options. method  ==  "ajax-post"  ||  form_options. method  ==  "ajax-get" )
				   {
					form_options. ajax. method	=  ( form_options. method  ==  "ajax-get" ) ?  "get" : "post" ;
					form_options. ajax. data	=  form_options. data ;

					send_ajax_form ( $this, form_options ) ;
				    }
				// Default is "get"
				else
				   {
					form_options. method	=  "get" ;

					send_regular_form ( $this, form_options ) ;
				    }

			    }
		 }
	    ) ;


	/*-------------------------------------------------------------------------------------------------------------
	 *
	 *  Validation functions.
	 *
	 *-------------------------------------------------------------------------------------------------------------*/

	// validate -
	//	Validates the whole form contents.
	function  validate ( form ) 
	   {
		var		status	=  validate_values ( form ) ;
		var		options	=  form. dialog ( 'option' ) ;

		if  ( status  ===  false )
		   {
			var	first_error	=  $('.' + constants. classes. errorFieldValue). first ( ) ;

			if  ( options. formOptions. alertOnError )
			   {
				$. error 
				   ( 
					options. formOptions. messages [ $. locale ( ) ]. formErrors,
					function ( )
					   {
						first_error. focus ( ) ;
					    }
				    ) ;
			    }
			else
				first_error. focus ( ) ;
		    }

		return ( status ) ;
	    }


	// validate_value -
	//	Validates a field value according to its type and adds a "validated-value" attribute with the
	//	(potentially) reformatted value.
	function  validate_value ( $this, value )
	   {
		var	options			=  this_form. dialog ( 'option' ) ;
		var	validators		=  options. formOptions. validators ;
		var	format			=  $this. attr ( constants. attributes. fieldFormat ). toLowerCase ( ) ;
		var	type			=  $this. attr ( constants. attributes. fieldType ). toLowerCase ( ) ;

		// Result object passed to field validators
		var	result			=  
		   {
			value		:  value,
			status		:  true,
			message		:  undefined
		    }

		// Empty value : complain if the field is mandatory
		if  ( value  ==  '' )
		   {
			if  ( $this. hasClass ( constants. classes. requiredField ) )
				set_error ( options, result, 'mandatoryField' ) ;
		    }
		
		// Field is either non-empty or non-mandatory - process its value using its corresponding validator
		if  ( result. status )
		   {
			switch ( type )
			   {
				case	'text'	:
					if  ( validators [ format ]  !==  undefined )
						validators [ format ] ( this_form, options, $this, result ) ;
					else
						throw ( "Parameter format \"" + format + "\" not yet handled." ) ; 

					break ;

				case	'select' :
					result. value		=  $this. val ( ) ;
					break ;
			    }
		    }

		// Save the validated value, which can be different from user input
		$this. attr ( constants. attributes. fieldValidatedValue, result. value ) ;

		// Provide a visual clue if an error occurred
		set_field_error_state ( $this, ! result. status, result. message ) ;

		return ( result. status ) ;
	    }


	// validate_values -
	//	Validates all the values of the form according to their type.
	//	Returns true if everything is ok, or an error message string otherwise.
	function  validate_values ( form )
	   {
		var	options		=  form. dialog ( 'option' ) ;
		var	error_fields	=  [] ;

		$('.' + constants. classes. fieldValue, form). filter ( filter_field ). each
		   (
			function  ( index, obj )
			   {
				var	$this		=  $(obj) ;
				var	status		=  validate_value ( $this, $this. val ( ) ) ;

				if  ( status  !==  true )
					error_fields. push ( [ $this, status ] ) ;
			    }
		    ) ;

		return ( error_fields. length  ==  0 ) ;
	    }


	/*-------------------------------------------------------------------------------------------------------------
	 *
	 *  Helper functions.
	 *
	 *-------------------------------------------------------------------------------------------------------------*/

	// check_field_length -
	//	Checks that the field value length is between the values specified by the field-min-length and 
	//	field-max-length attributes.
	function  check_field_length ( form, options, field, result )
	   {
		var	min_length	=  get_integer_attribute ( field, constants. attributes. fieldMinLength ),
			max_length	=  get_integer_attribute ( field, constants. attributes. fieldMaxLength ) ;
		var	length		=  result. value. length ;


		if  ( min_length  !==  undefined )
		   {
			if  ( max_length  ===  undefined )
			   {
				if  ( length  <  min_length )
					set_error ( options, result, 'valueTooShort', min_length ) ;
			    }
			else
			   {
				if  ( length  <  min_length  ||  length  >  max_length )
					set_error ( options, result, 'invalidValueLength', min_length, max_length ) ;
			    }
		    }
		else if  ( max_length  !==  undefined )
		   {
			if  ( length  > max_length )
				set_error ( options, result, 'valueTooLong', max_length ) ;
		    }  
	    }


	// check_field_numeric_value -
	//	Checks that the field value is between the values specified by the field-min-value and 
	//	field-max-value attributes.
	function  check_field_numeric_value ( form, options, field, result, is_integer )
	   {
		var	min_value	=  get_numeric_attribute ( field, constants. attributes. fieldMinValue ),
			max_value	=  get_numeric_attribute ( field, constants. attributes. fieldMaxValue ) ;
		var	default_value	=  get_numeric_attribute ( field, constants. attributes. fieldDefaultValue, '' ) ;
		var	typename	=  options. formOptions. messages [ $. locale ( ) ] [ ( is_integer ) ?  'integerValueType' : 'floatValueType' ] ;
		var	value ;


		if  ( result. value  ==  '' )
		   {
			if  ( default_value  ==  '' )	// Optional values with no default are authorized
				return ;

			result. value	=  default_value ;
		    }

		value	=  floatval ( result. value ) ;

		if  ( min_value  !==  undefined )
		   {
			if  ( is_integer ) 
				min_value	=  Math. floor ( min_value ) ;

			if  ( max_value  ===  undefined )
			   {
				if  ( value  <  min_value )
					set_error ( options, result, 'valueTooLow', typename, min_value ) ;
			    }
			else
			   {
				if  ( is_integer ) 
					max_value	=  Math. floor ( max_value ) ;

				if  ( value  <  min_value  ||  value  >  max_value )
					set_error ( options, result, 'valueOutOfRange', typename, min_value, max_value ) ;
			    }
		    }
		else if  ( max_value  !==  undefined )
		   {
			if  ( is_integer ) 
				max_value	=  Math. floor ( max_value ) ;

			if  ( value  > max_value )
				set_error ( options, result, 'valueTooHigh', typename, max_value ) ;
		    }  
	    }
	    
	    	
	// collect_field_values -
	//	Collects the field values.
	function  collect_field_values ( form )
	   {
		var	values		=  { __uploads__ : [] } ;
		var	radiobuttons	=  {} ;

		$('.' + constants. classes. fieldValue, form). filter ( filter_field ). each
		   (
			function ( index, obj )
			   {
				var	$this		=  $(obj);
				var	name		=  $this. attr ( constants. attributes. fieldName ) ;
				var	type		=  $this. attr ( constants. attributes. fieldType ) ;
				var	value ;

				switch  ( type )
				   {
					// Checkboxes : will give either 0 (unchecked) or 1 (checked)
					case	'checkbox' :
						value	=  ( $this. is ( ':checked' ) ) ?  "1" : "0" ;
						break ;

					// Radio buttons : collect the names of the various radio buttons defined in the form
					// We will post-process them outside of the $.each loop
					case	'radio' :
						if  ( name  !==  undefined  &&  radiobuttons [ name ]  ===  undefined )
							radiobuttons [ name ]		=  name ;

						return ;

					// Files : put them into a separate member
					case	'file' :
						values. __uploads__. push ( $this ) ;
						return ;

					// Other cases : simply post the value as is
					default :
						value	=  $this. attr ( constants. attributes. fieldValidatedValue ) ;
				    }

				values [ name ]		=  value ;
			    }
		    ) ;

		// Now retrieve the value of each option checked in radiobutton groups defined in this form
		// If no option is checked within a group, the group value will be an empty string
		for  ( var  name  in  radiobuttons )
		   {
			var	$button		=  $('[name="' + name + '"][type="radio"]:checked', form) ;
			var	value		=  ( $button. length  ==  0 ) ?  '' : $button. val ( ) ;

			alert ( "radiobutton value = " + value ) ;
			values [ name ]		=  value ;
		    }


		// All done, return
		return ( values ) ;
	    }


	// filter_field :
	//	Used to retain only fields that do not have the visibility=hidden or display=none css attributes.
	function  filter_field ( index, obj )
	   {
		var	$this	=  $(obj) ;

		return  ( $this. css ( 'visibility' ). toLowerCase ( )  !=  'hidden'  &&
			  $this. css ( 'display'    ). toLowerCase ( )  !=  'none' ) ;
	    }


	// get_boolean_attribute -
	//	Retrieves a boolean attribute value.
	//	A boolean attribute value can contain :
	//	- "false", "no", "off" or "0" for the boolean value false
	//	- Any other non-empty string for the boolean value true
	//	If the attribute is not specified, then the value of the default_value parameter will be returned.
	function  get_boolean_attribute ( $this, attr, default_value ) 
	   {
		var	value		=  $this. attr ( attr ) ;

		if  ( value  ===  ''  ||  value  ===  undefined )
			return ( default_value ) ;

		value	=  value. trim ( ). toLowerCase ( ) ;

		if  ( value  ==  'false'  ||  value  ==  'no'  ||  value  ==  'off'  ||  value  ==  '0' )
			return ( false ) ;
		else
			return ( true ) ;
	    }


	// get_integer_attribute -
	//	Returns the value of an integer attribute, or undefined if the attribute does not contain a valid value.
	function  get_integer_attribute ( $this, attr, default_value )
	   {
		var	value		=  $this. attr ( attr ) ;

		if  ( value  ===  ''  ||  value  ===  undefined )
			return ( default_value ) ;

		value	=  value. trim ( ). toLowerCase ( ) ;

		if  ( is_numeric ( value ) )
			return ( intval ( value ) ) ;
		else
			return ( default_value ) ;
	    }


	// get_numeric_attribute -
	//	Returns the value of a numeric attribute, or undefined if the attribute does not contain a valid value.
	function  get_numeric_attribute ( $this, attr, default_value )
	   {
		var	value		=  $this. attr ( attr ) ;

		if  ( value  ===  ''  ||  value  ===  undefined )
			return ( default_value ) ;

		value	=  value. trim ( ). toLowerCase ( ) ;

		if  ( is_numeric ( value ) )
			return ( floatval ( value ) ) ;
		else
			return ( default_value ) ;
	    }


	// get_field_format -
	//	Returns the format of a field specified with its "field-format" attribute.
	//	Missing field format attributes or having an incorrect value will default to "string".
	function  get_field_format ( $this )
	   {
		var	format		=  $this. attr ( constants. attributes. fieldFormat ) ;

		if  ( format  ===  ''  ||  format  ===  undefined )
		   {
			if  ( $this. hasClass ( 'date' ) )
				format	=  'date' ;
			else
				format	=  'string' ;
		    }
		else
			format	=  format. toLowerCase ( ) ;

		switch  ( format )
		   {
			// Format aliases
			case	'int'		:  format	=  'integer'	; break ;
			
			case	'real'		:
			case	'double'	:  format	=  'float'	; break ;

			// Regular formats
			case	'string'	:
			case	'email'		:
			case	'integer'	:
			case	'float'		:
			case	'date'		:
			case	'datetime'	: 
			case	'time'		:
				break ;

			// Other values will yield "string"
			default	:
				format	=  'string' ;
		    }

		return ( format ) ;
	    }

	// get_field_type -
	//	Tries to unify various form elements (<input>, <input type="radio">, <select>, <textarea>)
	//	and give them a "field-type" attribute with one of the following values :
	//	- "text" :
	//		Any <input> field that accepts text, or <textarea>. For simple <input> fields, this
	//		relates to those having the "type=" attribute set to "text" or "password", or undefined.
	//	- "radio" :
	//		Any <input type="radio"> field.
	//	- "checkbox" :
	//		Any <input type="checkbox"> field.
	//	- "file" :
	//		Any <input type="file"> field.
	//	- "select" :
	//		Any <select> field.
	//	- "ignored" :
	//		Applies to any other kind of form input element, including buttons which do not generate
	//		any value upon form submission.
	//		Note that submit buttons belong to this category, since form submission is handled by the
	//		form class.
	function  get_field_type ( $this ) 
	   {
		var	tag		=  $this. prop ( 'tagName' ). toLowerCase ( ) ;
		var	input_type ;
		var	field_type ;

		switch  ( tag )
		   {
			case	'select' :
				field_type	=  'select' ;
				break ;

			case	'textarea' :
				field_type	=  "text" ;
				break ;

			case	'input' :
				input_type	=  $this. attr ( 'type' ) ;

				switch  ( input_type )
				   {
					case	undefined :
					case	'text' :
					case	'password' :
						field_type	=  'text' ;
						break ;

					case	'radio' :
						field_type	=  'radio' ;
						break ;

					case	'checkbox' :
						field_type	=  'checkbox' ;
						break ;

					case	'file' :
						field_type	=  'file' ;
						break ;

					default :
						field_type	=  'ignored' ;
				    }

				break ;

			default :
				field_type	=  'ignored' ;
		    }

		return ( field_type ) ;
	    }


	// get_associated_label -
	//	Gets the label associated with the specified field.
	function  get_associated_label ( obj )
	   {
		var	selector	=  'label[for="' + obj. attr ( 'id' ) + '"]' ;

		return ( $(selector) ) ;
	    }


	// has_realtime_validation -
	//	Returns true if either the global form option 'realtimeValidation' is true or if the 'realtime-validation' attribute
	//	of the specified field exists and is different from the empty string, 0 or false
	function  has_realtime_validation ( $this )
	   {
		var	options			=  this_form. dialog ( 'option', 'formOptions' ) ;
		var	realtime		=  get_boolean_attribute ( $this, constants. attributes. fieldRealtimeValidation, options. realtimeValidation ) ;

		return ( realtime ) ;
	    }


	// install_field_handlers -
	//	Install field handlers that will mainly :
	//	- Add or remove the visual class that signals if a mandatory value is missing or not
	//	- Validate field contents on blur
	//	- etc.
	function  install_field_handlers ( form )
	   {
		$('.' + constants. classes. fieldValue )
			.keypress
			   (
				function  ( e )
				   {
					var	$this		=  $(this) ;

					if  ( has_realtime_validation ( $this ) )
						validate_value ( $this, $this. val ( ) + String. fromCharCode ( e. keyCode ||  e. which ) ) ;
				    }
			    )
			.keyup
			   (
				function  ( e )
				   {
					var	$this		=  $(this) ;

					if  ( has_realtime_validation ( $this ) )
					   {
						var	isBackspaceOrDelete	=  ( event. keyCode  ==  8  ||  event. keyCode  ==  46 ) ;

						if  ( isBackspaceOrDelete )
							validate_value ( $this, $this. val ( ) ) ;
					    }
				    }
			    )
			.blur 
			   (
				function  ( e )
				   {
					var	$this	=  $(this) ;

					// Avoid unnecessary validation if the button definition contains a "cancel" attribute
					// set to a non-false value
					if  ( ! get_boolean_attribute ( $(e. relatedTarget), 'cancel', false ) )
						validate_value ( $this, $this. val ( ) ) ;

					return ( true ) ;
				    }
			    ) ;
	    }


	// normalize_attributes -
	//	Normalize attribute values for fields.
	function  normalize_attributes ( form )
	   {
		$( '.' + constants. classes. fieldValue ). each
		   (
			function  ( index, obj )
			   {
				var	$this	=  $(obj) ;

				// Normalize the "field-format" attribute
				var	format		=  get_field_format ( $this ) ;

				$this. attr ( constants. attributes. fieldFormat, format ) ;

				// The the "field-type" attribute
				$this. attr ( constants. attributes. fieldType, get_field_type ( $this ) ) ;

				// Provide a default value for the "field-id" attribute, equal to its id
				if  ( $this. attr ( constants. attributes. fieldId )  ===  undefined )
					$this. attr ( constants. attributes. fieldId, $this. attr ( 'id' ) ) ;

				// Same for field name
				if  ( $this. attr ( constants. attributes. fieldName )  ===  undefined )
				    {
					var	name	=  $this. attr ( 'name' ) ;

					if  ( name  ===  undefined )
						$this. attr ( constants. attributes. fieldName, $this. attr ( 'id' ) ) ;
					else
						$this. attr ( constants. attributes. fieldName, name ) ;
				     }

				// Provide a default value for the "field-label" attribute
				if  ( $this. attr ( constants. attributes. fieldLabel )  ===  undefined )
				   {
					var	associated_label	=  get_associated_label ( $this ) ;

					if  ( associated_label. length  ==  1 )
						$this. attr ( constants. attributes. fieldLabel, 
								associated_label. html ( ). replace ( /\s*:\s*$/, '' ) ) ;
					else
						$this. attr ( constants. attributes. fieldLabel, "<span style='color: #FF0000'>*** MISSING LABEL ***</span>" ) ;
				    }

				// Special field formats
				switch ( format )
				   {
					// 'date' format :
					//	Add a datepicker icon, unless the 'field-datepicker-icon' is set to false
					case	'date' :
						var	has_picker		=  get_boolean_attribute ( $this, constants. attributes. fieldDatepickerIcon, true ) ;

						if  ( has_picker )
						   {
							$this. after ( '<div class="ui-datepicker-icon"></div>' ) ;
							$this. next ( '.ui-datepicker-icon' ). click
							   (
								function  ( e ) 
								   {
									$this. datepicker ( 'show' ) ;
								    }
							    ) ;
						    }

						break ;

					// 'integer' format :
					//	If the "size" attribute has not been specified, and there is a min or max value, automatically
					//	adjust the field width.
					case	'integer' :
						if  ( $this [0]. style. width  ==  '' )
						   {
							var	size_attr	=  $this. attr ( 'size' ) ;

							if  ( size_attr  ===  ''  ||  size_attr  ===  undefined )
							   {
								var	max_value	=  get_integer_attribute ( $this, constants. attributes. fieldMaxValue ) ;
								var	max		=  Number. MAX_SAFE_INTEGER ;

								if  ( max_value  !==  undefined )
									max	=  max_value ;

								max	=  Math. floor ( Math. log10 ( max ) ) + 1 ;
								
								$this. css ( 'width', ( max / 1.7 ) + 'em' ) ;
							    }
						    }

						break ;
				    }
			    }
		    ) ;

		// Remove any stuff that may have been set by a previous validation error
		$('.' + constants. classes. errorField ). removeClass ( constants. classes. errorField ) ;
	    }


	// set_error -
	//	For validators only. Sets the "status" field of th specified object to false, and the "message" field
	//	to the localized constant provided by "errconst".
	function  set_error ( options, result, errconst )
	   {
		var	message		=  options. formOptions. messages [ $. locale ( ) ] [ errconst ] ;
		var	argv		=  [ message ]. concat ( Array. prototype. slice. call ( arguments, 3 ) ) ;
		 
		result. status	=  false ;
		result. message	=  sprintf. apply ( null, argv ) ;
	    }


	// set_field_error_state -
	//	Sets the visual appearance of a field depending on whether its value is correct or not.
	function  set_field_error_state ( $this, state, msg ) 
	   {
		var		$parent		=  $this. parent ( ). parent ( ) ;

		if  ( state )
		   {
			var		label		=  get_associated_label ( $this ) ;

			$this. addClass ( constants. classes. errorFieldValue ) ;
			label. addClass ( constants. classes. errorFieldLabel ) ;
			$('.' + constants. classes. errorFieldMessage, $parent)
				.addClass ( 'visible' )
				.html ( msg ) ;

			return ( false ) ;
		    }
		else
		   {
			var		label	=  get_associated_label ( $this ) ;

			$this. removeClass ( constants. classes. errorFieldValue ) ;
			label. removeClass ( constants. classes. errorFieldLabel ) ;
			$('.' + constants. classes. errorFieldMessage, $parent)
				.removeClass ( 'visible' )
				.html ( '' ) ;

			return ( true ) ;
		    }
	    }


	// wrapform -
	//	Wraps a <form> construct around a form template.
	function  wrapform ( form_id, form_options )
	   {
		var	has_files	=  $('[type="file"]'). length  >  0 ;
		var	encoding	=  ( has_files ) ?  '' : 'enctype="multipart/form-data"' ;
		var	form_html	=  '<form id="' + form_id + '" method="' + form_options. method + '" ' + encoding + ' ' + 
					   'action="' + form_options. url + '"' ;

		if  ( form_options. attributes )
		   {
			for  ( var  name  in  form_options. attributes )
				form_html	+=  name + '"' + form_options. attributes [ name ] + '"' ;
		    }

		form_html	+=  ">" ;

		return ( form_html ) ;
	    }



	/*-------------------------------------------------------------------------------------------------------------
	 *
	 *  Form submitting functions.
	 *
	 *-------------------------------------------------------------------------------------------------------------*/

	// transform_form -
	//	Remove regular input fields (except type="file" ones) and replace them with <input type="text"> fields,
	//	using the validated value
	function  transform_form ( form, form_options )
	   {
		var	form_html	=  '' ;

		for  ( var  name  in  form_options. data )
		   {
			var	value	=  form_options. data [ name ] ;

			if  ( name  !=  '__uploads__' )
				form_html	+=  "\n\t" + 
							'<input name="' + name + '" type="text" value="' + value + '"/>' ;
		    }

		$( 'input[type!="file"], select, textarea', form ). remove ( ) ;
		form. append ( form_html ) ;
	    }


	function  send_regular_form ( form, form_options ) 
	   {
		form_options. beforeSubmit && form_options. beforeSubmit ( ) ;
		transform_form ( form, form_options ) ;
		form. submit ( ) ;
	    }


	function  send_ajax_form ( form, form_options )
	   {
		form_options. beforeSubmit && form_options. beforeSubmit ( ) ;
		transform_form ( form, form_options ) ;

		var	form_data	=  new FormData ( $('#' + form_options. id) [0] ) ;
		var	request_data	= 
		   {
			url		:  form_options. url,
			cache		:  false,
			contentType	:  false,
			processData	:  false
		    } ;
		var	ajax_data	=  $. extend ( request_data, form_options. ajax, { data : form_data } ) ;

		$. ajax ( ajax_data ) ;
	    }
    } ( jQuery ) ) ;

/*
   $.ajax({
        url: 'upload.php',  //Server script to process data
        type: 'POST',
        xhr: function() {  // Custom XMLHttpRequest
            var myXhr = $.ajaxSettings.xhr();
            if(myXhr.upload){ // Check if upload property exists
                myXhr.upload.addEventListener('progress',progressHandlingFunction, false); // For handling the progress of the upload
            }
            return myXhr;
        },
        //Ajax events
        beforeSend: beforeSendHandler,
        success: completeHandler,
        error: errorHandler,
        // Form data
        data: formData,
        //Options to tell jQuery not to process data or worry about content-type.
        cache: false,
        contentType: false,
        processData: false
*/