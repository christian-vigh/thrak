/**************************************************************************************************************

    NAME
        thrak.ui.msgbox-1.1.1.js

    USAGE
	$. alert    ( msg, title, callback, options ) ;
	$. error    ( msg, title, callback, options ) ;
	$. confirm  ( msg, title, callback, options ) ;
	$. msgbox   ( msg, title, callback, flags, options ) ;
	$. inputbox ( msg, title, callback, 

    DESCRIPTION
	Implements $.alert(), $.confirm() and $.error() with a little more customization than the available
	Javascript equivalents. Note that the arguments can be specified in any order ; the only constraint
	is that the window title must be the second string of the argument list, after the message to display.
	
    PARAMETERS
	msg (string) -
		Message to be displayed.

	title (string) -
		Title to be dsplayed. If none specifying, the current locale title is chosen, then the default
		title.

	calback (function) -
		Function called when the user will validate the message box.

	flags (integer) -
		A combination of MB_xxx flags.

	options (object) -
		Additional jQuery ui dialog options.
				
    AUTHOR
        Christian Vigh, 12/2013.

    HISTORY
    [Version : 1.0]	[Date : 2013/12/05]     [Author : CV]
        Initial version.

    [Version : 1.1]	[Date : 2015/10/04]     [Author : CV]
	. Corrected the __show_alert() function which removed any buttons in the dialog box if object settings 
	  were specified through the alert/confirm/error functions.

    [Version : 1.1.1]	[Date : 2015/10/09]     [Author : CV]
	. Originally, the functions from msgbox implemented a close() function to remove the dialog definition
	  from the DOM. This approach however does not work when multiple dialogs are stacked : calling 
	  dialog ( 'close' ) will bubble and call the close() function of each underlying stacked dialog before
	  the close() method of the current one.
	  To prevent this, the __close_me() function has been added, which in turn calls the 'destroy' method
	  (instead of 'close').
	. Support has been added for the Escape and Enter keys.

    [Version : 1.2.0]	[Date : 2015/10/21]     [Author : CV]
	. Added the msgbox() and inputbox() functions.

 **************************************************************************************************************/

( function ( $, me )
   {
	// To allow stacking of several message boxes, a dialog div with a unique id will be created and appended to the end
	// of document body. This variable is incremented each time a new message box has to be created.
	var	unique_id	=  1 ;
	
	
	// alert function -
	//	Displays a message with a single Ok button. If a callback is specified, it will be called with a single 'status'
	//	parameter which will always be set to 1.
	//	The default title for alert() is : "Message".
	$. alert	=  function  ( msg, title, callback, options )
	   {
		__show_alert ( "alert", arguments ) ;
	    }

	// error function -
	//	Same as alert() with a few color differences.
	//	The default title for error() is : "Erreur".
	$. error	=  function  ( msg, title, callback, options )
	   {
		__show_alert ( "error", arguments ) ;
	    }


	// confirm function -
	//	Displays a confirmation message with an Ok and Cancel button. If a callback function is specified, its "status"
	//	parameter will be set to 1 if the Ok button was clicked, and to 0 if it was the Cancel button.
	//	The default title for confirm() is : "Confirmation".
	$. confirm	=  function  ( msg, title, callback, options )
	  {
		__show_alert ( "confirm", arguments ) ;
	   }

	// msgbox function -
	//	For Windows programmers...
	$. msgbox	=  function  ( msg, title, flags, callback, options )
	   {
		__show_alert ( "msgbox", arguments ) ;
	    }


	/***  MB_xxx constants  ***/
	// Button choice constants :
	$. msgbox. MB_OK			=  0x00000000 ;		// Message box contains a Ok button
	$. msgbox. MB_OKCANCEL			=  0x00000001 ;		// Message box contains two buttons : Ok and Cancel
	$. msgbox. MB_ABORTRETRYIGNORE		=  0x00000002 ;		// Message box contains three push buttons: Abort, Retry, and Ignore
	$. msgbox. MB_YESNOCANCEL		=  0x00000003 ;		// Message box contains three push buttons: Yes, No, and Cancel
	$. msgbox. MB_YESNO			=  0x00000004 ;		// Message box contains two push buttons: Yes and No
	$. msgbox. MB_RETRYCANCEL		=  0x00000005 ;		// Message box contains two push buttons: Retry and Cancel
	$. msgbox. MB_CANCELTRYCONTINUE		=  0x00000006 ;		// Message box contains three push buttons: Cancel, Try Again, Continue

	var	BUTTON_MASK			=  0x0000000F ;
	var	BUTTON_SHIFT			=  0 ;

	// Icon display options :
	$. msgbox. MB_ICONEXCLAMATION		=  0x00000080 ;		// Does not strictly follow Windows constants
	$. msgbox. MB_ICONWARNING		=  0x00000070 ;
	$. msgbox. MB_ICONINFORMATION		=  0x00000060 ;
	$. msgbox. MB_ICONASTERISK		=  0x00000050 ;
	$. msgbox. MB_ICONQUESTION		=  0x00000040 ;
	$. msgbox. MB_ICONSTOP			=  0x00000030 ; 
	$. msgbox. MB_ICONERROR			=  0x00000020 ; 
	$. msgbox. MB_ICONHAND			=  0x00000010 ;
	
	var	ICON_MASK			=  0x000000F0 ; 
	var	ICON_SHIFT			=  4 ;
 
	// Default button flags :
	$. msgbox. MB_DEFBUTTON1		=  0x00000000 ;
	$. msgbox. MB_DEFBUTTON2		=  0x00000100 ;
	$. msgbox. MB_DEFBUTTON3		=  0x00000200 ;
	$. msgbox. MB_DEFBUTTON4		=  0x00000300 ;

	var	DEFBUTTON_MASK			=  0x00000F00 ;
	var	DEFBUTTON_SHIFT			=  8 ;

	// Button ids returned to the callback function :
	$. msgbox. IDABORT			=  3 ;
	$. msgbox. IDCANCEL			=  2 ; 
	$. msgbox. IDCONTINUE			=  11 ;
	$. msgbox. IDIGNORE			=  5 ; 
	$. msgbox. IDNO				=  7 ;
	$. msgbox. IDOK				=  1 ;
	$. msgbox. IDRETRY			=  4 ;
	$. msgbox. IDTRYAGAIN			=  10 ;
	$. msgbox. IDYES			=  6 ; 
	  
	// What to display if the caller forgot to specify a message ???
	var	message			=  "<span style='color: #FF0000'>The developer forgot to specify a message for this alert...</span>" ;

	// Default dialog titles and labels
	var	default_labels		=
	   {
		boxTitles		:
		  {
			alert			:  "Message", 
			error			:  "Error",
			confirm			:  "Confirmation",
			msgbox			:  "Message",
			inputbox		:  "Input value"
		   },  
		buttonLabels		:
		   {
			'ok'			:  "Ok",
			'cancel'		:  "Cancel",
			'abort'			:  "Abort",
			'retry'			:  "Retry",
			'ignore'		:  "Ignore",
			'continue'		:  "Continue",
			'try'			:  "Try again",
			'help'			:  "Help",
			'yes'			:  "Yes",
			'no'			:  "No"
		    }
	    } ;

	// Default dialog options. Make sure of what you're doing if you want to override the open() and close() functions !
	var	default_options		=
	   { 
		modal		:  true,
		width		:  "auto",
		closeOnEscape	:  true,
		height		:  "auto",
		maxWidth	:  "800px",
		resizable	:  false,
		stack		:  true,
		open		:  function ( )
		   {
			var	$this		=  $(this) ;
			var	defbutton	=  $this. dialog ( 'option', 'defaultButton' ) ;

			if  ( defbutton  !=  undefined )
				$('.ui-dialog-buttonpane button:eq(' + defbutton + ')', $this. parent ()). focus ( ) ;
		    }
	     } ;

	// __close_me -
	//	Ensures the current message box is destroyed after calling the optional user callback.
	//	Calls the 'destroy' method insted of 'close', since the latter does not prevent event bubbling :
	//	This means that if you have multiple stacked dialogs, the close() method of each dialog will be
	//	called...
	function  __close_me ( $this, user_callback, status )
	   {
		// Call the callback if one specified, providing the return value of the message box (ok, cancel, etc...).
		// For the $.alert() and $.error functions, this parameter will always be set to 1.
		user_callback  &&  user_callback ( status, $this ) ;
		console.log($this);
				
		// Since we're closing, we can remove our definition from the body of the document
		$this. dialog ( 'destroy' ) ;
		$this. remove ( ) ;
	    }
	     
	// __show_alert -
	//	Main entry point for displaying message boxes.
	function  __show_alert ( boxtype, args ) 
	    {
		boxtype	=  boxtype. toLowerCase ( ) ;
		
		// Get labels from the current locale (if any)
		var	labels		=  default_labels ;

		if  ( $. locale )
			labels		=  $. extend ( labels, $. locale ( ). options. msgbox ) ;

		// Dialog options
		var	dialog_options	=  $. extend ( default_options, { title : labels. boxTitles [ boxtype ] } ) ;
		// User callback
		var	user_callback ;
		// Values for the Ok button (or Enter) and Cancel (or escape) ; may be changed to an IDxxx constant if the 
		// msgbox function is called
		var	idok		=  true,
			idcancel	=  false ;
		
		// Loop through the arguments provided to alert(), error(), confirm(), etc...
		var	got_message		=  false ;
		var	msgbox_flags		=  0 ;
		var	icon			=  undefined ;
		
		for  ( var i = 0 ; i < args. length ; i ++ )
		   {
			var	argument	=  args [i] ;			// Argument value
			var	argtype		=  typeof ( argument ) ;	// Argument type


			argtype		=  argtype. toLowerCase ( ) ;

			// Automatic conversions
			switch  ( argtype )
			   {
				case  'boolean' :
					argument	=  argument. toString ( ) ;
					argtype		=  'string' ;
					break ;

				case  'number' :
					if  ( boxtype  !=  'msgbox' )
					   {
						argument	=  argument. toString ( ) ;
						argtype		=  'string' ;
					    }
					break ;
			    }			
			
			// Process current argument
			switch  ( argtype )
			   {
				// String type -
				//	if we encounter it for the first time, it is the message to display. For the second time, it is the title.       
				case	'string' :
					if  ( got_message )
						dialog_options. title	=  argument ;
					else
					   {
						message		=  argument ;
						got_message	=  true ;
					    }
					break ;

				// Function type -
				//	This is the calback to be called upon user validation.
				case	'function' :
					user_callback	=  argument ;
					break ;
					
				// Object type -
				//	This is a structure specifying dialog options to be merged with the default ones.
				case	'object' :
					dialog_options	=  $. extend ( dialog_options, argument ) ;
					break ;

				// Integer type : msgbox options
				case	'number' :
					msgbox_flags	=  argument ;
					break ;
									
				// Other type : panic !
				default :
					throw ( "Unexpected argument of type '" + argtype + "'" ) ;
			    }
		    }	 
		
		// Depending on the message box type, captions and buttons may differ...
		switch  ( boxtype )
		   {
			// Confirmation box : we should have an Ok and Cancel button
			case	"confirm" :
				dialog_options. buttons	=
				   [
					{
						html	:  labels. buttonLabels [ 'ok' ],
						click	:  function ( e ) { __close_me ( $(this), user_callback, true ) ; }
					 },
					{
						html	:  labels. buttonLabels [ 'cancel' ],
						click	:  function ( e ) { __close_me ( $(this), user_callback, false ) ; }
					 }
				    ] ;

				break ;    
			
			// Error message box ; at this stage, the only difference between error() and alert() resides in the default title
			case	"error" :
				dialog_options. buttons	=
				   [
					{
						html	:  labels. buttonLabels [ 'ok' ],
						click	:  function ( e ) { __close_me ( $(this), user_callback, true ) ; }
					 }
				    ] ;

				break ;

			// Msgbox message box : almost the same as on Windows platforms...
			case	"msgbox" :
			   {
				var	button_flag	=  ( msgbox_flags & BUTTON_MASK    )  >>  BUTTON_SHIFT,
					icon_flag	=  ( msgbox_flags & ICON_MASK      ),
					defbutton_flag	=  ( msgbox_flags & DEFBUTTON_MASK )  >>  DEFBUTTON_SHIFT ;

				switch  ( button_flag )
				   {
					case	$. msgbox. MB_OKCANCEL :
						dialog_options. buttons	=
						   [
							{
								html	:  labels. buttonLabels [ 'ok' ],
								click	:  function ( e ) { __close_me ( $(this), user_callback, $. msgbox. IDOK ) ; }
							 },
							{
								html	:  labels. buttonLabels [ 'cancel' ],
								click	:  function ( e ) { __close_me ( $(this), user_callback, $. msgbox. IDCANCEL ) ; }
							 }
						    ] ;

						idok		=  $. msgbox. IDOK ;
						idcancel	=  $. msgbox. IDCANCEL ;
						break ;
						
					case	$. msgbox. MB_YESNO :
						dialog_options. buttons	=
						   [
							{
								html	:  labels. buttonLabels [ 'yes' ],
								click	:  function ( e ) { __close_me ( $(this), user_callback, $. msgbox. IDYES ) ; }
							 },
							{
								html	:  labels. buttonLabels [ 'no' ],
								click	:  function ( e ) { __close_me ( $(this), user_callback, $. msgbox. IDNO ) ; }
							 }
						    ] ;

						idok		=  $. msgbox. IDYES ;
						idcancel	=  $. msgbox. IDNO ;
						break ;
						
					case	$. msgbox. MB_YESNOCANCEL :
						dialog_options. buttons	=
						   [
							{
								html	:  labels. buttonLabels [ 'yes' ],
								click	:  function ( e ) { __close_me ( $(this), user_callback, $. msgbox. IDYES ) ; }
							 },
							{
								html	:  labels. buttonLabels [ 'no' ],
								click	:  function ( e ) { __close_me ( $(this), user_callback, $. msgbox. IDNO ) ; }
							 },
							{
								html	:  labels. buttonLabels [ 'cancel' ],
								click	:  function ( e ) { __close_me ( $(this), user_callback, $. msgbox. IDCANCEL ) ; }
							 }
						    ] ;

						idok		=  $. msgbox. IDYES ;
						idcancel	=  $. msgbox. IDCANCEL ;
						break ;
						
					case	$. msgbox. MB_RETRYCANCEL :
						dialog_options. buttons	=
						   [
							{
								html	:  labels. buttonLabels [ 'retry' ],
								click	:  function ( e ) { __close_me ( $(this), user_callback, $. msgbox. IDRETRY ) ; }
							 },
							{
								html	:  labels. buttonLabels [ 'cancel' ],
								click	:  function ( e ) { __close_me ( $(this), user_callback, $. msgbox. IDNCANCEL ) ; }
							 }
						    ] ;

						idok		=  $. msgbox. IDRETRY ;
						idcancel	=  $. msgbox. IDCANCEL ;
						break ;
						
					case	$. msgbox. MB_ABORTRETRYIGNORE :
						dialog_options. buttons	=
						   [
							{
								html	:  labels. buttonLabels [ 'abort' ],
								click	:  function ( e ) { __close_me ( $(this), user_callback, $. msgbox. IDABORT ) ; }
							 },
							{
								html	:  labels. buttonLabels [ 'retry' ],
								click	:  function ( e ) { __close_me ( $(this), user_callback, $. msgbox. IDRETRY ) ; }
							 },
							{
								html	:  labels. buttonLabels [ 'ignore' ],
								click	:  function ( e ) { __close_me ( $(this), user_callback, $. msgbox. IDIGNORE ) ; }
							 }
						    ] ;

						idok		=  $. msgbox. IDABORT ;
						idcancel	=  $. msgbox. IDIGNORE ;
						break ;
						
					case	$. msgbox. MB_CANCELTRYCONTINUE :
						dialog_options. buttons	=
						   [
							{
								html	:  labels. buttonLabels [ 'cancel' ],
								click	:  function ( e ) { __close_me ( $(this), user_callback, $. msgbox. IDCANCEL ) ; }
							 },
							{
								html	:  labels. buttonLabels [ 'try' ],
								click	:  function ( e ) { __close_me ( $(this), user_callback, $. msgbox. IDTRY ) ; }
							 },
							{
								html	:  labels. buttonLabels [ 'continue' ],
								click	:  function ( e ) { __close_me ( $(this), user_callback, $. msgbox. IDCONTINUE ) ; }
							 }
						    ] ;

						idok		=  $. msgbox. IDTRY ;
						idcancel	=  $. msgbox. IDCANCEL ;
						break ;
						
					case	$. msgbox. MB_OK :
					default :
						dialog_options. buttons	=
						   [
							{
								html	:  labels. buttonLabels [ 'ok' ],
								click	:  function ( e ) { __close_me ( $(this), user_callback, $. msgbox. IDOK ) ; }
							 }
						    ] ;

						idok		=  $. msgbox. IDOK ;
						idcancel	=  $. msgbox. IDOK ;
						break ;
						
				    }

				if  ( defbutton_flag  >  dialog_options. buttons. length )
					defbutton_flag	=  dialog_options. buttons. length ;

				dialog_options. defaultButton	=  defbutton_flag ;

				switch ( icon_flag )
				   {
					case  $. msgbox. MB_ICONEXCLAMATION	:  icon	=  'MB_ICONEXCLAMATION'		; break ;
					case  $. msgbox. MB_ICONWARNING		:  icon	=  'MB_ICONWARNING'		; break ;
					case  $. msgbox. MB_ICONINFORMATION	:  icon	=  'MB_ICONINFORMATION'		; break ;
					case  $. msgbox. MB_ICONASTERISK	:  icon	=  'MB_ICONASTERISK'		; break ;
					case  $. msgbox. MB_ICONQUESTION	:  icon	=  'MB_ICONQUESTION'		; break ;
					case  $. msgbox. MB_ICONSTOP		:  icon	=  'MB_ICONSTOP'		; break ;
					case  $. msgbox. MB_ICONERROR		:  icon	=  'MB_ICONERROR'		; break ;
					case  $. msgbox. MB_ICONHAND		:  icon	=  'MB_ICONHAND'		; break ;
				    }

				if  ( icon  !==  undefined )
					icon	=  me. dirname + '/images/' + icon + '.png' ;

				break ;
			    }

			// Alert message box : There is a single Ok button.
			case	"alert" :
			default :
				dialog_options. buttons	=
				   [
					{
						html	:  labels. buttonLabels [ 'ok' ],
						click	:  function ( e ) { console.log(e);__close_me ( $(this), user_callback, true ) ; }
					 }
				    ] ;
		    }

		// If an icon has been specified, then we need to wrap both the icon and the message within a table
		var	wrapper_start		=  '',
			wrapper_end		=  '' ;

		if  ( icon  !==  undefined )
		   {
			wrapper_start		=  '<table width="100%" cellpadding="0" cellspacing="0">' +
						   '<tr>' +
						   '	<td class="ui-popup-dialog-icon-cell ui-' + boxtype + '-dialog-icon-cell">' +
						   '		<div class="ui-popup-dialog-icon ui-' + boxtype + '-dialog-icon">' +
						   '			<img src="' + icon + '"/>' +
						   '		</div>' +
						   '	</td>' +
						   '	<td class="ui-popup-dialog-message-cell ui-' + boxtype + '-dialog-message-cell">' ;
			wrapper_end		=  '</td></tr></table>' ;
		    }
				
		// Wrap the message in a <div>
		message		=  wrapper_start +
				   '<div class="' + 'ui-popup-dialog-message ui-' + boxtype + '-dialog-message">' +
					message + 
				   '</div>' +
				   wrapper_end ;
		   
		// Generate a unique dialog id		
		var	dialog_id		=  "msgbox-alert-" + unique_id ++ ;
		var	dialog_selector		=  '#' + dialog_id ;
		    
		// Append the dialog definition (well, the <div> containing the message to display) to the end of the document body.
		$('body'). append ( "<div id='" + dialog_id + "' style='display: none'>" + message + "</div>" ) ;

		// Set dialog options
		var	$this		=  $(dialog_selector) ;

		$this. dialog ( dialog_options ) ;

		// Add some classes to allow the caller for customization. 
		// Classes are : ui-msgbox-content and ui-msgbox-xxx-content, where 'xxx' stands for the message box
		//               type (alert, error, confirm, ...)
		var	$parent		=  $this. parent ( ) ;

		$this. addClass ( 'ui-popup-dialog-message ui-' + boxtype + '-dialog-message' ) ;
			
		$('.ui-button', $parent). 
			addClass ( 'ui-popup-dialog-button ui-' + boxtype + '-dialog-button' ) ;
		$('.ui-dialog-titlebar', $parent). 
			addClass ( 'ui-popup-dialog-titlebar ui-' + boxtype + '-dialog-titlebar' ) ;
		$('.ui-dialog-title', $parent). 
			addClass ( 'ui-popup-dialog-title ui-' + boxtype + '-dialog-title' ) ;
		$('.ui-button-icon-only', $parent). 
			addClass ( 'ui-popup-button-icon-only ui-' + boxtype + '-button-icon-only' ) ;
		$('.ui-dialog-buttonset', $parent). 
			addClass ( 'ui-popup-dialog-buttonset ui-' + boxtype + '-dialog-buttonset' ) ;
		$('.ui-button-text', $parent). 
			addClass ( 'ui-popup-dialog-button-text ui-' + boxtype + '-dialog-button-text' ) ;

		// Handle the click on the close (X) button as the ESCAPE key or a click on the Cancel button, if any
		$(".ui-dialog-titlebar-close", $parent). click
		   (
			function  ( e )
			   {
				$this. killEvent ( e ) ;

				__close_me ( $this, user_callback, false ) ;

				return ( true ) ;
			    }
		    ) ;

		// Handle escape and enter keys
		// Escape cannot be handled by keyup() because it is processed by the keydown() event ;
		// whereas Enter MUST be processed in keypress(), not keydown().
		$parent. keydown
		   (
			function ( e )
			   {
				if  ( e. keyCode  ===  $. ui. keyCode. ESCAPE )
				   {
					$this. killEvent ( e ) ;
					__close_me ( $this, user_callback, idcancel ) ;
					return ( true ) ;
				    }
			    }
		    ) ;

		$parent. keypress
		   (
			function ( e )
			   {
				if  ( e. keyCode  ===  $. ui. keyCode. ENTER )
				   {
					$this. killEvent ( e ) ;
					__close_me ( $this, user_callback, idok ) ;
					return ( true ) ;
				    }
			    }
		    ) ;

		// Open the dialog
		$this. dialog ( 'open' ) ;
	    }
    } ) ( jQuery, $. script ( ) ) ;
