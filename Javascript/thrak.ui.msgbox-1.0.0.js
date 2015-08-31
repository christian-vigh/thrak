/**************************************************************************************************************

    NAME
        thrak.ui.msgbox-1.0.0.js

    USAGE
	$. alert   ( msg, title, callback, options ) ;
	$. error   ( msg, title, callback, options ) ;
	$. confirm ( msg, title, callback, options ) ;

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

	options (object) -
		Additional jQuery ui dialog options.
				
    AUTHOR
        Christian Vigh, 12/2013.

    HISTORY
    [Version : 1.0]    [Date : 2013/12/05]     [Author : CV]
        Initial version.

 **************************************************************************************************************/

( function ( $ )
   {
	// To allow stacking of several message boxes, a dialog div with a unique id prepended will be created and appended to the end
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
		
	   
	// User callback upon validation 
	var	user_callback		=  null ;
	// What to display if the caller forgot to specify a message ???
	var	message			=  "<span style='color: #FF0000'>The developer forgot to specify a message for this alert...</span>" ;
	// Message box type (alert, error or confirm)
	var	messagebox_type	;
	// Default dialog options. Make sure of what you're doing if you want to override the open() and close() functions !
	var	default_options		=
	   { 
		modal		:  true,
		width		:  "auto",
		height		:  "auto",
		maxWidth	:  "800px",
		resizable	:  false,
		stack		:  true,
		open		:  function ( )
		   {
			var	$this		=  $(this) ;
			var	$parent		=  $this. parent ( ) ;
				
			// Add some classes to allow the caller for customization. 
			// Classes are : ui-msgbox-content and ui-msgbox-xxx-content, where 'xxx' stands for the message box
			//               type (alert, error, confirm, ...)
			$this. addClass ( 'ui-msgbox-dialog-message ui-' + messagebox_type + '-dialog-message' ) ;
			
			$('.ui-button', $parent). 
				addClass ( 'ui-msgbox-dialog-button ui-' + messagebox_type + '-dialog-button' ) ;
			$('.ui-dialog-titlebar', $parent). 
				addClass ( 'ui-msgbox-dialog-titlebar ui-' + messagebox_type + '-dialog-titlebar' ) ;
			$('.ui-dialog-title', $parent). 
				addClass ( 'ui-msgbox-dialog-title ui-' + messagebox_type + '-dialog-title' ) ;
			$('.ui-button-icon-only', $parent). 
				addClass ( 'ui-msgbox-button-icon-only ui-' + messagebox_type + '-button-icon-only' ) ;
			$('.ui-dialog-buttonset', $parent). 
				addClass ( 'ui-msgbox-dialog-buttonset ui-' + messagebox_type + '-dialog-buttonset' ) ;
			$('.ui-button-text', $parent). 
				addClass ( 'ui-msgbox-dialog-button-text ui-' + messagebox_type + '-dialog-button-text' ) ;

		    },
		close		:  function ( )
		   {
			// Call the callback if one specified, providing the return value of the message box (ok, cancel, etc...).
			// For the $.alert() and $.error functions, this parameter will always be set to 1.
			user_callback  &&  user_callback ( $(this). data ( 'status' ) ) ;
				
			// Since we're closing, we can remove our definition from the body of the document
			$(this). remove ( ) ;
		     }
	     } ;
	     
	// __show_alert -
	//	Main entry point for displaying message boxes.
	function  __show_alert ( boxtype, args ) 
	    {
		messagebox_type	=  boxtype ;
		
		// Add default options to each message type
		var	alert_title	=  ( $. locale  &&  $. locale (). options. msgbox. alert  . title )  ||  "Message" ;
		var	confirm_title	=  ( $. locale  &&  $. locale (). options. msgbox. confirm. title )  ||  "Confirmation" ;
		var	error_title	=  ( $. locale  &&  $. locale (). options. msgbox. error  . title )  ||  "Erreur" ;
	
		$. alert  . options	=  $. extend ( { title : alert_title   }, default_options ) ;
		$. confirm. options	=  $. extend ( { title : confirm_title }, default_options ) ;
		$. error  . options	=  $. extend ( { title : error_title   }, default_options ) ;
	 
	   
		// Dialog buttons will depend on the message box type
		var	dialog_buttons ;
		// Dialog options
		var	dialog_options ;
		
		
		messagebox_type	=  messagebox_type. toLowerCase ( ) ;
		
		// Depending on the message box type, captions and buttons can differ...
		switch  ( messagebox_type )
		   {
			// Confirmation box : we should have an Ok and Cancel button
			case	"confirm" :
				dialog_buttons	=
				   {
					Ok	:  function ( )
					   {
						$(this). data ( 'status', 1 ) ;
						$(this). dialog ( 'close' ) ;
					    },
					Annuler	:  function ( ) 
					   {
						$(this). data ( 'status', 0 ) ;
						$(this). dialog ( 'close' ) ;
					    }
				    } ;
				dialog_options	=  $. confirm. options ;
				break ;    
			
			// Error message box ; at this stage, the only difference between error() and alert() resides in the default title
			case	"error" :
				dialog_buttons	=
				   {
					Ok	:  function ( )
					   {
						$(this). data ( 'status', 1 ) ;
						$(this). dialog ( 'close' ) ;
					    }
				    } ;
				dialog_options	=  $. error. options ;
				break ;
				
			// Alert message box : There is a single Ok button.
			case	"alert" :
			default :
				dialog_buttons	=
				   {
					Ok	:  function ( )
					   {
						$(this). data ( 'status', 1 ) ;
						$(this). dialog ( 'close' ) ;
					    }
				    } ;
				dialog_options	=  $. alert. options ;
		    }
		
		// Dialog unique id
		var	dialog_id		=  "msgbox-alert-" + unique_id ++ ;
		// Dialog selector through its unique id
		var	dialog_selector		=  '#' + dialog_id ;
		    
		// Other variables
		var	more_options		=  { buttons: dialog_buttons } ;
		var	got_message		=  false ;
		
		// It's time now to loop through the arguments provided to alert(), error(), confirm(), etc...
		for  ( var i = 0 ; i < args. length ; i ++ )
		   {
			var	argument	=  args [i] ;			// Argument value
			var	argtype		=  typeof ( argument ) ;	// Argument type
			
			
			switch  ( argtype. toLowerCase ( ) )
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
					more_options	=  argument ;
					break ;
					
				// Other type : panic !
				default :
					throw ( "Unexpected argument of type '" + argtype + "'" ) ;
			    }
		    }
		    
		// Merge default dialog options with the ones that may have been supplied
		var	dialog_options		=  $. extend ( dialog_options, more_options ) ;
		
		// Append the dialog definition (well, the <div> containing the message to display) to the end of the document body.
		$('body'). append ( "<div id='" + dialog_id + "' style='display: none'>" + message + "</div>" ) ;
		
		// Set dialog options
		$(dialog_selector). dialog ( dialog_options ) ;
		
		// Open the dialog : we're done !
		$(dialog_selector). dialog ( 'open' ) ;
	    }
    } ( jQuery ) ) ;
