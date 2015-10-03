/**************************************************************************************************************

    NAME
        thrak.uri-1.0.0.js

    DESCRIPTION
        A jQuery plugin that adds extra functionalities to the traditional window.location object.

    PROPERTIES
	Since some read/write properties need to modify the contents of other, they are implemented as methods
	for compatibility reason (ie, like JQuery attr() method which is called as : attr('name') to retrieve
	an attribute value, and attr('name', 'value') to define it).

    METHODS
	The following properties are available ; the examples given within parentheses are based on the 
	following uri :

		http://testuser:foobar@www.example.com:80/path/subdir/test.html?param=value&param2=value2#anchor

	- anchor ( [value] ) :
		Gets/sets the optional anchor (#anchor).

	- anchorParameters ( ) :
		Allows anchors to hold "param1=value1&param2=value2..." parameters, which are parsed in the same way
		as query parameters.
		This trick can be useful when frames or ajax requests are used, to add a new url to the history without
		reloading everything.

	- credentials ( user, password ) :
		Sets the values of the user and password properties.

	- directory ( [value] ) :
		The directory part after the hostname (path/subdir). The resulting property will include a
		leading and trailing slash, even if it was missing in the supplied value.

	- host ( [value] ) :
		Gets/sets the hostname (www.example.com).

	- href ( [value] ) :
		The whole uri (http://user:password@www.example.com:80/path/subdir/test.html?param=value&param2=value2#anchor).
		If a value is specified, then all the individual properties will be assigned with the various
		parts of the uri value.

	- page ( [value] ) : 
		Gets/sets the requested page (test.html).

	- parameters ( ) :
		Returns an object having the specified properties and methods :

		- defined ( name ) :
			Returns true if the specified parameter is defined, false otherwise.

		- empty ( ) :
			Empties the list of parameters.

		- get ( name, default_value ) : 
			Gets an url parameter from the query string by its name. A default value can be specified if 
			the parameter does not exist.
			If default_value is not specified, the default value will be the empty string.
			If no parameter name is specified, then the whole parameters object is returned. 
		- remove ( name ) :
			Removes the specified parameter. Equivalent to set ( name ) without any 
			associated value.
			Returns true if the parameter existed, false otherwise.

		- set ( name, value ) :
			Replaces the value of an existing parameter or creates a new one if it does not exist.

		- toString ( ) :
			Assembles the various uri components and returns the full uri.

		The parameters() function can also be called as :

			parameters ( action [, arguments] ) ;

		'action' can be the name of any function defined in the object returned when the parameters()
		function is called without argument. The returned value in this case is not the object, but
		rather the return value of the called function.

	- password ( [value] ) :
		Gets/sets the optional password (foobar).

	- path ( [value] ) :
		Gets/sets the 'directory' and 'page' properties. When setting a new value, a traling
		slash must be specified if the last component of the path is a subdirectory, not a
		page (file) name.

	- port ( [value] ) :
		Gets/sets the optional port (80).

	- protocol ( [value] ) :
		Gets/sets the protocol part (http).

	- query ( [value] ) :
		Gets/sets the query string. The supplied value can include an optional leading quotation
		mark (?param=value&param2=value2).

	- user ( [value] ) :
		Gets/sets the optional user (testuser).

    USAGE
	var	uri	=  $. uri ( href ) ;

    AUTHOR
        Christian Vigh, 04/2015.

    HISTORY
    [Version : 1.0]	[Date : 2015/04/24]     [Author : CV]
        Initial version.

    [Version : 1.0.1]	[Date : 2015/10/03]     [Author : CV]
	. Modified the path() function, which did not return the page name.

 **************************************************************************************************************/
 
( function ( $ ) 
   {
	$. uri	=  function  ( href )
	   {
		/*==============================================================================================================
		
			Private code executed during the plugin initialization or called by member methods.
					
		  ==============================================================================================================*/

		// uri -
		//	Initializes an uri() object.
		function  uri  ( href )
		   {
			var  $this	=  this ;

			// Uri components
			this. __components		=  
			   {
				anchor			:  undefined,		// Anchor part
				directory		:  undefined,		// Directory after domain name, not including the page
				host			:  undefined,		// Host name or IP
				page			:  undefined,		// Requested page, if any
				password		:  undefined,		// Password,
				port			:  undefined,		// Port number
				protocol		:  undefined,		// Protocol name (eg: http)
				user			:  undefined,		// Username

				// Computed fields
				href			:  undefined,		// Complete uri,
				hrefLocal		:  undefined,		// Complete uri, but without the specific local variables if any
				query			:  undefined,		// Query string, with a leading '?'
				queryLocal		:  undefined,		// Query string without local parameters

				// Parameters local to this page - they will not be included by the href() method
				locals			:  []
			    } ;

			// Url parameters (query string) and anchor parameters
			this. __parameters		=  [] ;
			this. __anchorParameters	=  [] ;

			// If a href is specified, initialize the object
			if  ( href )
				this. href ( href ) ;

			// Parameters API ; static version merged with the dynamic version returned by parameters()
			this. __parameters_api	=  
			   {
				//  add -
				//	Parses a query string and adds each parameter to the list.
				add		:  function  ( query )
				   {
					query   &&  query . length  &&  parse_query ( $this, query , '?', 'query' , '__parameters', true ) ;
				    },


				//  get -
				//	Retrieves a parameter value. When undefined, the default value is returned 
				//	(default value can be undefined as well).
				get		:  function  ( name, default_value )
				   {
					for  ( var  i = 0 ; i  <  this. parameters. length ; i ++ )
					   {
						var	param	=  this. parameters [i] ;

						if  ( param. name  ==  name )
						   {
							if  ( param. value  ==  undefined )
								return ( default_value ) ;
							else
								return ( param. value ) ;
						    }
					    }

					return ( default_value ) ;
				    },

				// set -
				//	Update an existing parameter value or creates a new parameter.
				//	Removes an existing parameter if value is undefined.
				//	Returns the parameter object itself so that calls to set() can be chained.
				set		:  function  ( name, value )
				   {
					var	found	=  -1 ;

					for  ( var  i = 0 ; i  <  this. parameters. length ; i ++ )
					   {
						var	param	=  this. parameters [i] ;

						if  ( param. name  ==  name )
						   {
							found	=  i ;
							break ;
						    }
					    }

					if  ( found  >=  0 )
					   {
						if  ( value  ===  undefined  ||  ! value )
							this. parameters. splice ( found, 1 ) ;
						else
							this. parameters [ found ]	=   { name : name, value : value } ;
					    }
					else if  ( value  !==  undefined )
						this. parameters. push ( { name : name, value : value } ) ;

					rebuild_computed_fields ( $this ) ;

					return ( this ) ;
				    },

				// empty -
				//	Resets the parameter list.
				empty		:  function ( )
				   {
					this. parameters	=  [] ;
					rebuild_computed_fields ( $this ) ;

					return ( this ) ;
				    },

				// defined -
				//	Checks if the specified parameter is defined. 
				//	Returns true if the parameter exists, false otherwise.
				defined		:  function ( name ) 
				   {
					for  ( var  i = 0 ; i  <  $this. __parameters. length ; i ++ )
					   {
						var	param	=  this. parameters [i] ;

						if  ( param. name  ==  name )
							return ( true ) ;
					    }

					return ( false ) ;
				    },

				// remove -
				//	Removes the specified parameter. Returns true if the parameter exists,
				//	false otherwise.
				remove		:  function ( name ) 
				   {
					for  ( var  i = 0 ; i  <  $this. __parameters. length ; i ++ )
					   {
						var	param	=  this. parameters [i] ;

						if  ( param. name  ==  name )
						   {
							this. parameters. splice ( i, 1 ) ;
							rebuild_computed_fields ( $this ) ;

							return ( true ) ;
						    }
					    }

					return ( false ) ;
				    }
			    } ;
		    }


		// parse -
		//	Parses a complete uri and dispatches various elements into this object's fields.
		function  parse ( $this, href )
		   {
			// Regular expression taken from phpjs
			var	re		=  /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/ ;
			var	match		=  re. exec ( href ) ;			// Get pattern matches
			var	path		=  match [9] ;				// Get path, including requested page
			var	last_slash	=  path. lastIndexOf ( '/' ) ;		// Index of last slash before the requested page, or -1
			var	query		=  match [12] ;				// Get query string, without the leading '?'
			var	anchor		=  match [13] ;

			// Get components that do not need any interpretation
			if  ( anchor )
				$this. __components. anchor		=  anchor ;

			if  ( match [6] )
				$this. __components. host		=  match [6] ;

			if  ( match [5] )
				$this. __components. password		=  match [5] ;

			if  ( match [4] )
				$this. __components. user		=  match [4] ;

			if  ( match [7] )
				$this. __components. port		=  match [7] ;

			if  ( match [1] )
				$this. __components. protocol		=  match [1] ;

			// Process the part path of the url
			if  ( last_slash  ==  -1 )
			   {
				// No directory separator ; just store the requested page name if one exists
				if  ( path. length )
					$this. __components. page	=  path ;
			    }
			// Directory separator has been found before the end of the path string : split directory and page parts
			else if  ( last_slash  <  path. length - 1 )
			   {
				$this. __components. directory	=  path. substring ( 0, last_slash + 1 ) ;
				$this. __components. page	=  path. substring ( last_slash + 1 ) ;
			    }
			// A directory separator has been found, but at the end of the string : this means that there is a path
			// but no page name
			else 
				$this. __components. directory	=  path ;

			// Parse the query string if specified
			query   &&  query . length  &&  parse_query ( $this, query , '?', 'query' , '__parameters'	, false, true ) ;
			anchor  &&  anchor. length  &&  parse_query ( $this, anchor, '#', 'anchor', '__anchorParameters', false, true ) ;

			// Rebuild computed fields
			rebuild_computed_fields ( $this ) ;
		    }

		
		// parse_query -
		//	Parse query string and creates individual properties in the components. parameters array.
		function  parse_query ( $this, query, prefix, component, private_field, append, rebuild )
		   {
			// Allow an optional leading quotation mark (or sharp for fragments)
			if  ( query  &&  query [0]  ==  prefix )
				query	=  query. substring ( 1 ) ;

			var	parts	=  query. split ( '&' ) ;	// Split query string into name=value parts

			// Set the query property if something has been specified
			if  ( query. length )
			   {
				if  ( append )
				   {
					$this. __components [ component ]	+=  prefix + query ;
				    }
				else
				   {
					$this. __components [ component ]	=  query ;
					$this [ private_field ]			=  [] ;
				    }

				// Loop through query string items
				for  ( var  i  = 0 ; i  <  parts. length ; i ++ )
				   {
					// Get name & value parts as a single string
					var	param		=  parts [i]. split ( '=' ) ;
					// .. then extract the name and value parts. Value is automatically decoded
					var	name		=  param [0],
						value		=  ( param. length  >  1 ) ? decodeURI ( param [1] ) : '' ;

					// Add this entry to the list of parameters
					if  ( append ) 
						$this. parameters ( ). set ( name, value ) ;
					else
						$this [ private_field ]. push ( { 'name' : name, 'value' : value } ) ;
				    }
			    }
			else
			   {
				$this. __components [ component ]	=  undefined ;
				$this [ private_field ]			=  undefined ;
			    }

			// Rebuild computed fields
			if  ( rebuild ) 
				rebuild_computed_fields ( $this ) ;
		    }


		// rebuild_computed_fields -
		//	Rebuilds the computed fields (href, query,...)
		function  rebuild_computed_fields ( $this )
		   {
			var	components	=  $this. __components ;
			var	url		=  '' ;
			var	localUrl	=  '' ;


			// Rebuild the query string
			rebuild_query_string ( $this, '?', 'query' , 'queryLocal', '__parameters' ) ;
			rebuild_query_string ( $this, '#', 'anchor', undefined   , '__anchorParameters' ) ;

			// Rebuild the whole url
			if  ( components. protocol )
				url	+=  components. protocol + '://' ;

			if  ( components. user )
			   {
				url	+=  components. user + ':' ;

				if  ( components. password )
					url	+=  components. password ;

				url	+=  '@' ;
			    }

			if  ( components. host )
				url	+=  components. host ;

			if  ( components. port )
				url	+=  ':' + components. port ;

			if  ( components. directory )
				url	+=  components. directory ;

			if  ( components. page )
			   {
				if  ( components. directory  ===  undefined )
					url	+=  '/' ;

				url	+=  components. page ;
			    }

			localUrl	=  url ;

			if  ( components. query )
			   {
				url		+=  components. query ;
				localUrl	+=  components. queryLocal ;
			    }

			if  ( components. anchor )
			   {
				url		+=  components. anchor ;
				localUrl	+=  components. anchor ;
			    }

			components. href	=  url ;
			components. hrefLocal	=  localUrl ;
		    }


		// rebuild_query_string -
		//	Rebuilds the query string. Works for both query and "pseudo" anchor parameters.
		function  rebuild_query_string ( $this, prefix, member_name, local_member_name, parameters_array_name )
		   {
			var	components	=  $this. __components ;
			var	parameters	=  $this [ parameters_array_name ] ;

			if  ( parameters  &&  parameters. length  >  0 )
			   {
				var	string_parameters	=  [] ;
				var	local_string_parameters	=  [] ;

				for  ( var  i = 0 ; i  <  parameters. length ; i ++ )
				   {
					var	string_parameter	=  parameters [i] ;
					var	value			=  string_parameter. name ;

					if  ( string_parameter. value  !==  undefined )
						value	+=  '=' + encodeURI ( string_parameter. value ) ;

					string_parameters. push ( value ) ;

					if  ( components. locals. indexOf ( string_parameter. name )  <  0 )
						local_string_parameters. push ( value ) ;
				    }

				components [ member_name ]	=  prefix + string_parameters. join ( '&' ) ;

				if  ( local_member_name )
					components [ local_member_name ]	=  prefix + local_string_parameters. join ( '&' ) ;
			    }
			else 
			   {
				components [ member_name ]	=  undefined ;

				if  ( local_member_name )
					components [ local_member_name ]	=  undefined ;
			    }
		    }


		// set_value -
		//	Sets the value of the specified member in the __components object
		function  set_value ( $this, field, value )
		   {
			if  ( value )
			   {
				$this. __components [ field ]	=  value ;
				rebuild_computed_fields ( $this ) ;

				return ( $this ) ;
			    }
			else 
				return ( $this. __components [ field ] ) ;
		    }


		/*==============================================================================================================
		
		        Extend the uri() object prototype with mainly property "getters and setters".
			In fact, functions have been used instead of get/set for backward compatibility with browsers.
		
		  ==============================================================================================================*/
		var	prototype	=  uri. prototype ;


		// anchor -
		//	Gets/sets the anchor value for this uri.
		prototype. anchor	=  function  ( value )
		   {
			return ( set_value ( this, 'anchor', value ) ) ;
		    }


		// Anchor parameters
		//	Implements a parameter list after the anchor sign (#), much in the way of a query string.
		prototype. anchorParameters	= function ( )
		   {
			if  ( arguments. length  >  0 )
			   {
				var	funcname	=  arguments [0] ;
				var	argv		=  Array. prototype. slice. call ( arguments, 1 ) ;

				if  ( this. __parameters_api [ funcname ] )
				   {
					var	result		=  this. __parameters_api [ funcname ]. apply ( funcname, argv ) ;

					return ( result ) ;
				    }
				else
					return ( undefined ) ;
			    }
			else
			   {
				var	params	=  $. extend ( this. __parameters_api, { parameters : this. __anchorParameters } ) ;

				return ( params ) ;
			    }
		    }



		// components -
		//	Gets all the uri components as a single structure.
		//	Note that any modication to this structure members will be... lost.
		prototype. components	=  function ( )
		   { 
			var	result	=  this. __components ;

			return ( result ) ; 
		     }


		// credentials -
		//	Sets the username/password.
		//	This function returns an object containing a 'user' and 'password' members.
		prototype. credentials		=  function  ( user, password )
		   {
			if  ( name )
			   {
				set_value ( this, 'user', user ) ;
				set_value ( this, 'password', password ) ;
			    }

			return  ( { user : this. __components. user, password : this. __components. password } ) ;
		    }


		// directory -
		//	Gets/sets the directory part for this uri.
		prototype. directory	=  function  ( value )
		   {
			if  ( value )
			   {
				if  ( value [0]  !=  '/' )
					value	=  '/' + value ;

				if  ( value [ value. length - 1 ]  !=  '/' )
					value	+=  '/' ;
			    }

			return ( set_value ( this, 'directory', value ) ) ;
		    }


		// host -
		//	Gets/sets the host part for this uri.
		prototype. host	=  function  ( value )
		   {
			return ( set_value ( this, 'host', value ) ) ;
		    }


		// href -
		//	Gets/sets the complete uri. 
		//	When used as get(), returns the uri without the parameters declared as local, unless
		//	$.uri references the same page, in which case the returned uri will include local
		//	parameters.
		prototype. href		=  function ( href )
		   {
			if (  href  !==  undefined )
			   {
				parse ( this, href ) ;

				return ( this ) ;
			    }
			else
			   {
				if  ( this. __components. locals. length )
					return ( this. __components. href ) ;
				else
					return ( this. __components. hrefLocal ) ;
			    }
		    }

		// hrefLocal -
		//	Returns the complete uri, without the parameters declared as local.
		prototype. hrefLocal	=  function ( )
		   {
			return ( this. __components. hrefLocal ) ;
		    }


		// hrefGlobal -
		//	Returns the complete uri, including the parameters declared as local.
		prototype. hrefGlobal	=  function  ( )
		   {
			return ( this. __components. href ) ;
		    }


		// locals -
		//	Gets/sets the query parameters that are local to this page.
		prototype. locals	=  function  ( value )
		   {
			if  ( typeof ( value )  ==  'object' )		// Check for array argument
			   {
				if  ( ! value. length )			// Object given : what the hell could we do with that ?
					value	=  [] ;
			    }
			else						// Scalar value
				value	=  [ value. toString ( ) ] ;

			return ( set_value ( this, 'locals', value ) ) ;
		    }


		// page -
		//	Gets/sets the page part for this uri.
		prototype. page	=  function  ( value )
		   {
			return ( set_value ( this, 'page', value ) ) ;
		    }


		// Parameter access
		prototype. parameters	= function ( )
		   {
			if  ( arguments. length  >  0 )
			   {
				var	funcname	=  arguments [0] ;
				var	argv		=  Array. prototype. slice. call ( arguments, 1 ) ;

				if  ( this. __parameters_api [ funcname ] )
				   {
					var	result		=  this. __parameters_api [ funcname ]. apply ( funcname, argv ) ;

					return ( result ) ;
				    }
				else
					return ( undefined ) ;
			    }
			else
			   {
				var	params	=  $. extend ( this. __parameters_api, { parameters : this. __parameters } ) ;

				return ( params ) ;
			    }
		    }


		// password -
		//	Gets/sets the password part for this uri.
		prototype. password	=  function  ( value )
		   {
			return ( set_value ( this, 'password', value ) ) ;
		    }


		// path -
		//	Sets the path after the url (directory + page).
		//	Note that if the path does not ends with a slash, the last element of this path will be
		//	considered as a page name.
		prototype. path		=  function  ( new_path )
		   {
			if  ( new_path  !==  undefined )
			   {
				var	last_slash	=  new_path. lastIndexOf ( '/' ) ;

				if  ( last_slash  >  0 )
				   {
					this. directory ( new_path. substring ( 0, last_slash + 1 ) ) ;
					this. page ( new_path. substring ( last_slash + 1 ) ) ;
				    }
				else
				   {
					this. directory	( undefined ) ;
					this. page ( new_path ) ;
				    }

				rebuild_computed_fields ( this ) ;
			    }


			var  result	=  '' ;

			if  ( this. __components. directory  !==  undefined )
				result	+=  this. __components. directory ;

			if  ( this. __components. page  !==  undefined )
				result	+=  this. __components. page ;

			return ( result ) ;
		    }


		// port -
		//	Gets/sets the protocol part for this uri.
		prototype. protocol	=  function  ( value )
		   {
			return ( set_value ( this, 'protocol', value ) ) ;
		    }


		// query -
		//	Gets/ sets the query part of the uri.
		prototype. query	=  function ( query )
		   {
			if (  query )
				parse_query ( this, query ) ;

			rebuild_computed_fields ( this ) ;

			return  ( this. __components. query ) ;
		    }


		// samePath -
		//	Checks if this object has the same path after the domain part as the specified one.
		//	To understand the comparison performed, consider the following urls :
		//		(1) www.example.com
		//		(2) www.example.com/
		//	In example (1), the directory(), page() and path() methods will return undefined.
		//	In example (2) however, directory() and path() will return "/" (page() will still be
		//	undefined).
		//	samePath() allows to consider urls (1) and (2) and the same during the comparison,
		//	and returns true if they are equal.
		prototype. samePath	=  function  ( other, use_host )
		   {
			if  ( ! use_host  ||  this. __components. host  ==  other. components. host )
			   {
				if  ( this. __components. path  ==  undefined  ||  this. __components. path  ==  '/' )
				   {
					return ( other. __components. path  ==  undefined  ||  other. __components. path  ==  '/' )  ;
				    }
				else
					return  ( this. __components. path  ==  other. __components. path ) ;
			    }
			else
				return ( false ) ;
		    }


		// user -
		//	Gets/sets the user part for this uri.
		prototype. user	=  function  ( value, password )
		   {
			return ( set_value ( this, 'user', value ) ) ;
		    }


		// toString -
		//	Returns the string represnetation of the complete uri. If modifications have occurred on individual properties
		//	then the full uri string is rebuilt before returning any value.
		prototype. toString	=  function ( )
		   {
			return ( this. __components. hrefLocal ) ;
		    }


		// Return a new uri object
		return ( new  uri ( href ) ) ;
	    }

	// Create a window. url property corresponding to the current page's url
	window. url	=  $. uri ( window. location. href ) ;
     }) ( jQuery ) ;


