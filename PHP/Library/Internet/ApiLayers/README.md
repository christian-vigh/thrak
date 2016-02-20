# INTRODUCTION #

This class package encapsulates the access to various APIs from apilayers ([https://www.apilayer.com/#products](https://www.apilayer.com/#products)).

ApiLayers currently provides the following apis :

- **currencylayer** : real-time exchange rates and currency conversions  
- **screenshotlayer** : generates PNG, JPEG or GIF images from web pages specified by an url
- **vatlayer** : real-time VAT number validation and EU VAT rates retrieval
- **mailboxlayer** : email address verification
- **numverify** : global phone number validation and lookup
- **giflayer** : video to GIF conversion
- **languagelayer** : written language detection
- **pdflayer** : generates PDF files from HTML sources

ApiLayers products provide a REST api for using their services ; you usually have to issue GET queries to retrieve the information you need, then interpret the results provided in JSON format. However, some queries may return binary data (for example, requesting a screenshot of a web page whose url has been provided will return the generated PNG, JPEG or GIF image contents ; and converting html contents to PDF will return the PDF data, unless an error occurred). Note however that some query parameters require POST queries to be used.

This is why I chosed to encapsulate access to the ApiLayers apis, to provide some kind of uniform information retrieval.

# REGISTERING TO APILAYERS #

Registering to apilayers is easy ; just go to the product page and chose the *Sign up free* option. Once registered, you will have the choice between up to four subscription plans. The first one is free, and allows you to test the corresponding API. 

Note that you will have to register yourself for every product you want to test (ie, you will have to sign-up with your own email address and password for every product you want to use).

With the free subscription plan, some features may be disabled, and you will be authorized to issue a limited amount of queries per month, but it's generally enough for testing.

# CURRENT IMPLEMENTATION STATUS #

The following apilayers products are currently implemented by this class package :

- screenshotlayer (see file [README.SCREENSHOTLAYER.md](README.SCREENSHOTLAYER.md))
- mailboxlayer ([README.MAILBOXLAYER.md](README.MAILBOXLAYER.md))
- pdflayer ([README.PDFLAYER.md](README.PDFLAYER.md))

You can have a look at the **Examples** directory for getting some samples on how to use each of these classes.

More will be coming soon...

# GETTING SOME EXAMPLES #

The **Examples** directory in this package contains sample scripts to demonstrate the features implemented by the various classes implemented here. Feel free to have a look at them, I have designed them to be as simplest as possible.

# IMPLEMENTATION DETAILS #

I suggest that you have a look at some of the README files listed in the above paragraph before showing some interest in the ApiLayer package implementation.


## INTRODUCTION ##

Since ApiLayer provides many services, the apilayer package has been designed so that encapsulating new apis would be easy.

There is actually one base class, **ApiLayer**, that gathers all the behaviors needed to issue http queries and interpret results to/from the Apilayer website.

All the API encapsulation classes (ScreenshotLayer, MailboxLayer, etc.) inherit from this class. Their constructors provides a formal description of the parameters they expect, along with specific methods to perform the desired query (for example, the *ScreenshotLayer* class has a *CapturePage* method that returns the contents of a PNG, JPEG or GIF file representing a web page).

Using this design, derived classes that implement an ApiLayer encapsulation need only to focus on two aspects :

- Provide the url parameter definitions that are involved in building an url query to the ApiLayers website. This step is done in the derived class constructor.
- Provide methods for achieving specific tasks, for example retrieving email address information (mailboxlayer api), capturing the contents of a web page (screenshotlayer api), converting html contents to pdf (pdflayer api), and so on, without having to care on building a correct query and handling error conditions.

The following paragraphs describe how to define a new derived encapsulating class through its constructor, and which methods are made available to the caller and to the derived classes.

## APILAYER CONSTRUCTOR ##

The constructor of the *ApiLayer* class has the following syntax :

       parent::__construct ( $api_url, $access_key, $use_https = false, $parameters = [] ) ;

Note that, since the *ApiLayer* class is abstract, its constructor can only be called from within a derived class constructor.

### $api_url parameter ###

The *$api_url* parameter must be specified by the derived class as the preferred entry point to the encapsulated ApiLayer api. This will be *api.screenshotlayer.com/api/capture* for the screenshotlayer api, *apilayer.net/api/check* for the mailboxlayer api, and so on (see the documentation on [https://www.apilayer.com/#products](https://www.apilayer.com/#products) for more information on the adequate url).

Note that the *http://* or *https://* scheme needs not to be specified, since its conditioned by the **$use_https** parameter.

### $access_key parameter ###

Every ApiLayer api requires you to register first by giving a valid email address and a password. Once the registration process is over, an access key is generated for you (you can later change it by going to your dashboard).

This access key must be specified each time you need to instantiate an object derived from the ApiLayer class.

### $use_https parameter ###

Set this parameter to *true* if you want to use secure http requests.

Note that no provision is made for verifying SSL certificates (the curl CURLOPT\_SSL\_VERIFYPEER option is set to false).

### $parameters array ###

The **$parameters** array elements are associative arrays that allow a derived class to specify the definitions of the parameters used for building an ApiLayer query.

Each array item defines a parameter attribute and can contain the following entries :

#### - 'name' (string) ####

Query parameter name, as it will appear on the query url.

This entry can be omitted if the 'url-parameter' is set to false.

#### - 'property' (string or array of strings) ####

The query parameters have a name (usually given by the ApiLayers api) but can also have aliases.

These name and aliases can differ from the real url parameter name specified in the *name* entry. For example, the **access_key** parameter has one alias, **AccessKey**. Thus, its value can be accessed either through :

	$api -> access_key 

or :

	$api -> AccessKey

Look at the different documentations for a list of authorized property names for each ApiLayer encapsulation class.

The value of the *'property'* entry can either be a string or an array of strings, if you want to specify more than one property name.

#### - 'value' (string) ####

Specifies the property initial value. This entry is optional and will default to *null*.

When the *'url-parameter'* entry is set to true (the default), the parameter will be included in the url query if its value is not null.

#### - 'url-parameter' (boolean) ####

When true, the parameter value will be included in the final url. The default is true.

#### - 'required' (boolean) ####

When true, the corresponding parameter is required. An exception will be thrown during the construction of the url query if its value has not been specified.

#### - 'readonly' (boolean) ####

When true, the value cannot be set. This is used for already initialized entries, or for computed entries having a callback function.

#### - 'get', 'set' (callback) ####

Callback function to be used for getting/setting the parameter value.

The *'get'* function must have the following signature :

		string get_function ( $parameter ) ;

The *'set'* function must have the following signature :

		void  set_function ( &$parameter, $value ) ;

The *$parameter* parameter is a reference to the parameter entry, as defined by the derived class constructor. *$value* is the value to be assigned to the property.

#### - 'queryget' (callback) ####

Specifies a callback function used to retrieve the parameter value when building the final query url. This may be regarded as some kind of computed value.

This is the case for example of the *secret_key* parameter, which is used in the screenshot and pdflayer apis ; you can set it like this :

		$screenshot -> secret_key 	=  'my secret key' ;

where *'my secret key'* is a secret key defined in your apilayers dashboard ; however, the value that will be specified to build the final url is the md5 hash of the url to be captured catenated with your secret key. This is why both the ScreenshotLayer and PdfLayer classes specify a *queryget* entry to dynamically build this value.

#### - 'type' (integer mask) ####

The *type* parameter specifies how the property value will be handled. This is a byte mask whose low-order bits specify a type value which can be any of the following constants :

- **APILAYER\_PARAMETER\_STRING** : parameter value can be any string. This is the default type, if no *type* entry has been specified.
- **APILAYER\_PARAMETER\_BOOLEAN** : parameter value is a boolean expressed under the form of either 0 or 1.
- **APILAYER\_PARAMETER\_INTEGER** : parameter value must be an integer.
- **APILAYER\_PARAMETER\_KEYWORD** : parameter value is a case-insensitive keyword that must belong to a predefined list. In this case, the *keywords* entry must contain the list of authorized keywords.

The following additional flags can be specified :

- **API\_PARAMETER\_FLAG\_COMPUTED** : the property is a computed value ; this means that the *'queryget'* entry will have to be set to a valid callback to build the final parameter value for the query url.
- **API\_PARAMETER\_FLAG\_POST** : to be processed correctly, the value of the parameter must be submitted through a POST request. This is the case, for example, of the *document_html* parameter of the **PdfLayer** API.

The following bit flags may be specified for string parameter types :

- **APILAYER\_PARAMETER\_FLAG\_UTF8\_ENCODE** : Encode parameter value in UTF8 before building the final query url
- **APILAYER\_PARAMETER\_FLAG\_HTML_\ENTITIES** : Interpret and convert html entities
- **APILAYER\_PARAMETER\_FLAG\_NO\_URL\_ENCODE** : Do not call the urlencode() method on this parameter value.

#### - 'keywords' (array) ####

When the parameter type is APILAYER\_PARAMETER\_KEYWORD, a 'keywords' entry must be specified in the parameter definition, as an array of associative or non-associative entries. Each entry indicates a possible authorized value on the query url.

Note that (input) parameter values are case-insensitive ; however, the output value (the one supplied in the http query) will always reflect the initial input case. For example :

	'keywords' => [ 'jpg', 'png', 'gif' ]

will always yield to a final url value of 'png', 'gif' or 'jpg', even if you set the property value to 'JPG', 'PNG' or 'GIF'.

You can also specify aliases ; for example, if you want the input values 'jpeg', 'jpg' or 'jpe' to yield to the same output value 'jpg', simply specify :

	'keywords' => [ 'jpg', 'jpeg' => 'jpg', 'jpe' => jpg' ] 

## APILAYER PROPERTIES ##

The following properties are common to all derived classes :

### public $AccessKey property (string) ####

Specifies the access key defined in your ApiLayer dashboard ; this property is set by the class constructor, but can also be redefined later.

### public $UseHttps property (boolean) ###

Specifies whether secure http request should be used for accessing the api ; this property is set by the class constructor, but can also be redefined later.


### public $QueryResult (ApiLayerResult object) ###

After an http query execution, this property is set to the results of the executed query. This is an object having the following properties :

#### $Status (boolean) ####

Status of the last executed query.

#### Error (ApiLayerResultError object) ####

Error status of the last executed query. This property is null if the query successfully executed, otherwise it will contain the following properties, which are set by the result of the ApiLayer query and are documented on the Apilayers web site :

- Code (integer) : Error code.
- Type (string) : Error type (usually, a string looking like a constant)
- Message (string) : Error message.

#### Data (mixed) ####

The *Data* property may handle the JSON result of an http query to ApiLayers. There are two exceptions to that : the ScreenshotLayer and PdfLayer classes, which will set the *Data* property to null (normally, it should be set to hold the image/pdf contents, but this has been abandoned to limit memory usage). 

### public $LastQuery (string) ###

Contains the last execute http query, together with its parameters.

Note that the parameters requiring a POST request will not be listed here.

### public  $HttpQueryData (string) ###

Contains the raw contents of the last http query issued. Note that you will not be able to see POST parameters here, only the http headers sent.

### protected $ApiUrl (string) ###

Contains the key http address for the corresponding ApiLayer api. This value must be set by derived classes when invoking their parent's constructor.

### protected $Parameters (array) ###

Contains the parameter definitions for the corresponding ApiLayer api. This value must be set by derived classes when invoking their parent's constructor.

## APILAYER PUBLIC METHODS ##

The following methods are implemented by the *ApiLayer* abstract class :

### public mixed  Execute ( $query = false ) ###

Executes an ApiLayer query. If the *$query* parameter is not specified, the resulting query will be built using the chosen scheme (http or https), the api url and all the query parameters that have been set by assigning the corresponding property in the object.

The return value of this method depends on the query : it can be json data but could contain anything else. For example, capturing a screenshot will return the generated image contents ; converting html contents to PDF will return the pdf file contents.

This method is used internally by derived classes and has been made public for debugging purposes only.

Similarly,  the *$query* parameter, which allows to specify a custom query, is available for debugging purposes only. 

Derived classes can implement two methods (which are some kind of event handlers) :

- **OnBeforeQuery** : this method is called before executing the ApiLayer query. Implementing this method in a derived class allows for performing further checks before executing the query. This is the case for example of the PdfLayer class, which has to check that either the *document\_url* or *document\_html* property has been set. At the time of the call, the *LastQuery* property will contain the ApiLayer query that will be executed.
- **OnAfterQuery** : Called after executing a query.

Event handlers can call the *SetError()* protected method if an error condition is encountered. 

### public string GetQuery ( ) ###

Returns the http GET query that will execute the desired ApiLayer query. The returned value contains the http or https scheme, the layer api url and all the url parameters that have been set so far. The returned value will not return properties that have the APILAYER\_PARAMETER\_FLAG\_POST flag set.

This method is used internally by the **Execute()** method, and has been made public for debugging purposes only.

Casting the object to a string will also return the query ; thus, the following code :

	$query 		=  $screenshot -> GetQuery ( ) ;

is equivalent to :

	$query 		=  ( string ) $screenshot ;

### public string  GetQueryUrl ( ) ###

Returns the url part of the apilayer query, including the http or https scheme.

This method is used internally by the **Execute()** method, and has been made public for debugging purposes only.

### public string  GetQueryParameters ( $post = false ) ###

Returns the query parameters. Since some parameters need to be posted (such as the document_html parameter of the PdfLayer api), this method allows the caller to retrieve either the url GET parameters ($post = false) or the parameters to be submitted through a POST request ($post = true).

This method is used internally by the **Execute()** method, and has been made public for debugging purposes only.

## APILAYER PROTECTED METHODS ##

The following protected methods are implemented by the *ApiLayer* abstract class and can be safely called by derived classes :

### protected CheckResult ( $result ) ###

This method is called by the *Execute()* method to check the returned contents of the ApiLayer http query.

It will throw an exception in two cases :

- The http query result is empty
- The http query result contains json data who have a *status* field set to false.

Derived classes can implement further checkings.

### protected function  GetProperty ( $entry, $url_value = false ) ###

Retrieves the value of a property defined by the *$entry* array, which specifies the property characteristics (as defined by the derived class when calling the *ApiLayer* constructor). It applies the following transformations :

- If parameter type has the APILAYER\_PARAMETER\_FLAG\_COMPUTED flag set, then the callback specified by the *'queryget'* entry will be called to retrieve the value. This will happen only when the *$url_value* is set to true.
- If a callback function has been specified for the *'get'* entry, it will be called to retrieve the entry value.
- For string values (APILAYER\_PARAMETER\_TYPE\_STRING) :
	- Value will be encoded in UTF8 if the APILAYER\_PARAMETER\_FLAG\_UTF8\_ENCODE flag is set
	- Html entities will be decoded if the APILAYER\_PARAMETER\_FLAG\_HTML\_ENTITIES flag is set
	- No url encoding will occur if the APILAYER\_PARAMETER\_FLAG\_NO\_URL\_ENCODE flag is set (this only applies to parameter values retrieved for urls, ie when the *$url_value* parameter is set to true)

### protected function  HasPostParameters ( ) ###

Checks that parameters defined as needing a post request (ie, having the APILAYER\_PARAMETER\_FLAG\_POST parameter set) are present. The result will be true only if at least one non-empty property having this flag set has been found.

### protected function  SetError ( $code, $type, $info, $throw = true ) ###

Allows derived classes to set an error condition in a way that mimics the errors returned by the ApiLayers various apis. The meaning of the parameters is the following :

- **$code** : http-like error code
- **$type** : an error keyword specified as a string (such as 'missing\_document\_source')
- **$info** : error message
- **$throw** : when true (the default), an ApiLayerException exception will be thrown.

Note that when an exception is thrown, the catching code can always rely on the value of the *QueryResult* and *LastQuery* properties.

### protected function  SetProperty ( &$entry, $value ) ###

Sets a property value (ie the *'value'* entry of the specified *$entry* parameter) to *$value*, after applying the following transformations and checkings :

- Boolean properties (of type APILAYER\_PARAMETER\_BOOLEAN) can accept any kind of values but are always converted to either "0" or "1"
- Range checking is performed on integer properties (APILAYER\_PARAMETER\_INTEGER), if the *'range'* entry has been specified.
- Keyword parameters (APILAYER\_PARAMETER\_KEYWORD) are checked against the authorized keywords defined in the *'keywords'* entry
- Viewport parameters (APILAYER\_PARAMETER\_VIEWPORT) are checked for validity  
 

### protected SetResult ( $result = null ) ###

Sets the *QueryResult* property to an **ApiLayerResult** object, according to the information provided by the *$result* parameter, which can be one of the following :

- **null** : The query result is set to ok
- **array** : The result is set using the *'status'*, *'error'* and *'data'* items of the supplied associative array
- **json data** : The result is set to the json data present in the supplied string. It will be an ok status if the json data contains a *status* field set to true, or an error otherwise (in which case an *error* field should be present).

