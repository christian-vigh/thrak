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

 ( function ( $ )
   {
	/*-------------------------------------------------------------------------------------------------------------
	 *
	 *  Globals.
	 *
	 *-------------------------------------------------------------------------------------------------------------*/
	var	constants	= 
	   {
		classes		:  
		   {
			fieldLabel		:  "form-field-label",
			fieldValue		:  "form-field-value",
			requiredField		:  "form-required-field",
			errorFieldValue		:  "form-error-field-value",
			errorFieldLabel		:  "form-error-field-label",
			uploadFile		:  "form-field-upload-file"
		    },
		attributes	:
		   {
			fieldType		:  "field-type",
			fieldFormat		:  "field-format",
			fieldLabel		:  "label",
			fieldId			:  "field-id",
			formId			:  "form-id",
			fieldValidatedValue	:  "field-validated-value"
		    },
		messages	:
		   {
			'fr'	:
			    {
				missingFields		:  "Les champs suivants sont obligatoires :<br/>",
				errorFields		:  "Les champs suivants poss&egrave;dent une valeur incorrecte<br/>"
			     },
			'en'	:
			   {
				missingFields		:  "The following fields are mandatory :<br/>",
				errorFields		:  "The following fields have an incorrect value :<br/>"
			    }
		    }
	    } ;

	var	default_form_options	=
	   {
		method			:  'get',
		ajax			:  
		   {
			async			:  true,
			dataType		:  "text"
		    }
	    } ;



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

		dialog_options. formOptions	=  $. extend ( default_form_options, dialog_options. formOptions ) ;

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


		// Normalize attributes (correct values, add them if not specified, etc.)
		normalize_attributes ( $form ) ;

		// Add field handlers
		install_field_handlers ( $form ) ;

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

				if  ( status  ===  true )
					return ( true ) ;
				else
				   {
					$. error 
					   ( 
						status,
						function ( )
						   {
							$('.' + constants. classes. errorFieldValue ). first ( ). focus ( ). select ( ) ;
						    }
						    
					    ) ;

					return ( false ) ;
				    }
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
		var		status ;

		// First, check for mandatory values
		status		=  validate_mandatory_values ( form ) ;

		if  ( status  !==  true )
			return ( status ) ;

		// Then check typed field values
		status		=  validate_typed_values ( form ) ;

		if (  status  !==  true )
			return ( status ) ;

		return ( true ) ;
	    }


	// validate_mandatory_value -
	//	Validates a mandatory value. Sets the visual effects depending on whether it is missing or not.
	function  validate_mandatory_value ( $this, value )
	   {
		if  ( ! $this. hasClass ( constants. classes. requiredField ) )
			return ( true ) ;

		var	format		=  $this. attr ( constants. attributes. fieldFormat ) ;

		// Empty values may take different forms, depending on the field type
		switch ( format )
		   {
			default		: 
				if  ( value  ==  '' )
				   {
					set_field_error_state ( $this, true ) ;
					return ( false ) ;
				    }
				else
				   {
					set_field_error_state ( $this, false ) ;
					return ( true ) ;
				    }
		    }
	    }


	// validate_mandatory_values -
	//	Validates all the mandatory values in the form.
	//	Returns true if everything is ok, or an error message string otherwise.
	function  validate_mandatory_values ( form )
	   {
		var	error_fields	=  [] ;

		$('.' + constants. classes. requiredField, form). filter ( filter_field ). each
		   (
			function  ( index, obj )
			   {
				var	$this		=  $(obj) ;

				if  ( ! validate_mandatory_value ( $this, $this. val ( ) ) )
					error_fields. push ( $this ) ;
			    }
		    ) ;

		if  ( error_fields. length )
		   {
			var	message		=  constants. messages [ $. locale ( ) ]. missingFields + "<ul>" ;

			for  ( i = 0 ; i  <  error_fields. length ; i ++ )
				message		+=  "<li>" + error_fields [i]. attr ( constants. attributes. fieldLabel ) + "</li>" ;

			message		+=  "</ul>" ;

			return ( message ) ;
		    }
		else
			return ( true ) ;
	    }


	// validate_typed_value -
	//	Validates a field value according to its type and adds a "validated-value" attribute with the
	//	(potentially) reformatted value.
	function  validate_typed_value ( $this, value, ui_reflect )
	   {
		var	format			=  $this. attr ( constants. attributes. fieldFormat ) ;
		var	type			=  $this. attr ( constants. attributes. fieldType ) ;
		var	validated_value		=  value ;
		var	status			=  true ;

		switch ( type )
		   {
			case	'select' :
				validated_value		=  $this. val ( ) ;
				break ;
		    }

		$this. attr ( constants. attributes. fieldValidatedValue, validated_value ) ;

		if  ( ui_reflect )
			set_field_error_state ( $this, ( status  !==  true ) ) ;

		return ( status ) ;
	    }


	// validate_typed_values -
	//	Validates all the values of the form according to their type.
	//	Returns true if everything is ok, or an error message string otherwise.
	function  validate_typed_values ( form )
	   {
		var	error_fields	=  [] ;

		$('.' + constants. classes. fieldValue, form). filter ( filter_field ). each
		   (
			function  ( index, obj )
			   {
				var	$this		=  $(obj) ;
				var	status		=  validate_typed_value ( $this, $this. val ( ), false ) ;

				if  ( status  !==  true )
					error_fields. push ( [ $this, status ] ) ;
			    }
		    ) ;

		if  ( error_fields. length )
		   {
			var	message		=  constants. messages [ $. locale ( ) ]. errorFields + "<ul>" ;

			for  ( i = 0 ; i  <  error_fields. length ; i ++ )
				message		+=  "<li><b>" + error_fields [i] [0]. attr ( constants. attributes. fieldLabel ) + 
						    "</b> : " + error_fields [i] [1] +
						    "</li>" ;

			message		+=  "</ul>" ;

			return ( message ) ;
		    }
		else
			return ( true ) ;
	    }


	/*-------------------------------------------------------------------------------------------------------------
	 *
	 *  Helper functions.
	 *
	 *-------------------------------------------------------------------------------------------------------------*/
	
	// collect_field_values -
	//	Collects the field values.
	function  collect_field_values ( form )
	   {
		var	values		=  { __uploads__ : [] } ;

		$('.' + constants. classes. fieldValue). filter ( filter_field ). each
		   (
			function ( index, obj )
			   {
				var	$this		=  $(obj);
				var	id		=  $this. attr ( constants. attributes. fieldId ) ;
				var	type		=  $this. attr ( constants. attributes. fieldType ) ;
				var	value ;

				switch  ( type )
				   {
					case	'checkbox' :
						value	=  ( $this. is ( ':checked' ) ) ?  "1" : "0" ;
						break ;

					case	'file' :
						values. __uploads__. push ( $this ) ;
						return ;

					default :
						value	=  $this. attr ( constants. attributes. fieldValidatedValue ) ;
				    }

				values [id]	=  value ;
			    }
		    ) ;

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


	// get_field_format -
	//	Returns the format of a field specified with its "field-format" attribute.
	//	Missing field format attributes or having an incorrect value will default to "string".
	function  get_field_format ( $this )
	   {
		var	format		=  $this. attr ( constants. attributes. fieldFormat ) ;

		if  ( format  ===  ''  ||  format  ===  undefined )
			format	=  'string' ;
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
					var	$this	=  $(this) ;

					validate_mandatory_value ( $this, $this. val ( ) + String. fromCharCode ( e. keyCode ||  e. which ) ) ;
					validate_typed_value     ( $this, $this. val ( ) + String. fromCharCode ( e. keyCode ||  e. which ) ) ;
				    }
			    )
			. blur 
			   (
				function  ( e )
				   {
					var	$this	=  $(this) ;

					validate_mandatory_value ( $this, $this. val ( ) ) ;
					validate_typed_value     ( $this, $this. val ( ) ) ;
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
				$this. attr ( constants. attributes. fieldFormat, get_field_format ( $this ) ) ;

				// The the "field-type" attribute
				$this. attr ( constants. attributes. fieldType, get_field_type ( $this ) ) ;

				// Provide a default value for the "field-id" attribute, equal to its id
				if  ( $this. attr ( constants. attributes. fieldId )  ===  undefined )
					$this. attr ( constants. attributes. fieldId, $this. attr ( 'id' ) ) ;

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
			    }
		    ) ;

		// Remove any stuff that may have been set by a previous validation error
		$('.' + constants. classes. errorField ). removeClass ( constants. classes. errorField ) ;
	    }


	// set_field_error_state -
	//	Sets the visual appearance of a field depending on whether its value is correct or not.
	function  set_field_error_state ( $this, state ) 
	   {
		if  ( state )
		   {
			var		label	=  get_associated_label ( $this ) ;

			$this. addClass ( constants. classes. errorFieldValue ) ;
			label. addClass ( constants. classes. errorFieldLabel ) ;

			return ( false ) ;
		    }
		else
		   {
			var		label	=  get_associated_label ( $this ) ;

			$this. removeClass ( constants. classes. errorFieldValue ) ;
			label. removeClass ( constants. classes. errorFieldLabel ) ;

			return ( true ) ;
		    }
	    }


	// wrapform -
	//	Wraps a <form> construct around a form template.
	function  wrapform ( form_id, form_options )
	   {
		var	has_files	=  $('[type="file"]'). filter ( filter_field ). length  >  0 ;
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
		transform_form ( form, form_options ) ;
		form. submit ( ) ;
	    }


	function  send_ajax_form ( $this, form_options )
	   {
	    }
    } ( jQuery ) ) ;

