/**************************************************************************************************************

    NAME
        thrak.ui.checkbox-1.0.0.js

    DESCRIPTION
        Classic checkbox with a clickable label.

    AUTHOR
        Christian Vigh, 10/2015.

    HISTORY
    [Version : 1.0]    [Date : 2015/10/23]     [Author : CV]
        Initial version.

 **************************************************************************************************************/

( function ( $ )
   {
	$. widget 
	   (
		'thrak.checkbox',
		{
			options		:  {},
			_create		:  function ( )
			   {
				var	$this		=  this. element ;
				var	this_id		=  $this. attr ( 'id' ) ;
				var	$label		=  $('label[for="' + this_id + '"]') ;
				var	label		=  $this. attr ( 'label' ) ;
				var	input		=  $this. outerHtml ( ) ;
				
				// Remove the existing <label> tag if any - we need to make sure that it's after the <input> tag
				if  ( label  ==  ''  ||  label  ==  undefined )
					label	=  $label. outerHtml ( ) ;
				else
					label	=  '<label for="' + label + '">' + label + '</label>' ;

				$label. remove ( ) ;

				// Wrap the <input> and <label> tags within <div>s
				$this. replaceWith
				   (
					'<div class="checkbox-wrapper" checkbox-wrapper-id="' + this_id + '">' +
						'<div class="checkbox-input">' + input. trim ( ) + '</div>' +
						'<div class="checkbox-label">' + label + '</div>' +
					'</div>' 
				    ) ;

				// $this still references the <input> tag ; we now need a reference to the surrounding <div>
				// we created
				$this	=  $('[checkbox-wrapper-id="contact-me-upload-files"]') ;

				$('.checkbox-wrapper, .checkbox-input, .checkbox-label, .checkbox-label label', $this). click
				   (
					function ( e )
					   {
						var	$this	=  $('#' + this_id) ;

						$this. prop ( 'checked', ! $this. prop ( 'checked' ) ) ;
						$this. killEvent ( e ) ;

						return ( false ) ;
					    }
				    )
			    }
		 }
	    ) ;
    } ( jQuery ) ) ;