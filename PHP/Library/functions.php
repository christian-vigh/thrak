<?php
/***************************************************************************************************

    NAME
	functions.php

    DESCRIPTION
	Miscellaneous functions.

    AUTHOR
     	Christian Vigh, 10/2012.

    HISTORY
    [Version : 1.0]	[Date : 2012/10/04]	[Author : CV]
     	Initial version.

    [Version : 1.0.1]	[Date : 2015/02/05]	[Author : CV]
	. Added the error_output() function.

    [Version : 1.0.2]	[Date : 2015/04/02]	[Author : CV]
 	. Added the get_last_ignored_error() function, 

    [Version : 1.0.3]	[Date : 2015/04/17]	[Author : CV]
	. Added the require_file() and require_directory() functions.

    [Version : 1.0.4]	[Date : 2015/11/20]	[Author : CV]
	. Added the dateex() function.

 ***************************************************************************************************/
defined ( '__THRAK_SETUP__' ) or die ( "This file cannot be accessed directly." ) ;


// Used namespaces & objects
use 		Thrak\IO\Console ;
use  		Thrak\System\Debug ;
use		Thrak\Types\ObjectifiedArray ;
use		Thrak\Internals\Chainer ;
use		Thrak\Types\DateTime ;


/*==================================================================================================

    error -
	Displays an error message and exit.

  ==================================================================================================*/
function  error ( $message )
   {
	if  ( is_string ( $message ) )
		trigger_error ( $message, E_USER_ERROR ) ;
	else if (  is_a ( $message, '\Exception' ) )
		throw $message ;
    }


/*==================================================================================================

    warning -
	Displays an a warning message.

  ==================================================================================================*/
 function  warning ( $message )
   {
	trigger_error ( $message, E_USER_WARNING ) ;
    }


/*==================================================================================================

    throw_error -
	Throws an exception with the specified message.

  ==================================================================================================*/
function  throw_error ( $message )
   {
	throw new Exception ( $message ) ;
    }


/*==================================================================================================

    output, error_output -
	Outputs a message.

  ==================================================================================================*/
function  output ( )
   {
	Console::Output ( func_get_args ( ) ) ;
    }


function  error_output ( )
   {
	Console::ErrorOutput ( func_get_args ( ) ) ;
    }


/*==================================================================================================

    input, inputchar -
	Reads a string or character from the standard input.

  ==================================================================================================*/
function  input ( )
   {
	return ( Console::Input ( ) ) ;
    }

function  inputchar ( )
   {
	return ( Console::InputChar ( ) ) ;
    }


/*==================================================================================================

    dump -
    	Dumps a variable contents.

  ==================================================================================================*/
function  dump ( $var, $title = "" )
   {
   	call_user_func_array ( array ( '\Thrak\System\Debug', 'Dump' ), func_get_args ( ) ) ;
    }


/*==================================================================================================

    get_last_ignored_error -
    	Returns the last error ignored so far, an associative array having the following entries :
 
 	'errno' -
 		Error number.
 	'error' -
 		Error message.
 	'file' -
 		Originating source file.
 	'line' -
 		Source line.
 	'context' -
 		Context options.

  ==================================================================================================*/
function  get_last_ignored_error ( )
   {
	return ( \Thrak\System\Exception::$LastError ) ;
    }


/*==================================================================================================

    add_include_path -
    	Adds a path to the existing include path.

  ==================================================================================================*/
function  add_include_path ( $new_path, $before = true )
   {
   	if  ( $before )
	   	$path 	=  $new_path . PATH_SEPARATOR . get_include_path ( )  ;
	else
		$path 	=  get_include_path ( ) . PATH_SEPARATOR . $new_path ;

   	set_include_path ( $path ) ;
    }
 

/*==============================================================================================================

    require_file, require_directory -
        Generates an exception if the specified file or directory does not exists.

  ==============================================================================================================*/
function  require_file ( $file )
   {
	if  ( ! file_exists ( $file ) )
		error ( new Thrak\System\FileNotFoundException ( "File $file does not exist." ) ) ;
    }


function  require_directory ( $path )
   {
	if  ( ! file_exists ( $path ) )
		error ( new Thrak\System\DirectoryNotFoundException ( "Directory $path does not exist." ) ) ;
	
	if  ( ! is_dir ( $path ) )
		error ( new Thrak\System\FileNotDirectoryException ( "Path $path exists but is not a directory." ) ) ;
    }

    
/*==============================================================================================================

   o -
        Creates an ObjectifiedArray from an array. If the specified parameter is already a descendent of the 
	ObjectifiedArray class, simply returns the object as is.
	Generates an error if the specified parameter is neither an array nor a ObjectifiedArray.

  ==============================================================================================================*/
function  o ( $array )
   {
	if  ( is_object ( $array )  &&  is_subclass_of ( $array, 'ObjectifiedArray' ) )
		return ( $array ) ;
	else if  ( is_array ( $array ) )
		return ( new ObjectifiedArray ( $array ) ) ;
	else
		error ( "The o() function accepts only ObjectifiedArray instances or arrays." ) ;
    }

/*==============================================================================================================

   On -
	A notational shortcut for : Chainer::On.
  
  ==============================================================================================================*/
function  On ( $value )
   {
	$chain 	=  new Chainer ( $value ) ;
	
	return ( $chain ) ;
    }


/*==============================================================================================================

   dateex -
	Extended date() function, which accepts a float for specifying microseconds.
  
  ==============================================================================================================*/
function  dateex ( $format, $timestamp )
   {
	return ( DateTime::DateEx ( $format, $timestamp ) ) ;
    }