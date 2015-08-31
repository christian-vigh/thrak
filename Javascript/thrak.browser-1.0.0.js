/**************************************************************************************************************

    NAME
        thrak.browser-1.0.0.js

    DESCRIPTION
        A jQuery plugin that tries to unify the navigator properties among various browsers.

    PROPERTIES
	The following properties are available through $.browser :

	agent -
		User agent string.

	applicationVersion -
		A structure describing the browser application version and containing the following properties :
		. codeName	:  Application code name.
		. name		:  Application name.
		. major		:  Application major version number.
		. minor		:  Application minor version number. 
		Casting this structure to a string will result in "major.minor".
		
	chrome, safari, firefox, opera, ie, webkit, unknown -
		A boolean value which is true when the associated browser has been identified.
		Note that I don't know so far what to do ith the 'ebkit' property.
		If the browser could not be identified, the 'unknown' property will be set to true.	

	cookiesEnabled -
		True if cookies are enabled in the browser.

	displayName -
		User-friendly browser display name.

	doNotTrack -
		True if "do no track" settings are enabled on this browser.

	javaEnabled -
		True if the Java runtime is enabled on this browser.

	language -
		A structure containing the following properties that specifies the browser's language :
		. language	: language code, such as "fr", "en", etc.
		. variant	: Country variant. For the "en" language, for example, it could be "US",
				  "CA", etc. This field may be undefined.
		This structure can be casted to a string, to obtain something like, for example, "fr-FR".

	name -
		Browser name, as supplied from the user agent string.

	online -
		A boolean indicating whether browing is online or not.

	platform -
		A structure describing the browser's platform :
		. os		:  Os version.
		. cpu		:  CPU type.
		Note that these information are rarely specified by browsers.
		This structure can be casted to a string, which will result in : "os / version".

	product -
		A structure describing the product :
		. name		:  Product name.
		. build		:  Product build.
		. buildId	:  Product build id.
		This structure can be casted to a string which will result in the product name.

	taintEnabled -
		To be documented.

	vendor -
		A structure describing vendor information :
		. name		:  Vendor name.
		. build		:  Vendor's application build number. May be largely undefined in IE.
		This structure can be casted to a string, which will result in : "name / build".

	version -
		A structure containing the following properties, identifying the browser's version :
		. major
		. minor
		. revision
		. build
		Note that the 'revision' and 'build' properties may not be specified by all browsers.
		This structure can be casted to a version string, for example :

			alert ( "Version : " + $. browser. version ) ;

    METHODS -
	$.browser.showBrowserInformation ( ) -
		Opens a dialog box showing your current browser's information.

	$.browser.prop ( name )  or  $.browser. val ( name ) -
		Retrieves a browser's property, whose name is given as a string. 
		The following properties can be retrieved :

		. scrollbarWidth -
			Width, in pixels, of a vertical scrollbar.

		. scrollbarHeight -
			Height, in pixels, of a horizontal scrollbar.

    AUTHOR
        Christian Vigh, 11/2013.

    HISTORY
    [Version : 1.0]    [Date : 2013/11/27]     [Author : CV]
        Initial version.

    [Version : 1.0.1]  [Date : 2013/12/06]     [Author : CV]
        Added the prop() and val() functions to $.browser, along with the 'scrollbarWidth' and 'scrollbarHeight'
	properties.

 **************************************************************************************************************/

 ( function ( $ )
   {
	$. browser	=  
	   {
		prop	:  function  ( propname )
		   {
			return ( getProperty ( propname )  ) ;
		    },
		val	: function  ( propname )
		   {
			return ( getProperty ( propname )  ) ;
		    }
	    } ;

	getBrowserCharacteristics ( ) ;


	// getBrowserCharacteristics -
	//	Tries to provide a unified way to access browser characteristics.
	function  getBrowserCharacteristics ( )
	   {
		// Determine browser name
		var	agent	=  navigator. userAgent ;
		var	match ;
		var	version ;

		// Initialize browser name variables
		$. browser. agent	=  agent ;
		$. browser. chrome	=  false ;
		$. browser. safari	=  false ;
		$. browser. firefox	=  false ;
		$. browser. opera	=  false ;
		$. browser. ie		=  false ;
		$. browser. webkit	=  false ;
		$. browser. unknown	=  false ;

		
		// Try Chrome first
		if  ( ( match = /chrome[ \/]([\w.]+)/i. exec ( agent ) )  !==  null )
		   {
			$. browser. name	=  "chrome" ;
			$. browser. displayName	=  "Chrome" ;
			version			=  match [1] ;
			$. browser. chrome	=  true ;
		    }
		// Opera
		else if  ( ( match = /(opera|OPR)[ \/]([\w.]+)/i. exec ( agent ) )  !==  null )
		   {
			$. browser. name	=  "opera" ;
			$. browser. displayName	=  "Opera" ;
			version			=  match [1] ;
			$. browser. opera	=  true ;
		    }
		// Firefox
		else if  ( ( match = /(firefox)[ \/]([\w.]+)/i. exec ( agent ) )  !==  null )
		   {
			$. browser. name	=  "firefox" ;
			$. browser. displayName	=  "Mozilla Firefox" ;
			version			=  match [1] ;
			$. browser. firefox	=  true ;
		    }
		// Safari
		else if  ( ( match = /(version)[ \/]([\w.]+)\s+Safari/i. exec ( agent ) )  !==  null )
		   {
			$. browser. name	=  "safari" ;
			$. browser. displayName	=  "Safari" ;
			version			=  match [1] ;
			$. browser. safari	=  true ;
		    }
		// Webkit
		else if  ( ( match = /(webkit)[ \/]([\w.]+)/i. exec ( agent ) )  !==  null )
		   {
			$. browser. name	=  "webkit" ;
			$. browser. displayName	=  "Webkit" ;
			version			=  match [1] ;
			$. browser. webkit	=  true ;
		    }
		// MSIE from 6 to 10
		else if  ( ( match = /MSIE ([\w.]+)/i. exec ( agent ) )  !==  null )
		   {
			$. browser. name	=  "ie" ;
			$. browser. displayName	=  "Microsoft Internet Explorer" ;
			version			=  match [1] ;

			// IE9 and IE10 have the same userAgent string, except that IE10 has also Trident/7.0 instead of Trident/5.0
			if  ( version [0]  ==  '9' )
			   {
				if  ( /Trident[\/:]7/i. exec ( agent )  !==  null )
					version	=  "10.0" ;
			    }

			$. browser. ie		=  true ;
		    }
		// MSIE 11 : the "MSIE" string is replaced with "rv:"
		else if  ( ( match = /rv:([\w.]+)/i. exec ( agent ) )  !==  null )
		   {
			$. browser. name	=  "ie" ;
			$. browser. displayName	=  "Microsoft Internet Explorer" ;
			version			=  match [1] ;
			$. browser. ie		=  true ;
		    }
		// Other cases : we made our best possible....
		else
		   {
			$. browser. name	=  "unknown" ;

			if  ( navigator. appName )
				$. browser. displayName	=  navigator. appName ;
			else if  ( navigator. appCodeName )
				$. browser. displayName =  navigator. appCodeName ;
			else
				$. browser. displayName =  "unknown" ;
				
			version			=  "unknown" ;
			$. browser. unknown	=  true ;
		    }

		// Build the version object
		var	version_items	=  version. split( /[.]/ ) ;

		for  ( var  i = version_items. length ; i < 4 ; i ++ )
			version_items [i] = undefined ;

		var	version_structure	=
		   {
			major		:  version_items [0],
			minor		:  version_items [1],
			revision	:  version_items [2],
			build		:  version_items [3],
			toString	:  function ( )
			   {
				var		version		=  this. major ;

				if  ( this. minor  !==  undefined )
				   {
					version		+=  '.' + this. minor ;

					if  ( this. revision  !==  undefined )
					   {
						version  +=  '.' + this. revision ;

						if  ( this. build  !==  undefined )
							version  +=  '.' + this. build ;
					    }
				    }

				return ( version ) ;
			    }
		    }

		$. browser. version	=  version_structure ;

		// Online property
		$. browser. online	=  navigator. onLine ;
		
		// Browser language : determine which property can be obtained from the navigator object
		var	language	=  undefined ;
		
		if  ( $. browser. chrome  ===  true )
		   {
			language	=  navigator. language ;					// No country variant
		    }
		else if  ( $. browser. ie  ===  true )
		   {
			switch  ( $. browser. version. major )
			   {
				case	11 :  language	=  navigator. language ;	break ;		// Includes country variant 
				case	10 :  language  =  navigator. userLanguage ;	break ;		// Includes country variant
				case	 9 :  language	=  navigator. userLanguage ;	break ;		// Includes country variant (to be checked)
				case	 8 :  language  =  navigator. userLanguage ;	break ;		// No country variant
				case	 7 :  language  =  navigator. userLanguage ;	break ;		// No country variant
				case	 6 :  language  =  navigator. userLanguage ;	break ;		// No country variant
				default    :
					if  ( navigator. userLanguage )
						language	=  navigator. userLanguage ;
			    }
		    }
		else if  ( $. browser. firefox  ===  true )
		   {
			language	=  navigator. language ;					// No country variant
		    }
		else if  ( $. browser. safari  ===  true )
		   {
			language	=  navigator. language ;					// Includes country variant
		    }
		else if  ( $. browser. opera  ===  true )
		   {
			language	=  navigator. language ;					// No country variant
		    }
		
		// Structure to be included into $.browser
		var	language_elements	=
		   {
			language		:  undefined,
			variant			:  undefined,
			toString		:  function ( )
			   {
				if  ( this. language  ===  undefined )
					return ( "" ) ;
					
				return ( this. language + "-" + this. variant ) ;
			    }
		    } ;
		
		// If some language string could be obtained from the navigator object...
		if  ( language  !==  undefined )
		   {
			// ... then tries to identify if it includes a country variant
			var	items		=  language. split ( /-/ ) ;
			var	item1		=  undefined, 
				item2		=  undefined ;
			
			switch  ( items. length )
			   {
				// No country variant : try to deduce a default one
				case	1 :
					item1	=  items [0]. toLowerCase ( ) ;
					
					switch  ( item1 )
					   {
						case	"en"	:  item2	=  "US" ; break ;
						default		:  item2	=  item1. toUpperCase ( ) ;
					    }
					break ;
					
				// Easier job : a country variant is specified
				case	2 :
					item1	=  items [0]. toLowerCase ( ) ;
					item2	=  items [1]. toUpperCase ( ) ;
			    }
			
			// Save the results 
			language_elements. language		=  item1 ;
			language_elements. variant		=  item2 ;
			
			$. browser. language	=  language_elements ;
		    }
		    
		// Application version information. Since none of the browsers implement an appMajorVersion, we will take it
		// from the user agent string which usually starts with : "Mozilla/5.0"
		var	application_version	=
		    {
			codeName		:  navigator. appCodeName,
			name			:  navigator. appName,
			major			:  undefined,
			minor			:  undefined,
			toString		:  function  ( )
			   {
				if  ( this. major  !==  undefined )
					return  ( this. major + "." + this. minor ) ;
				else
					return  ( undefined ) ;
			    }
		     }
		     
		// Get the application version
		var	match	=  $. browser. agent. match ( /^\w+\/([\w.]+)/ ) ;
		
		// If a match has been found in the user agent string, then try to extract the version number right after the "Mozilla/" string
		if  ( match  !==  null )
		   {
			var	items	=  match [1]. split ( /[.]/ ) ;
			var	item1	=  undefined,
				item2	=  undefined ;
				
			switch  ( items. length )
			   {
				// Paranoïa : maybe there will be no minor version number ?
				case	1 : 
					item1	=  items [0] ;
					item2	=  "0" ;
					break ;
					
				// Default case : there are both a major and minor version number
				case	2 :
					item1	=  items [0] ;
					item2	=  items [1] ;
					break ;
			    }
			    
			// Save the data
			application_version. major	=  item1 ;
			application_version. minor	=  item2 ;
			
			$. browser. applicationVersion	=  application_version ;
		    }
		    
		// Platform
		var	platform	=
		   {
			os		:  undefined,
			cpu		:  undefined,
			toString	:  function ( )
			   {
				return ( '' + this. os + '/' + this. cpu ) ;
			    }
		    } ;
		    
		if  ( $. browser. ie )
		   {
			platform. os	=  navigator. platform ;
			platform. cpu	=  navigator. cpuClass ;
		    }
		else if  ( $. browser. firefox )
		   {
			platform. os	=  navigator. platform ;
			platform. cpu	=  navigator. oscpu ;
		    }
		else
		   {
			platform. os	=  navigator. platform ;
		    }
		    
		$. browser. platform	=  platform ;
		
		// Vendor information
		var	vendor		=
		   {
			name		:  undefined,
			build		:  undefined,
			toString	:  function ( )
			   {
				return ( '' + this. name + '/' + this. build ) ;
			    }
		    } ;
		
		if  ( $. browser. ie )
		   {
			vendor. name	=  navigator. vendor ||  "Microsoft Corporation" ;
		    }
		else
		   {
			vendor. name	=  navigator. name ;
			vendor. build	=  navigator. vendorSub ;
		    }
		    
		$. browser. vendor	=  vendor ;
		
		// Product information
		var	product		=
		   {
			name		:  navigator. product,
			build		:  navigator. productSub,
			buildId		:  navigator. buildId,
			toString	:  function ( ) 
			   {
				return ( this. name ) ;
			    }
		    } ;
		    
		$. browser. product	=  product ;
	    
		// Cookies enabled flag
		if  ( navigator. cookieEnabled )
			$. browser. cookiesEnabled	=  navigator. cookieEnabled ;
		else	// Assume false by default
			$. browser. cookiesEnabled	=  false ;
		
		// "Do not track" flag
		var	doNotTrack		=  undefined ;
		
		if  ( navigator. msDoNotTrack  !==  undefined )
			doNotTrack	=  ( navigator. msDoNotTrack ) ?  true : false ;
		else if  ( navigator. doNotTrack  !==  undefined  &&  
			   navigator. doNotTrack  !==  null       &&		// Chrome and Opera
			   navigator. doNotTrack  !==  'unspecified' )		// Firefox
			doNotTrack	=  ( navigator. doNotTrack ) ?  true : false ;
		else
			doNotTrack	=  ( navigator. doNotTrack  !==  0 ) ?  true : false ;
		    
		$. browser. doNotTrack		=  doNotTrack ;
		
		// javaEnabled
		var  javaEnabled ;

		if   ( navigator. javaEnabled  ===  undefined )
		    {
			javaEnabled	=  function  ( )
			   {
				return ( undefined ) ;
			    }
		    }
		else
		    {
			javaEnabled	=  function  ( )
			   {
				return ( navigator. javaEnabled ( ) ) ;
			    }
		    }
			
		$. browser. javaEnabled		=  javaEnabled ;
		
		// taintEnabled
		var  taintEnabled ;

		if   ( navigator. taintEnabled  ===  undefined )
		    {
			taintEnabled	=  function  ( )
			   {
				return ( undefined ) ;
			    }
		    }
		else
		    {
			taintEnabled	=  function  ( )
			   {
				return ( navigator. taintEnabled ( ) ) ;
			    }
		    }
			
		$. browser. taintEnabled		=  taintEnabled ;


		// showBrowserInformation -
		//	Displays information about the current browser.
		$. browser. showBrowserInformation	=  function ( callback )
		   {
			if  ( $('#browser-information') [0]  ===  undefined )
			   {
				var	browser_dialog	=  "<div id='browser-information'>" +
							   "	<table cellpadding='0' cellspacing='0' border='0' id='browser-information-table'>" +
							   "    <thead>" +
							   "		<tr>" +
							   "			<th title='Sort by element name'>Element</th>" +
							   "			<th title='Sort by variable name'>Variable</th>" +
							   "			<th title='Sort by value'>Value</th>" +
							   "		</tr>" +
							   "    </thead>" +
							   "    <tbody>" +
							   "		<tr class='browser-information' title='The agent property returns the value " +
							   "			of the user-agent header sent by the browser to the server." +
							   "			The value returned contains information about the name, version and " +
							   "			platform of the browser.'>" +
							   "			<td>" +
							   "				Agent String" + 
							   "			</td>" +
							   "			<td>" +
							   "				$.browser.agent" + 
							   "			</td>" +
							   "			<td>" +
											$. browser. agent +
							   "			</td>" +
							   "		</tr>" +
							   "		<tr class='browser-information' title='Returns the code name of the browser.'>" +
							   "			<td>" +
							   "				Application code name" + 
							   "			</td>" +
							   "			<td>" +
							   "				$.browser.applicationVersion.codeName" + 
							   "			</td>" +
							   "			<td>" +
											$. browser. applicationVersion. codeName +
							   "			</td>" +
							   "		</tr>" +
							   "		<tr class='browser-information' title='Returns the name of the browser.'>" +
							   "			<td>" +
							   "				Application name" + 
							   "			</td>" +
							   "			<td>" +
							   "				$.browser.applicationVersion. name" + 
							   "			</td>" +
							   "			<td>" +
											$. browser. applicationVersion. name +
							   "			</td>" +
							   "		</tr>" +
							   "		<tr class='browser-information' title='Returns the version of the browser. " +
													"Note that the $. browser. applicationVersion object also includes a \"major\" and " +
													"\"minor\" properties.'>" +
							   "			<td>" +
							   "				Application version" + 
							   "			</td>" +
							   "			<td>" +
							   "				$.browser.applicationVersion" + 
							   "			</td>" +
							   "			<td>" +
											$. browser. applicationVersion +
							   "			</td>" +
							   "		</tr>" +
							   "		<tr class='browser-information' title=\"The browser 'displayName' property returns the browser's full name" +
														", such as 'Chrome' or 'Microsoft Internet Explorer'.\">" +
							   "			<td>" +
							   "				Browser" + 
							   "			</td>" +
							   "			<td>" +
							   "				$.browser.displayName" + 
							   "			</td>" +
							   "			<td>" +
											$. browser. displayName +
							   "			</td>" +
							   "		</tr>" +
							   "		<tr class='browser-information' title=\"Short browser code, such as 'chrome', 'opera', 'ie', etc. " +
														"Note that a boolean of the same name is defined in $.browser for each possible supported browser.\">" +
							   "			<td>" +
							   "				Browser code" + 
							   "			</td>" +
							   "			<td>" +
							   "				$.browser.name" + 
							   "			</td>" +
							   "			<td>" +
											$. browser. name +
							   "			</td>" +
							   "		</tr>" +
							   "		<tr class='browser-information' title=\"Indicates whether cookies are enabled by the browser or not.\">" +
							   "			<td>" +
							   "				Cookies enabled" + 
							   "			</td>" +
							   "			<td>" +
							   "				$.browser.cookiesEnabled" + 
							   "			</td>" +
							   "			<td>" +
											$. browser. cookiesEnabled +
							   "			</td>" +
							   "		</tr>" +
							   "		<tr class='browser-information' title=\"Indicates whether java is enabled.\">" +
							   "			<td>" +
							   "				Java enabled" + 
							   "			</td>" +
							   "			<td>" +
							   "				$.browser.javaEnabled()" + 
							   "			</td>" +
							   "			<td>" +
											$. browser. javaEnabled ( ) +
							   "			</td>" +
							   "		</tr>" +
							   "		<tr class='browser-information' title=\"Browser language (client-side). " +
														"Note that the $.browser.language structure also defines the 'language' and 'countryVariant' members.\">" +
							   "			<td>" +
							   "				Language" + 
							   "			</td>" +
							   "			<td>" +
							   "				$.browser.language" + 
							   "			</td>" +
							   "			<td>" +
											$. browser. language +
							   "			</td>" +
							   "		</tr>" +
							   "		<tr class='browser-information' title='True if the browser is connected online, false if it remains local.'>" +
							   "			<td>" +
							   "				Online" + 
							   "			</td>" +
							   "			<td>" +
							   "				$.browser.online" + 
							   "			</td>" +
							   "			<td>" +
											$. browser. online +
							   "			</td>" +
							   "		</tr>" +
							   "		<tr class='browser-information' title='Client platform information. May be highly inaccurate. Note that the $. browser. platform " +
														"object also contains the os and cpu members.'>" +
							   "			<td>" +
							   "				Platform" + 
							   "			</td>" +
							   "			<td>" +
							   "				$.browser.platform" + 
							   "			</td>" +
							   "			<td>" +
											$. browser. platform +
							   "			</td>" +
							   "		</tr>" +
							   "		<tr class='browser-information' title='Product information. Note that the $. browser. platform " +
														"object also contains the name, build and buildId members.'>" +
							   "			<td>" +
							   "				Product information" + 
							   "			</td>" +
							   "			<td>" +
							   "				$.browser.product" + 
							   "			</td>" +
							   "			<td>" +
											$. browser. product +
							   "			</td>" +
							   "		</tr>" +
							   "		<tr class='browser-information' title=\"Indicates whether data tainting is enabled in the browser.\">" +
							   "			<td>" +
							   "				Taint enabled" + 
							   "			</td>" +
							   "			<td>" +
							   "				$.browser.taintEnabled()" + 
							   "			</td>" +
							   "			<td>" +
											$. browser. taintEnabled ( ) +
							   "			</td>" +
							   "		</tr>" +
							   "		<tr class='browser-information' title='Returns the user do-not-track setting. This is \"true\" if the user " +
														"has requested not to be tracked by web sites, content, or advertising...'>" +
							   "			<td>" +
							   "				Tracking option" + 
							   "			</td>" +
							   "			<td>" +
							   "				$.browser.doNotTrack" + 
							   "			</td>" +
							   "			<td>" +
											$. browser. doNotTrack +
							   "			</td>" +
							   "		</tr>" +
							   "		<tr class='browser-information' title='Vendor information. May be highly inaccurate. Note that the $. browser. platform " +
														"object also contains the name and build members.'>" +
							   "			<td>" +
							   "				Vendor information" + 
							   "			</td>" +
							   "			<td>" +
							   "				$.browser.vendor" + 
							   "			</td>" +
							   "			<td>" +
											$. browser. vendor +
							   "			</td>" +
							   "		</tr>" +
							   "		<tr class='browser-information' title='Browser version. Always include a major and minor " +
														"version number, but not necessarily a revision and build number. " +
														"The $.browser.version object also contains the major, minor, revision and build numbers.'>" +
							   "			<td>" +
							   "				Version" + 
							   "			</td>" +
							   "			<td>" +
							   "				$.browser.version" + 
							   "			</td>" +
							   "			<td>" +
											$. browser. version +
							   "			</td>" +
							   "		</tr>" +
							   "	   </tbody>" +
							   "	</table>" ;

				// Append this dialog to the DOM if not already done
				if  ( $('#browser-information') [0]  ===  undefined )
					$('body'). append ( browser_dialog ) ; 

				// Every field is sortable
				$('#browser-information-table'). tablesorter ( ) ;

				// Tooltips
				$('#browser-information'). tooltip ({ html: true }) ;
				$('#browser-information'). tooltip ( 'option', 'tooltipClass',  'tooltip' ) ;
		
				// pen the browser properties dialog
				$('#browser-information'). dialog
				   ({
					autoOpen	:  false,
					width		:  "auto",
					height		:  "auto",
					resizable	:  false,
					title		:  "Your browser properties",
					open		:  function ( )
					   {
					    },
					close		:  function ( )
					   {
						callback  &&  callback ( ) ;
					    },
					buttons		:  
					   [
						{
							text		:  "Ok",
							"default"	:  true,
							click		:  function  ( )
							   {
								$(this). dialog ( 'close' ) ;
							    }
						 }
					    ]
				     }). dialog ( 'open' ) ;
			    }
		    }


		return ( this ) ;
	    }


	// cancelEvent -
	//	Cancels an event.
	$. browser. cancelEvent		=  function ( e )
	   {
		e	=  e  ||  event ;

		if  ( e )
		   {
			e. cancelBubble		=  true ;
			e. preventDefault   &&  e. preventDefault ( ) ;
			e. stopPropagation  &&  e. stopPropagation ( ) ;
		    }
	    }


	// getProperty -
	//	Returns the value of a property.
	function	getProperty ( propname )
	   {

		if  ( propname   !==  undefined )
			return ( properties [ propname ]  &&  properties [ propname ] ( ) ) ;
		else
			throw ( "Invalid argument type for the $.browser.prop() function." ) ;
	    }


	// Browser object properties 
	var	properties	=
	   {
		// Browser scrollbar width
		scrollbarWidth		:  function ( )
		   {
			var	outer	=  document. createElement ( 'div' ) ;
			var	inner	=  document. createElement ( 'p' ) ;

			inner. style. width		=  "100%" ;
			inner. style. height		=  "200px" ;
			
			outer. style. position		=  "absolute" ;
			outer. style. top		=  "0px" ;
			outer. style. left		=  "0px" ;
			outer. style. visibility	=  "hidden" ;
			outer. style. width		=  "200px" ;
			outer. style. height		=  "150px" ;
			outer. style. overflow		=  "hidden" ;

			outer. appendChild ( inner ) ;

			document. body. appendChild ( outer ) ;

			var	width_before		=  inner. offsetWidth, 
				width_after ;

			outer. style. overflow		=  'scroll' ;
			width_after			=  inner. offsetWidth ;

			if   ( width_before  ===  width_after )
				width_after	=  outer. clientWidth ;
				
			document. body. removeChild ( outer ) ;
			return ( width_before - width_after ) ;
		    },
		// Browser scrollbar height
		scrollbarHeight		:  function ( )
		   {
			var	outer	=  document. createElement ( 'div' ) ;
			var	inner	=  document. createElement ( 'p' ) ;

			inner. style. height		=  "200px" ;
			
			outer. style. position		=  "absolute" ;
			outer. style. top		=  "0px" ;
			outer. style. left		=  "0px" ;
			outer. style. visibility	=  "hidden" ;
			outer. style. width		=  "200px" ;
			outer. style. height		=  "200px" ;
			outer. style. overflow		=  "hidden" ;

			outer. appendChild ( inner ) ;

			document. body. appendChild ( outer ) ;

			var	height_before		=  inner. offsetHeight, 
				height_after ;

			outer. style. overflow		=  'scroll' ;
			height_after			=  inner. offsetHeight ;

			if   ( height_before  ===  height_after )
				height_after	=  outer. clientHeight ;
				
			document. body. removeChild ( outer ) ;
			return ( height_before - height_after ) ;
		    }

	    }
  
    } ( jQuery ) ) ;
    
