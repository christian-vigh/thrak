# INTRODUCTION #

The *ScreenshotLayer* class encapsulates the *ScreenshotLayer* api from ApiLayer.

Using the *ScreenShotLayer* object is pretty simple. Just instantiate an object, define the required properties, and call one of the ScreenshotLayer public methods ; the following example will capture a screenshot from http://www.google.com and return the image contents in the *$capture* variable (if an error occurs, an *ApiLayerException* exception will be thrown) :

	require ( 'ScreenshotLayer.php' ) ;
	
	// Specify the access key defined in your screenshot layer dashboard
	$my_access_key 	=  '123456.....' ; 		

	// Instantiate the screenshotlayer object using your access key
	$screenshot		=  new ScreenshotLayer ( $my_access_key ) ;

	// Capture an image of the specified url
	$capture		=  $screenshot -> CapturePage ( "http://www.google.com" ) ;
	
	// Save image contents
	file_put_contents ( 'google.png', $capture ) ;

The *CapturePage()* method will use either the specified url, or the one specified in the *Url* property so you could rewrite this as :

	$screenshot -> Url 	=  'http://www.google.com' ;
	$capture			=  $screenshot -> CapturePage ( ) ;

Captured pages are cached as much as possible to minimize useless http requests ; however, you may want a new capture to be generated for the same url. In this case, use the *Force* property for that :

	$screenshot -> Force 	=  true ;
	$capture			=  $screenshot -> CapturePage ( "http://www.google.com" ) ;

The *ScreenshotLayer* API allows you to specify a secret key that you can define and activate in your dashboard ;	Once activated, it must be specified in all your API requests (the *secret_key* API parameter is then the md5 hash of the requested url catenated with your dashboard's secret key).

The *ScreenshotLayer* class relieves you from having to calculate this final secret key and automatically generate it for you before issuing the API query ; simply specify in the class constructor the value of your dashboard's secret key as in the following example :

	$my_secret_key = '....' ;
	$screenshot 	=  new ScreenshotLayer ( $my_access_key, $my_secret_key ) ;

and the *ScreenshotLayer* class will handle all the details for you.

# USEFUL LINKS #

You can find the documentation on the ScreenshotLayer API from ApiLayers here :

[https://screenshotlayer.com/documentation](https://screenshotlayer.com/documentation)

Once you have successfully created a new account using your email address and a password, you will be able to see your dashboard information here :

[https://screenshotlayer.com/dashboard](https://screenshotlayer.com/dashboard)

You will be able to the specify an access key different from the default one, or specify and activate a secret keyword.

# SCREENSHOTLAYER CLASS CONSTRUCTOR #

The *ScreenshotLayer* class constructor has the following syntax :

	$screenshot 	=  new ScreenshotLayer ( $access_key, $secret_key = null, $use_https = false ) ;

The parameters are the following :

- **access_key** : the access key defined in your dashboard. This parameter is required.
- **secret_key** : the optional secret keyword you may have defined and activated in your dashboard. Note that no error will be reported if your dashboard does not contain a secret keyword but you specify a secret key in the class constructor. This is useful if you want to test the API with and without a secret keyword activated in your dashboard, because you won't have to change your code
- **use_https** : set this parameter to true if you want to use secure http request (https). 

# SCREENSHOTLAYER CLASS PROPERTIES #

In addition to the standard properties exposed by the base *ApiLayer* class, the following properties are available and mimic their counterpart in the *screenshotlayer* api ; have a look at the official documentation on [https://screenshotlayer.com/documentation](https://screenshotlayer.com/documentation).

Note that many properties have aliases.

## accept\_lang or accept\_language or AcceptLanguage (string) ##

Specifies a custom Accept-Language HTTP header to send with your request. For example :	'fr', 'en', 'en-US', etc.


## AccessKey (string) ##

Specifies the access key attributed by the Apilayers site and available in your dashboard.

## Capture (binary) ##

Contains the last captured page (in PNG, JPEG or GIF format, depending on the initial *Format* property value).

## css_url or CssUrl (string) ##

Attaches an URL containing a custom CSS stylesheet.

## delay or Delay (integer) ##

Specifies a delay in seconds before a screenshot is considered to be captured.

## export or ExportTo (string) ##

Exports the snapshot via a custom ftp path or using your AWS S3 user details.

You need to have at least a professional subscription to be able to use this feature.

Currently, only FTP access has been tested using the *ScreenshotLayer* class (this is because I do not have an Amazon S3 account).

Note that the exported file(s) can take up to one minute to be uploaded. 

Currently, the ftp address allows for specifying user and password, but not a port number. This issue will be fixed in a future version of the ScreenshotLayer API.

## force or Force (boolean of the form zero or one) ##

Set to "1" (or true) if you want the capture to be reloaded.
	
## format or Format (keyword) ##

Specifies capture image format : "png" (default), "gif" or "jpg"/"jpe"/"jpeg".

You can use any of the class contants FORMAT\_PNG, FORMAT\_JPEG or FORMAT\_GIF here.

## fullpage or FullPage (boolean of the form zero or one) ##

Set to "1" (or true) if you want to capture the full height of the target website.

## placeholder or PlaceHolder ("1" or url) ##
		
Attaches an URL containing a custom placeholder image or set to "1" to use the default placeholder.

## secret_key or SecretKey (string) ##
If you have activated your secret key in the screenshotlayer api, then you will have to
set the SecretPassword property to that key.

The SecretKey readonly property will return your own secret key for the given url,
which is the md5 hash of the requested url catenated with your secret key.

## ttl or Ttl (integer) ##

Defines the time (in seconds) your snapshot should be cached. The default (and maximum value) is 2592000 (30 days).

You can set the *Force* property to true if you want to bypass caching.

## UseHttps (boolean) ##

Set to true if you want access through secure http. The default is false (use regular
http protocol).

Note that no provision is currently made for supporting SSL certificates.

## url or Url (string) ##

Url of the web page to be captured.

## user_agent or UserAgent (string) ##

Specifies a custom User-Agent HTTP header to send with your request.

You can use one of the ScreenshotLayer::USER_AGENT_* strings for that, or use your own
user agent string.

## viewport or Viewport (string) ##

Specifies preferred viewport dimensions in pixels (default : 1440x900).

## width or Width (integer) ##

Specifies preferred screenshot width.

# SCREENSHOTLAYER CLASS METHODS #

## public function CapturePage ( $url = false ) ##

Captures an url and returns binary image data in the format specified by the *Format* property.

If no url is specified, the contents of the *Url* property will be used.

## public function  CapturePages ( $url\_list, $output\_directory, $prefix = 'capture.' ) ##

Captures a set of urls specified in the *$url_list* array and saves them in the specified *$output\_directory* directory.

Filenames are generated using the specified *$prefix* prefix, followed by a sequential number and the file extension corresponding to the image format defined by the *Format* property.

Existing files with the same name will be overwritten.

Note that the ApiLayer Screenshot API does not provide any means of performing batch captures ; this is just a feature of the *ScreenshotLayer* class, and should be used with care since it does not guarantee faster captures.

However, this allows you to perform a batch capture using the same parameters for all captures.

## public function  DownloadPage  ( $url = false, $filename = false ) ##

This method can be used to force the download of a captured url.

The *$filename* parameter, when specified, indicates the filename to be downloaded. The default is built from the url domain name with file path. Dots and slashes will be replaced with underlines.

## public function  ExportCapture ( $url = false, $export\_url = false ) ##

Exports a capture to an FTP site or an Amazon S3 account. You need a professional subscription level to use this feature.

If the *$url* parameter is not specified, the contents of the *Url* property will be used.

If the *$export\_url* parameter is not specified, the contents of the *ExportTo* property will be used.

The method returns the name of the generated file, which is a GUID generated by the apilayer api and containing the extension corresponding to the chosen image format.

Note that there is currently no way in the ApiLayer screenshot api to specify an output filename (this will be fixed in future releases). 

## public function  ExportCaptures ( $url\_list, $export\_url ) ##

Captures a set of urls specified in the *$url_list* array and exports them to an FTP server of Amazon S3 account. You need a professional subscription level to use this feature.

*ExportCaptures* returns the list of the generated image files, or throws an exception if one or more files could not be captured. In any case, the value of the *QueryData -> Data* property will be set to an array containing the filenames that have been successfully captured.


