/**************************************************************************************************************

    NAME
        thrak.ui.stickyfooter-1.0.0.js

    DESCRIPTION
        A jQuery plugin that makes an item, such as a <div> element, stick to the bottom of the screen if the
	page is smaller that screen height.
	
    USAGE
	$. stickyFooter ( item, options ) ;

    PARAMETERS
	item -
		Html element holding the footer (typically, a <div> element).

	options -
		Options for the stickyFooter object. It can have the following elements :

		"css" -
			A structure mentioning CSS attributes to be applied to the footer.

    AUTHOR
        Christian Vigh, 11/2013.

    HISTORY
    [Version : 1.0.0]		[Date : 2013/11/09]     [Author : CV]
        Initial version.

    [Version : 1.0.0.1]		[Date : 2013/12/17]     [Author : CV]
	. Removed browser-specific dependencies to properly align the footer to the bottom of the browser window
	  and added a manual call to the resize() event instead, which did the trick.

 **************************************************************************************************************/

( function ( $ )
   {
	$. prototype. stickyFooter	=  function ( options )
	   {
		var	settings	=  $.extend ( {}, options ) ;
		var	them		=  this ;

		
		// The function stick() does the real sticky job...
		function  stick ( $this )     
		   {
			// Where are we ?
			var  document_height	=  $(window). height ( ) ;
			var  footer_height	=  $this. outerHeight ( ) ;
			var  footer_top		=  $this. position ( ). top + footer_height ;

			// If page height is less than screen height, we need to make some adjustments
			if  ( footer_top  <  document_height )
			   {
				var	delta		=  -4 ;
				var	margin_top	=  document_height - footer_top ;  
			
				margin_top += delta ;

				$this. css ( 'margin-top', margin_top + 'px' ) ;				
			    }
			else 
				$this. css ( 'margin-top', '0px' ) ;
		     }

		
		// Apply stickyness to the selected objects
		function  apply ( them )
		   {
			them. each
			   (
				function ( )
				   {
					stick ( $(this) ) ;
				    }
			    ) ;
		    }


		// The sticky footer needs to be repositioned when the window is resized...
		$(window). resize
		   (
			function ( )
			   {
				apply ( them ) ;
			    }
		    ) ;
		    

		// A "fake" resizing event is needed, otherwise the stickybottom element will end a few pixels before the
		// end of the window (why ???)
		$(window). trigger ( 'resize' ) ;
	
		return ( them ) ;
	    }
    } ( jQuery ) ) ;

