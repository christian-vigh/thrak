# INTRODUCTION #

The *PdfLayer* class encapsulates the *PdfLayer* api from ApiLayer.

Using the *PdfLayer* object is pretty simple. Just instantiate an object, define the required properties, and call one of the PdfLayer public methods ; the following example will convert HTML contents from http://www.google.com and return PDF data in the *$pdf* variable (if an error occurs, an *ApiLayerException* exception will be thrown) :

	require ( 'PdfLayer.php' ) ;
	
	// Specify the access key defined in your pdf layer dashboard
	$my_access_key 	=  '123456.....' ; 		

	// Instantiate the pdflayer object using your access key
	$pdf		=  new PdfLayer ( $my_access_key ) ;

	// Capture pdf contents from the specified url
	$pdf_data		=  $pdf -> ConvertPage ( "http://www.google.com" ) ;
	
	// Save pdf contents
	file_put_contents ( 'google.pdf', $pdf_data ) ;

The *ConvertPage()* method will use either the specified url, or the one specified in the *Url* property so you could rewrite this as :

	$pdf -> Url 			=  'http://www.google.com' ;
	$pdf_data			=  $pdf -> ConvertPage ( ) ;

Converted pages are cached as much as possible to minimize useless http requests ; however, you may want a new capture to be generated for the same url. In this case, use the *Force* property for that :

	$pdf -> Force 		=  true ;
	$capture			=  $pdf -> ConvertPage ( "http://www.google.com" ) ;

The *PdfLayer* API allows you to specify a secret key that you can define and activate in your dashboard ;	Once activated, it must be specified in all your API requests (the *secret_key* API parameter is then the md5 hash of the requested url catenated with your dashboard's secret key).

The *PdfLayer* class relieves you from having to calculate this final secret key and automatically generate it for you before issuing the API query ; simply specify in the class constructor the value of your dashboard's secret key as in the following example :

	$my_secret_key 	= '....' ;
	$pdf	 		=  new PdfLayer ( $my_access_key, $my_secret_key ) ;

and the *PdfLayer* class will handle all the details for you.

# USEFUL LINKS #

You can find the documentation on the ScreenshotLayer API from ApiLayers here :

[https://pdflayer.com/documentation](https://pdflayer.com/documentation)

Once you have successfully created a new account using your email address and a password, you will be able to see your dashboard information here :

[https://pdflayer.com/dashboard](https://pdflayer.com/dashboard)

You will be able to the specify an access key different from the default one, or specify and activate a secret keyword.

# PDFLAYER CLASS CONSTRUCTOR #

The *PdfLayer* class constructor has the following syntax :

	$pdf 	=  new PdfLayer ( $access_key, $secret_key = null, $use_https = false ) ;

The parameters are the following :

- **access_key** : the access key defined in your dashboard. This parameter is required.
- **secret_key** : the optional secret keyword you may have defined and activated in your dashboard. Note that no error will be reported if your dashboard does not contain a secret keyword but you specify a secret key in the class constructor. This is useful if you want to test the API with and without a secret keyword activated in your dashboard, because you won't have to change your code
- **use_https** : set this parameter to true if you want to use secure http requests (https). 

# PDFAYER CLASS PROPERTIES #

In addition to the standard properties exposed by the base *ApiLayer* class, the following properties are available and mimic their counterpart in the *screenshotlayer* api ; have a look at the official documentation on [https://pdflayer.com/documentation](https://pdflayer.com/documentation).

Note that many properties have aliases.

## accept\_lang or accept\_language or AcceptLanguage (string) ##

Sends the specified Accept-Language http header. Useful for sites that accept several user language translations.

## author or Author (string) ##

Allows to set the document author, visible in the document properties when using Acrobat Reader.

## auth_user or AuthUser or AuthenticationUser (string) ##
## auth_password or AuthPassword or AuthenticationPassword (string) ##

User and password required to connect to the website before being to view the page html contents.

These scheme uses the basic http authentication mechanism.

## creator or Creator or application or Application (string) ##

Allows to specify the name of the application that generated the pdf document. This information is visible in the document properties dialog box when using Acrobat Reader. 

## css\_url or CssUrl (string) ##

Url of a style sheet that will be injected to style html contents.

## custom\_unit or CustomUnit (keyword) ##

Specifies the unit to be used for all other properties that express a quantity, such as *margin\_left*, *margin\_right*, *page\_width*, etc.

The following units can be specified :

- Millimeters, using the strings 'mm', 'millimeter', 'millimeters' or the class constant UNIT\_MILLIMETERS
- Inches, using the strings 'in', 'inch', 'inches' or the class constant UNIT\_INCHES
- Pixels, using the strings 'px', 'pixel', 'pixels' or the class constant UNIT\_PIXELS
- Points, using the strings 'pt', 'point', 'points' or the class constant UNIT\_POINTS

## delay or Delay (integer) ##

Specifies the maximum delay, in milliseconds, before the html contents can be considered to be completely loaded.

## document\_html or DocumentHtml (string) ##

Specifies direct html contents to be converted to pdf.

Either the *document\_url* or *document\_html* property needs to be specified.

Note that this parameter cannot be specified as a GET parameter, but must be used as a POST parameter instead. If this property is assigned, the *PdfLayer* class will automatically issue a POST request to the *Apilayer* API.

## document\_name or DocumentName (string) ##

By default, PDF documents generated by the pdflayer API are named pdflayer.pdf. Using the API's document_name parameter you can specify a custom name for your final PDF document.

This information is mainly used when downloading generated documents.

## document\_url or DocumentUrl or url or Url ##

Url of the web page to be converted into PDF format.

Either the *document\_url* or *document\_html* property needs to be specified.

## encryption or Encryption (keyword) ##

There are two encryption levels available for PDFs generated by the pdflayer API: 40-bit and 128-bit. In order to activate encryption, set the API's encryption parameter to 40 or 128.

## footer\_align or FooterAlign (keyword) ##

Specifies alignment for footer text. This can take the values *left*, *right* or *center*.

## footer\_html or FooterHtml (string) ##

Specifies direct html contents to be used for the generated pdf page header.

Note that this parameter cannot be specified as a GET parameter, but must be used as a POST parameter instead. If this property is assigned, the *PdfLayer* class will automatically issue a POST request to the *Apilayer* API.

## footer\_text or FooterText (string) ##

Specifies the footer text.

## footer\_spacing or FooterSpacing (integer) ##

Specifies the spacing between the bottom of the page and the start of footer contents.

The units used are give by the *custom\_unit* parameter, which defaults to *px* (pixels).

## footer\_url or FooterUrl (string) ##

Specifies an url which contains html contents to be inserted into the footer part of a page.

## force or Force (boolean) ##

Set to "1" (or true) if you want the pdf contents to be regenerated.

## forms or Forms (boolean) ##

If form data is present in the html contents, then a pdf form will be generated.

## grayscale or GrayScale (boolean) ##

Converts color information to grayscale.

## header\_align or HeaderAlign (keyword) ##

Specifies alignment for header text. This can take the values *left*, *right* or *center*.

## header\_html or HeaderHtml (string) ##

Specifies direct html contents to be used for the generated pdf page footer.

Note that this parameter cannot be specified as a GET parameter, but must be used as a POST parameter instead. If this property is assigned, the *PdfLayer* class will automatically issue a POST request to the *Apilayer* API.

## header\_text or HeaderText (string) ##

Specifies the header text.

## header\_spacing or HeaderSpacing (integer) ##

Specifies the spacing between the bottom of the header and the start of page contents.

The units used are give by the *custom\_unit* parameter, which defaults to *px* (pixels).

## header\_url or HeaderUrl (string) ##

Specifies an url which contains html contents to be inserted into the header part of a page.

## inline or Inline (boolean) ##

By default, accessing a pdflayer API request URL in a browser will trigger the download of the generated PDF (attachment behaviour). By setting the API's inline parameter to 1 the API will be requested to display the PDF in the browser instead.

## margin\_bottom or MarginBottom (integer) ##
## margin\_left or MarginLeft (integer) ##
## margin\_right or MarginRight (integer) ##
## margin\_top or MarginTop (integer) ##

Specifies the bottom, left, right and top margins to be used for the document page contents.

The units used are given by the *custom\_unit* parameter, which is *px* (pixels) by default.

## no\_background or NoBackground (boolean) ##

Remove background images when converting html to pdf.

## no\_copy or NoCopy (boolean) ##

Clipboard copy will be disabled in the generated pdf file.

## no\_hyperlinks or NoHyperlinks (boolean) ##

Do not include hyperlinks in the captured html contents.

## no\_images or NoImages (boolean) ##

Do not include images in the captured html contents.

## no\_javascript or NoJavascript (boolean) ##

Do no process javascript when reading html contents.

## no\_modify or NoModify (boolean) ##

User will not be authorized to modify the pdf contents.

## no\_print or NoPrint (boolean) ##

Is set to true, printing will be disabled in the generated pdf file.	

## owner\_password or OwnerPassword (string) ##

Password to be specified for being able to modify the pdf file contents.

## page\_height or PageHeight (integer) ##

Specifies a page height that overrides the default page size parameter.

Note that the *page\_width* parameter must also be specified in this case.
 
## page\_size or PageSize (keyword) ##

Allows to specify a page format that can be :

- A0 to A9
- B0 to B9
- CSE, Comm10E, Executive, Folio, Ledger, Legal, Letter or Tabloid

The class constants PAGE\_SIZE\_* provide an alias for these keywords.

## page\_width or PageWidth (integer) ##

Specifies a page width that overrides the default page size parameter.

Note that the *page\_height* parameter must also be specified in this case.
 
## secret_key or SecretKey (string) ##

If you have activated your secret key in the pdflayer api, then you will have to
set the SecretPassword property to that key.

The SecretKey readonly property will return your own secret key for the given url when used as a query parameter ; this *secret\_key* url parameter is the md5 hash of the requested url catenated with your secret key.

## subject or Subject (string) ##

Allows to set the document subject, visible in the document properties when using Acrobat Reader.

## test or Test or sandbox or Sandbox (boolean) ##

Enables sandbox mode. This allows you for testing document conversion even if you ran out of queries authorized by your current subscription plan. 

Note that in this case the generated pdf documents will have the word "Sample" printed in red in the page background.

## text_encoding or TextEncoding (string) ##

Specifies the text encoding to be used when retrieving an url contents.

The default is UTF-8.

## title or Title (string) ##

Allows to set the document title, visible in the document properties when using Acrobat Reader.

## ttl or Ttl or TTL (integer) ##

Specifies the maximum time in seconds where a generated pdf document will be kept in the cache. This can range from 300 (5 minutes) to 2592000 (30 days).

## user\_password or UserPassword (string) ##

Password to be specified for being able to view the pdf file contents.

## use\_print\_media or UsePrintMedia (boolean) ##

Takes into account @media css instructions when generating the pdf contents.

## user\_agent or UserAgent ##

Specifies a custom user agent string.

Some standard user agent strings are available as class constants starting with USER\_AGENT\_\*.

## viewport or Viewport (viewport dimensions) ##

A viewport dimension for the generated captures, which has the form :

	widthxheight

where *width* and *height* represent the dimension. The default is : 1440x900.

## watermark\_in\_background or WatermarkInBackground (boolean) ##

By default, watermarks are placed in the foreground of the document. Set this parameter to true to put the watermark behind the page contents.

## watermark\_offset\_x or WatermakOffsetX (integer) ##
## watermark\_offset\_y or WatermakOffsetY (integer) ##

Specifies the X and Y position of the upper-left corner of the watermark. The default is (0,0).

## watermark\_opacity or WatermarkOpacity (integer) ## 

Specifies the watermark opacity (0..100). The default is 20 (20%).

## zoom or Zoom (integer) ##

Specifies a zoom factor for the captured html contents. The value can range from 0 to 50, 0 meaning "no zoom".

Note that after zooming, the converted html contents will be truncated if they do not fit on the page.

# PDFLAYER CLASS METHODS #

The following methods are implemented by the *PdfLayer* class :

## public function  ConvertPage ( $url = false ) ##

Converts the html contents found at the specified url to pdf contents.

The method returns the generated pdf file data.

If the *$url* parameter is not specified, then the contents of the *Url* property will be used.

## public function  ConvertPages ( $url_list, $output_directory, $prefix = 'capture.' ) ##

Captures a set of urls specified in the *$url_list* array and saves them in the specified *$output\_directory* directory, in PDF format.

Filenames are generated using the specified *$prefix* prefix, followed by a sequential number and the '.pdf' file extension.

Existing files with the same name will be overwritten.

Note that the ApiLayer Pdf API does not provide any means of performing batch captures ; this is just a feature of the *PdfLayer* class, and should be used with care since it does not guarantee faster captures.

However, this allows you to perform batch conversions using the same parameters for every conversion.

## public function  ConvertHtml ( $contents = false ) ##

Converts the specified html contents to pdf contents.

The method returns the generated pdf file data.

If the *$contents* parameter is not specified, then the contents of the *DocumentHtml* property will be used.

## public function  DownloadPage  ( $url = false, $filename = false ) ##

This method can be used to force the download of a captured url.

The *$filename* parameter, when specified, indicates the filename to be downloaded. The default is built from the url domain name with file path. Dots and slashes will be replaced with underlines.

