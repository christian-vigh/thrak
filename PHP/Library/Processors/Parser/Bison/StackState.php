<?php
/***************************************************************************************************

    NAME
	StackState.phpclass

    DESCRIPTION
	Holds a stack state for the Bison grammatical parser.

    AUTHOR
	Christian Vigh, 05/2013.

    HISTORY
    [Version : 1.0]		[Date : 2013/05/14]		[Author : CV]
	Initial release.

 ***************************************************************************************************/
namespace 	Thrak\Processors\Parser\Bison ;

defined ( '__THRAK_SETUP__' ) or die ( "This file cannot be accessed directly." ) ;

// Used namespaces & objects
use 		Thrak\System\Object ;
use 		Thrak\System\Exception ;
use 		Thrak\Types\StringUtilities ;
use		Thrak\IO\Path ;




/*==================================================================================================

    StackState class -
	Holds a stack state for the Bison grammatical parser.

  ==================================================================================================*/
class  StackState	extends  Object
   {
   	// Bison state number
  	public 		$StateNumber 		=  null ;
  	// Token symbol
  	public  	$Token 			=  null ;
  	// Parsed symbol (only filled after reduction)
  	public  	$Symbol 		=  null ;


	/*-------------------------------------------------------------------------------------------

	    NAME
		Constructor - Creates a grammar state.

	    PROTOTYPE
	    	$state	=  new StackState ( $state_number, $token ) ;

	    DESCRIPTION
	    	Creates a stack state.

	    PARAMETERS
		$state_number (integer)  -
			Bison state number.

		$token (lexer token) -
			Lexer token, as returned by the Lexer class.

	 --------------------------------------------------------------------------------------------*/
  	function __construct  ( $state_number, $token )
           {
                $this -> StateNumber	=  $state_number;
                $this -> Token		=  $token ;
            }
   }