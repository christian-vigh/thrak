/**************************************************************************************************************

    NAME
        thrak.ui.jqueryfix-1.0.0.js

    DESCRIPTION
	Fixes some jQuery strange behaviors.
		
    USAGE
	// Just include this file...

    AUTHOR
        Christian Vigh, 11/2013.

    HISTORY
    [Version : 1.0]    [Date : 2013/11/25]     [Author : CV]
        Initial version.

 **************************************************************************************************************/

( function ( $ )
   {
	// Tooltips : re-enable HTML contents in [title] attributes, that were suppressed with jQuery 1.9.x.
	$. widget 
	   ( 
		"ui.tooltip", 
		$. ui. tooltip, 
		{
			options	: 
			   {
				content	:  function ( ) 
				   {
					return ( $(this). attr ( 'title' ) ) ;
				    }
			    }
		 }
	    ) ;	       
    } ( jQuery ) ) ;
