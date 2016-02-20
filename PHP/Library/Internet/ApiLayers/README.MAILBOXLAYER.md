# INTRODUCTION #

The *MailboxLayer* class encapsulates the *MailboxLayer* api from ApiLayer.

Using the *MailboxLayer* object is pretty simple. Just instantiate an object, define the required properties, and call one of the MailboxLayer public methods ; the following example will retrieve information from the *christian.vigh@orange.fr* email address and print it :

	require ( 'MailboxLayer.php' ) ;
	
	// Specify the access key defined in your mailbox layer dashboard
	$my_access_key 	=  '123456.....' ; 		

	// Instantiate the mailboxlayer object using your access key
	$mailbox		=  new MailboxLayer ( $my_access_key ) ;

	// Retrieve information
	$info	=  $mail -> GetEmail ( 'christian.vigh@orange.fr' ) ;

	print_r ( $info ) ;

which should give the following result :

	stdClass Object
	(
	    [email] => christian.vigh@orange.fr
	    [did_you_mean] =>
	    [user] => christian.vigh
	    [domain] => orange.fr
	    [format_valid] => 1
	    [mx_found] => 1
	    [smtp_check] => 1
	    [catch_all] =>
	    [role] =>
	    [disposable] =>
	    [free] =>
	    [score] => 0.96
	)

See the **INTERPRETING MAILBOXLAYER RESULTS** paragraph later in this document for more information on the resulting data.

Note that the parameter of the *GetEmail()* method is optional ; if not specified, the contents of the *Email* property will be used. So the following code is equivalent :

	$mail -> Email 	=  'christian.vigh@orange.fr' ;
	$info 			=  $mail -> GetEmail ( ) ;

# USEFUL LINKS #

You can find the documentation on the MailboxLayer API from ApiLayers here :

[https://mailboxlayer.com/documentation](https://mailboxlayer.com/documentation)

Once you have successfully created a new account using your email address and a password, you will be able to see your dashboard information here :

[https://mailboxlayer.com/dashboard](https://mailboxlayer.com/dashboard)

You will be able to the specify an access key different from the default one.

# MAILBOXLAYER CLASS CONSTRUCTOR #

The *MailboxLayer* class constructor has the following syntax :

	$mail	=  new MailboxLayer ( $access_key, $use_https = false ) ;

The parameters are the following :

- **access_key** : the access key defined in your dashboard. This parameter is required.
- **use_https** : set this parameter to true if you want to use secure http requests (https). 

# MAILBOXLAYER CLASS PROPERTIES #

The following properties are defined :

## email or Email (string) ##
Email address whose information is to be retrieved (or the last email address whose	information has been retrieved).

## format or Format (boolean) ##
Set to 1 if the json contents returned by the api should be "pretty-printed" (for debugging purposes only).

## smtp_check or SmtpCheck (boolean) ##
When set to 1, the smtp MX entry is checked.

## catch_all or CatchAll (boolean) ##
When set to 1, possibly all smtp servers having an MX entry for this email address are checked.

## callback or Callback (string) ##
Allows to specify the name of a javascript function that will be called upon return.

See the mailboxlayer documentation for more information on this parameter.


# MAILBOXLAYER CLASS METHODS #

The *MailboxLayer* class contains the following methods :

## public function  GetEmail ( $email = null ) ##

Retrieves information about the specified email address. 

If no email address is specified, then the contents of the *Email* property will be used instead.


## public function  GetEmails ( $emails ) ##

Retrieves information about the emails specified in the *$emails* string array.

Note that the *MailboxLayer* API does not provide any means to perform batch requests. This feature is provided only for convenience by the *MailboxLayer* class, but you should keep in mind that a *MailboxLayer* API query is issued for each email address you specify.

# INTERPRETING MAILBOXLAYER RESULTS #

The results returned by the *GetEmail* and *GetEmails* methods are simply the standard json data returned by the corresponding *MailboxLayer* API.

The meaning of the returned object properties is described below ; this comes directly from the *MailboxLayer* API documentation, which I encourage you to read thoroughly :

- **email** : Contains the exact email address requested 
- **did\_you\_mean** : Contains a did-you-mean suggestion in case a potential typo has been detected. 
- **user** : Returns the local part of the request email address. (e.g. "paul" in "paul@company.com") 
- **domain** : Returns the domain of the requested email address. (e.g. "company.com" in "paul@company.com") 
- **format_valid** : Returns true or false depending on whether or not the general syntax of the requested email address is valid. 
- **mx_found** : Returns true or false depending on whether or not MX-Records for the requested domain could be found. 
- **smtp_check** : Returns true or false depending on whether or not the SMTP check of the requested email address succeeded. 
- **catch_all** : Returns true or false depending on whether or not the requested email address is found to be part of a catch-all mailbox. 
- **role** : Returns true or false depending on whether or not the requested email address is a role email address. (e.g. "support@company.com", "postmaster@company.com") 
- **disposable** : Returns true or false depending on whether or not the requested email address is a disposable email address. (e.g. "user123@mailinator.com") 
- **free** : Returns true or false depending on whether or not the requested email address is a free email address. (e.g. "user123@gmail.com", "user123@yahoo.com") 
- **score** : Returns a numeric score between 0 and 1 reflecting the quality and deliverability of the requested email address. 
