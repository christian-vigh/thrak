<?php
/**************************************************************************************************************

    NAME
        DocCommentPropertyWriteAnnotation.phpclass

    DESCRIPTION
        Implements an @PropertyWrite annotation.

    AUTHOR
        Christian Vigh, 11/2014.

    HISTORY
    [Version : 1.0]    [Date : 2014/11/09]     [Author : CV]
        Initial version.

 **************************************************************************************************************/
namespace 	Thrak\Reflection\Annotations ;

defined ( '__THRAK_SETUP__' ) or die ( "This file cannot be accessed directly." ) ;

use  	Thrak\System\Object ;
use	Thrak\Reflection\DocCommentAnnotation ;


/*==============================================================================================================

    DocCommentPropertyWriteAnnotation -
        Implements an @PropertyWrite annotation.
 
	Available members :
 	- type :
 		PropertyWriteeter type.
  
 	- name :
 		PropertyWriteeter name.
  
 	- description :
 		PropertyWrite description.

  ==============================================================================================================*/
class	DocCommentPropertyWriteAnnotation		extends  DocCommentAnnotation
   {
	public function  __construct ( $name, $PropertyWrites_array )
	   {
		parent::__construct ( $name, $PropertyWrites_array ) ;
	    }

	
	/*==============================================================================================================
	
	    __tostring -
	        Provides a formatted @PropertyWrite annotation.
	
	  ==============================================================================================================*/
	public function  __tostring ( )
	   {
		$result		=  "@" . $this -> Name ;
		
		if  ( $this -> Parameters -> type  !==  "" )
			$result		.=  " " . $this -> Parameters -> type ;
		
		if  ( $this -> Parameters -> name  !==  "" )
			$result		.=  " " . $this -> Parameters -> name ;
		
		if  ( $this -> Parameters -> description  !==  "" )
			$result		.=  " " . $this -> Parameters -> description ;
		
		return ( $result ) ;
	    }
    }