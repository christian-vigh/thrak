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

			// select -
			//	Called when a tree item is selected by the user.
			select		:  function  ( obj )
			   { 
				if  ( typeof ( obj )  ==  'string' )
					obj	=  $('li[href="' + obj + '"]' ) ;

				// Recursively expand parent <ul>'s
				var	parent_li	=  obj. parent ( ). closest ( 'li' ) ;

				while  ( parent_li. length  >  0 )
				   {
					parent_li. removeClass ( 'ui-menutree-item-collapsed' ). addClass ( 'ui-menutree-item-expanded' ) ;
					$('>ul', parent_li). css ( 'display', 'list-item' ) ;
					parent_li	=  parent_li. parent ( ). closest ( 'li' ) ;
				    }

				this. options. instance. _click ( obj, null, false ) ; 
				this. options. instance. _select ( obj ) ;
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
				$('>li', $widget). each ( this. _wrap_li ) ;	

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
				$('li'     , $widget). click ( function ( e ) { $this_widget. _click ( $(this), e, false ) ; } ) ;
				$('li>span', $widget). click ( function ( e ) { $this_widget. _click ( $(this). parent (), e, true  ) ; } ) ;

				// Links with the 'ui-menutree-goto' class will automatically select the specified menu tree id
				// We need a listener on the whole document since contents are reassigned to the contentSelector option
				// each time a click is made
				$(document). ready
				   (
					function ( )
					   {
						$(document). on
						   (
							'click',
							'a.ui-menutree-goto',
							function  ( e )
							   {
								$this_widget. select ( $(this). attr ( 'href' ) ) ;
								e. preventDefault ( ) ;

								return ( true ) ;
							    }
						    ) ;
					    }
				    ) ;
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
			//	Transforms each list item into a stylable entry.
			//	Since the DOM is modified by this function, only the first-level descendents are handled
			//	here. The function is then recursively called on inner children.
			_wrap_li		:  function ( index, object )
			   {
				var	$this		=  $(object) ;
				var	$ul		=  $('>ul', $this). first ( ) ;
				var	is_menu		=  ( $ul. length  >  0 ) ;
				var	icon_class	=  '' ;


				// Every <li> of a menu tree has the ui-menutree-item class
				$this. addClass ( 'ui-menutree-item' ) ;

				// <li> items that embed a <ul> will hve the ui-menutree-parent class. The ui-menutree-item-collapsed
				// class is added by default, because submenu items do not appear.
				// Other <li> items without <ul> will have the ui-menutree-single class.
				if  ( is_menu ) 
				   {
					$this. addClass ( 'ui-menutree-parent ui-menutree-item-collapsed' ) ;
					icon_class		=  'ui-menutree-icon-parent' ;
				    }
				else
				   {
					$this. addClass ( 'ui-menutree-single' ) ;
					icon_class		=  'ui-menutree-icon-single' ;
				    }

				// For <li> items that have a submenu, isolate non <ul> contents
				var	contents	=  '',
					submenu		=  '' ;

				$this. contents ( ). each
				   (
					function ( )
					   {
						var	$item		=  $(this) ;

						if  ( submenu  ==  ''  &&  $item. tag ( )  ==  'ul' )
							submenu		 =  $item. outerHtml ( ) ;
						else
							contents	+=  $item. outerHtml ( ) ;
					    }
				    ) ;

				// The title for an <li> item is built from the non <ul> items within the <li>.
				// However, a title can be specified through the "item-title" attribute
				if  ( $this. attr ( 'item-title' )  ===  undefined )
					$this. attr ( 'item-title', contents ) ;

				// Wrap the <li> contents ; we have first an icon to display if the <li> has a submenu, then for convenience
				// reasons, we wrap the non <ul> contents inside a <div>
				$this. html ( '<span class="ui-icon ui-menutree-icon ' + icon_class + '"></span><div>' + contents + '</div>' + submenu ) ;

				// If there is a submenu (<ul>), add the class ui-menutree-children to it
				$('>ul', $this). first ( ). addClass ( 'ui-menutree-children' ) ;

				// Recursively call this function if we have a submenu with <li> items
				$('ul>li', $this). each ( arguments. callee ) ;	
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
					$(this. options. titleSelector). html ( obj. attr ( 'item-title' ) ) ;

				var	html		=  $(obj. attr ( 'href' ) ). html ( ) ;

				if  ( this. options. contentSelector )
					$(this. options. contentSelector). html ( ( html ) ?  html : '' ) ;
			    },


			// _click -
			//	Handles a click on a list item.
			_click			:  function ( $this, e, force_collapse )
			   {
				var		$widget		=  this. option. instance ;
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
					this. _select ( $this ) ; 
			    }


		 }
	    ) ;


    } ( jQuery ) ) ;

