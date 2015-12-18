/**************************************************************************************************************

    NAME
        thrak.ui.radio-1.0.0.js

    DESCRIPTION
        Classic radio with a clickable label.

    AUTHOR
        Christian Vigh, 10/2015.

    HISTORY
    [Version : 1.0]    [Date : 2015/10/29]     [Author : CV]
        Initial version.

 **************************************************************************************************************/

( function ( $ )
   {
	$. widget 
	   (
		'thrak.radio',
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
					label	=  '<label for="' + this_id + '">' + label + '</label>' ;

				$label. remove ( ) ;

				// Wrap the <input> and <label> tags within <div>'s. Don't use the replaceWith() function
				// since it will override the existing <input type="radio"> element together with its
				// attached events
				$this. wrap
				   (
					'<div class="radio-wrapper" radio-wrapper-id="' + this_id + '">' +
						'<div class="radio-input"></div>' +
					'</div>' 
				    ) ;

				// $this still references the <input> tag ; we now need a reference to the surrounding <div>
				// we created
				var	$wrapper	=  $('[radio-wrapper-id="' + this_id + '"]') ;

				// Append the associated label to the radio wrapper
				$wrapper. append ( '<div class="radio-label">' + label. trim ( ) + '</div>' ) ;

				// Add a click handler for all the <div>'s we have wrapped around the radio
				$('.radio-wrapper, .radio-label, .radio-label label', $wrapper). click
				   (
					function ( e )
					   {
						var	$target		=  $('#' + this_id) ;
						var	$this		=  $(this) ;


						$target. click ( ) ;
						$this. killEvent ( e ) ;

						return ( false ) ;
					    }
				    )
			    }
		 }
	    ) ;
    } ( jQuery ) ) ;