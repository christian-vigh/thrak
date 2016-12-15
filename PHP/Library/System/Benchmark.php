<?php
/***************************************************************************************************

    NAME
	Benchmark.phpclass

    DESCRIPTION
	A set of classes for running a benchmark.
	
    AUTHOR
	Christian Vigh, 01/2014.

    HISTORY
    [Version : 1.0]		[Date : 2014/01/08]		[Author : CV]
	Initial release.

 ***************************************************************************************************/
namespace 	Thrak\System ;

defined ( '__THRAK_SETUP__' ) or die ( "This file cannot be accessed directly." ) ;

// Used namespaces & objects
use 		Thrak\System\Object ;
use		Thrak\Types\StringUtilities ;
use		Thrak\IO\Path ;
use		Thrak\System\Timer ;


/*==============================================================================================================

    Benchmark -
        Implements a group of Benchmark items.

  ==============================================================================================================*/
class  Benchmark	extends		Object
			implements	\ArrayAccess,   \Countable, \IteratorAggregate
   {
	// Benchark name
	public		$Name ;
	// Benchmark items 
	private		$BenchmarkItems			=  array ( ) ;
	// Timer 
	private		$Timer				=  null ;
	// Precisions of the results provided by the Timer object
	private		$UpperPrecision	;
	private		$LowerPrecision ;
	// Custom timer columns
	private		$CustomColumns			=  array ( ) ;
	

	/**************************************************************************************************************
	 **************************************************************************************************************
	 **************************************************************************************************************
	 ******                                                                                                  ******
	 ******                                                                                                  ******
	 ******                                      PUBLIC METHODS                                              ******
	 ******                                                                                                  ******
	 ******                                                                                                  ******
	 **************************************************************************************************************
	 **************************************************************************************************************
	 **************************************************************************************************************/

	/*==============================================================================================================
	
	    CONSTRUCTOR
	        Initializes the Benchmark object.
	
	    PROTOTYPE
	        $bench			=  new  $Benchmark ( $name = 'Benchmark', $items = null,
								$upper_precision = null, $lower_precision = null ) ;
		$bench []		=  new SomeBenchmarkItemClass ( ... ) ;
		$bench [10]		=  new SomeBenchmarkItemClass ( ... ) ;
		$bench [ 'TestSpeed' ]	=  new SomeBenchmarkItemClass ( ... ) ;
		$bench -> Run ( ) ;
		echo $Bench -> Report ( ) ;
	
	    DESCRIPTION
	        The constructor instanciates a Benchmark object and accepts an optional benchmark object array.
		However, additional benchmark items can later be added by accessing the Benchmark object as an array.
		The Run() method will execute each individual benchmark item, and the Report() method will return
		a formatted result of the various item executions.
	
	    PARAMETERS
		$name (string) -
			Benchmark name.
			
	        $items (array) -
	                Array of benchmark items. Additional items can be added later by accessing the Benchmark object
			as an array. A single benchmark item can also be passed without being an array, too.
			
		$upper_precision, $lower_precision (integer) -
			One of the TTS_UNIT_* constants defined in String.phpclass, that supplies the minimum and maximum
			precision of the results reported by the Timer object.
	
	  ==============================================================================================================*/
	public function  __construct ( $name = 'Benchmark', $items = null, $upper_precision = null, $lower_precision = null )
	   {
		parent::__construct ( $name ) ;
		
		$this -> Name		=  $name ;
		$this -> LowerPrecision	=  $lower_precision ;
		$this -> UpperPrecision	=  $upper_precision ;
		
		if  ( $items )
		   {
			if   ( $items instanceof BenchmarkItem )
				$items	=  array ( $items ) ;
				
			foreach  ( $items  as  $item )
				$this []	=  $item ;
		    }
	    }
	    
	    
	/*==============================================================================================================
	
	    NAME
	        AddCustomColumn - Adds a custom column for the final timer report.
	
	    PROTOTYPE
	        $timer -> AddCustomColumn ( $def ) ;
	
	    DESCRIPTION
	        Adds a custom column definition to the final timer report.
	
	    PARAMETERS
	        $def (array) -
	                A column definition array in a format accepted by the AsciiReport object.
	
	  ==============================================================================================================*/
	public function  AddCustomColumn ( $def )
	   {
		$this -> CustomColumns []	=  $def ;
	    }
	    
	   
	/*==============================================================================================================
	
	    NAME
	        Report - Generate a report of the timed instructions.
	
	    PROTOTYPE
	        echo $bench -> Report ( ) ;
	
	    DESCRIPTION
	        Generates an ascii report showing the collected 
	
	    RETURN VALUE
	        The text that contains the report.
	
	  ==============================================================================================================*/
	public function  Report ( )
	   {
		if  ( ! $this -> Timer ) 
			error ( new \Thrak\System\RuntimeException ( "Reporting requested, but not benchmark has been started yet." ) ) ;
			
		return ( $this -> Timer -> Report ( ) ) ;
	    }
	    
	    
	/*==============================================================================================================
	
	    NAME
	        Run - Runs the different benchmark items.
	
	    PROTOTYPE
	        $bench -> Run ( ) ;
	
	    DESCRIPTION
	        Runs the different benchmark items. You can later use the Report() function to retrieve the results as
		a formatted string.
	
	  ==============================================================================================================*/
	public function  Run ( )
	   {
		// Complain if no benchmark
		if   ( ! count ( $this -> BenchmarkItems ) )
			error ( new \Thrak\System\RuntimeException ( "No benchmarks to run." ) ) ;
			
		// Create the timer object
		$this -> Timer	=  new  Timer ( true, $this -> Name . ' started', $this -> UpperPrecision, $this -> LowerPrecision ) ;
		
		// Add custom columns if any
		if  ( count ( $this -> CustomColumns ) )
		   {
			foreach  ( $this -> CustomColumns  as  $column )
				$this -> Timer -> AddCustomColumn ( $column ) ;
		    }
		
		// Run each benchmark item sequentially and collect the results
		foreach ( $this -> BenchmarkItems  as  $item )
		   {
			$item -> DoRun ( $this -> Timer ) ;
		    }

		// Stop the timer
		$this -> Timer -> Stop ( $this -> Name . ' ended' ) ;
	    }
	

	/**************************************************************************************************************
	 **************************************************************************************************************
	 **************************************************************************************************************
	 ******                                                                                                  ******
	 ******                                                                                                  ******
	 ******                                   INTERFACE IMPLEMENTATIONS                                      ******
	 ******                                                                                                  ******
	 ******                                                                                                  ******
	 **************************************************************************************************************
	 **************************************************************************************************************
	 **************************************************************************************************************/

	/*-------------------------------------------------------------------------------------------

		Countable interface.

	 --------------------------------------------------------------------------------------------*/

	// count -
	//	Returns the number of array elements.
	public function  count ( )
	   {
		return ( count ( $this -> BenchmarkItems ) ) ;
	    }


	/*-------------------------------------------------------------------------------------------

		ArrayAccess interface.
		A benchmark item can be accessed either through 

	 --------------------------------------------------------------------------------------------*/

	// __offset_get_item -
	//	Returns a benchmark item accessed either through its index or its benchmark item name.
	//	Returns false if the specified offset does not exist.
	private function  __offset_get_item ( $offset )
	   {
		if  ( isset ( $this -> BenchmarkItems [ $offset ] ) )
			return ( $this -> BenchmarkItems [ $offset ] ) ;
		else
		   {
			$loffset	=  strtolower ( $offset ) ;
			
			foreach  ( $this -> BenchmarkItems  as  $item )
			   {
				if  ( ! strtolower ( $item -> Name, $loffset ) )
					return ( $item ) ;
			    }
			    
			return ( false ) ;
		    }
	    }
	 
	    
 	// offsetExists -
 	//	Checks if the specified offset exists.
	 public function  offsetExists ( $offset )
	    {
		return ( $this -> __offset_get_item ( $offset )  !==  false ) ;
	     }
	     

   	// offsetGet -
   	//	Gets the value at the specified offset.
   	public function  offsetGet ( $offset )
   	   {
		$item	=  $this -> __offset_get_item ( $offset ) ;
		
		if  ( $item  ===  false )
		   {
			error ( new \Thrak\System\RuntimeException ( "Undefined offset : $offset.", E_NOTICE ) ) ;
			return ( null ) ;
		    }
			
		return ( $item ) ;
   	    }
	       

  	// offsetSet -
  	//	Sets the specified array item to the specified value.
  	public function  offsetSet ( $offset, $value )
  	   {
		if  ( $value instanceof BenchmarkItem )
			$this -> BenchmarkItems [ $offset ]	=  $value ;
		else
			error ( new \Thrak\System\RuntimeException ( "Only BenchmarkItem objects can be added to a Benchmark object." ) ) ;
  	    }


  	// offsetUnset -
  	//	Unsets the specified array entry.
  	public function  offsetUnset ( $offset )
  	   {
		unset ( $this -> BenchmarkItems [ $offset ] ) ;
  	    }


	/*-------------------------------------------------------------------------------------------

		Iterator interface.

	 --------------------------------------------------------------------------------------------*/
	public function getIterator ( )
	   {
		return ( new ArrayIterator ( $this -> BenchmarkItems ) ) ;
	    }
    }
    
    
    
abstract class	AbstractBenchmarkItem	extends  Object
    {
	protected	$Name ;
	
	
	public function  __construct ( $name )
	   {
		$this -> Name	=  $name ;
	    }
	    
	    
	protected function  DoRun  ( $timer )
	   {
		$custom_values	=  $this -> Run ( ) ;
		
		if  ( ! $custom_values )
			$custom_values	=  array ( ) ;
			
		$timer -> Step ( $this -> Name, $custom_values ) ;
	    }
	    
	    
	protected abstract function  Run ( $timer ) ;
     }
 
     
 class  BenchmarkIteratorItem	extends  AbstractBenchmarkItem
    {
	protected	$Iterations ;
	
	
	public function  __construct ( $name, $count )
	   {
		parent::__construct ( $name ) ;
		$this -> Iterations	=  $count ;
	    }
	    
	    
	protected function  DoRun ( $timer )
	   {
		
	    }
     }
 