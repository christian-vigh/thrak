/**************************************************************************************************************
  
      NAME
          thrak.ui.menutree-1.0.0.js
  
      DESCRIPTION
          A simple menu tree that can be embedded anywhere. Notice that this is not a popup menu !
  
      AUTHOR
          Christian Vigh, 12/2015.
  
      HISTORY
      [Version : 1.0]	[Date : 2015/12/04]     [Author : CV]
          Initial version.
  
   **************************************************************************************************************/

 ( function ( $ )
   {
	$. widget 
	   (
		'thrak.menutree',
		{
			// Widget options
			options		:  
			   {	
				// Display method ; can be : 
				// 'inline' -
				//	Information are taken from the current page, using the href attribute of
				//	each <li> node as the css id of contents.
				// 'ajax' :
				//	To be implemented.
				method		:  'inline',

				// select -
				//	Called when a tree item is selected by the user.
				select		:  function  ( obj )
				   { this. instance. _select ( obj ) ; },

				// titleSelector -
				//	If not undefined, identifies a DOM element somewhere in the page that
				//	will be refreshed using the "title" attribute of the <li> node that has
				//	been selected.
				//	Note that the "title" attribute, if not specified, defaults to the <li>
				//	node text contents.
				titleSelector	:  undefined,

				// contentSelector -
				//	DOM element where the html content corresponding to the currently selected
				//	node will be put.
				contentSelector	:  undefined
			    },

			// _create -
			//	Creates a new instance of the widget. 
			_create			:  function ( )
			   {
				var	$this_widget	=  this ;
				var	$widget		=  this. element ;

				this. options. instance		=  $this_widget ;

				// Style each menu item
				$widget. addClass ( "ui-menutree ui-thrak-menutree" ) ;
				$('li', $widget). each ( this. _wrap_li ) ;	

				// Collapse submenus
				$('li>ul', $widget). css ( 'display', 'none' ) ;	
				
				// There are 2 click handlers for each item :
				// - The 1st one is called when the user clicks on the label of a node having children :
				//   - If the node was not the active node, it is activated (ie, selected)
				//   - If the node was already the active node, then it is expanded or collapsed depending
				//     on its initial state
				// - The 2nd one is called when the user clicks on the collapse/expand icon : the 
				//   collapse/expand state of the node is then changed, independently of whether it was the
				//   active node or not.
				$('li'     , $widget). click ( function ( e ) { $this_widget. _click ( $this_widget, $(this), e, false ) ; } ) ;
				$('li span', $widget). click ( function ( e ) { $this_widget. _click ( $this_widget, $(this). parent (), e, true  ) ; } ) ;
			    },


			    // Options handling
			    _setOption		: function ( key, value ) 
			        {
					this. _super ( key, value ) ;

			         },

			    _setOptions		: function ( options ) 
			       {
					this. _super ( options ) ;
			        },

  


			// _wrap_li -
			//	Transforms each list item into a stylable entry
			_wrap_li		:  function ( index, object )
			   {
				var	$this		=  $(object) ;
				var	item		=  $this. textAt ( 0 ) ;
				var	$children	=  $('>ul', $this). first ( ) ;
				var	has_children	=  $('>ul', $this). length ;
				var	icon_class	=  '' ;

				$this. addClass ( 'ui-menutree-item' ) ;

				if  ( has_children  ===  0 ) 
				   {
					$this. addClass ( 'ui-menutree-single' ) ;
					icon_class		=  'ui-menutree-icon-single' ;
				    }
				else
				   {
					$this. addClass ( 'ui-menutree-parent ui-menutree-item-collapsed' ) ;
					icon_class		=  'ui-menutree-icon-parent' ;
				    }
				
				if  ( $this. attr ( 'title' )  ===  undefined )
					$this. attr ( 'title', item. text ( ). trim ( ) ) ;

				$children. addClass ( 'ui-menutree-children' ) ;
				item [0]. replaceWith ( '<span class="ui-icon ui-menutree-icon ' + icon_class + '"></span><div>' + item. text ( ) + '</div>' ) ;
			    },


			// _select -
			//	Changes the currently selected contents.
			_select		:  function ( obj )
			   {
				switch  ( this. options. method. toLowerCase ( ) )
				   {
					case	'inline' :
						break ;

					case	'ajax' :
						break ;

					default :
						throw ( "Invalid selection update method '" + this. options. method + "'" ) ;
				    }

				if  ( this. options. titleSelector )
					$(this. options. titleSelector). html ( obj. attr ( 'title' ) ) ;

				var	html		=  $(obj. attr ( 'href' ) ). html ( ) ;

				if  ( this. options. contentSelector )
					$(this. options. contentSelector). html ( ( html ) ?  html : '' ) ;
			    },


			// _click -
			//	Handles a click on a list item.
			_click			:  function ( $widget, $this, e, force_collapse )
			   {
				var		is_active	=  $this. hasClass ( 'ui-menutree-item-active' ) ;


				$this. killEvent ( e ) ;

				if  ( is_active  ||  force_collapse )
				   {
					if  ( $this. hasClass ( 'ui-menutree-item-collapsed' ) )
					   {
						$this. removeClass ( 'ui-menutree-item-collapsed' ). addClass ( 'ui-menutree-item-expanded' ) ;
						$('>ul', $this). css ( 'display', 'list-item' ) ;
					    }
					else
					   {
						$this. removeClass ( 'ui-menutree-item-expanded' ). addClass ( 'ui-menutree-item-collapsed' ) ;
						$('>ul', $this). css ( 'display', 'none' ) ;
					    }
				    }
				else
				   {
					$('li', this. element). removeClass ( 'ui-menutree-item-active' ) ;
					$this. addClass ( 'ui-menutree-item-active' ) ;

					$this. removeClass ( 'ui-menutree-item-collapsed' ). addClass ( 'ui-menutree-item-expanded' ) ;
					$('>ul', $this). css ( 'display', 'list-item' ) ;
				    }

				if  ( ! force_collapse )
					$widget. options. select  &&  $widget. options. select ( $this ) ; 
			    }


		 }
	    ) ;


    } ( jQuery ) ) ;

