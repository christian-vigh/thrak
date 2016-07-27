<?php
	/***
		This is a small example to extract PO lines from one of your PDF samples. 
		It's not perfect because each PO line contains an article reference, and what seems to be a detailed description ; for example :
		
			431:4864Luna Woodtone
			48x64Luna Woodtone, 2" Vinyl Blind
			
		The problem is that they appear sequentially in the pdf flow, and since I'm not handling page layout, the second description will
		appear after the first one and before the "Quantity" and other columns of the same PO line.
		
		The output of this script will be an array of associative arrays containing the following elements :
		
		- 'vendor' :
			Vendor coordinates.
			
		- 'ship-to' :
			Recipient name and address.
			
		- 'order-number' :
			Purchase order number.
			
		- 'date' : 
			Purchase order date.
			
		- 'articles' :
			An array of associative arrays, one for each purchase order line, containing the following entries :
			
			- 'article' :
				The article reference, catenated with the article description
				
			- 'quantity' :
				Article quantity.
				
			- 'rate' :
				Article price.
				
			- 'amount' -:
				Total price for this PO line.
			
		I know that you do not require the 'rate' and 'amount' column, but since I'm using regular expressions, this was
		absolutely necessary to recognize a PO line (ie, an article reference - with its description - followed by 3 numbers).
		
		To adapt it to your needs, do the following :
		
		- Instantiate a PdfToText class object, without specifying any filename
		- Set the BlockSeparator property to a space. This property is set to an empty string by default, but may be useful for 
		  PDF files that contain tabular data.
		- Use the IsValidPO() function to determine if the PDF file comes from Mazer and is aimed at Achim Importing Co
		- Use the GetPOLines() function to retrieve an array of individual PO line information, as described above
	 ***/
		
	// Put the real location of the PdfToText.phpclass file here
	include ( "E:/Php/phpclasses.org/PdfToText/PdfToText.phpclass" ) ;

	// Regular expressions that are used by the IsValidPO() function to recognize if the PDF file comes from the right company (ISSUER) and
	// is aimed at the right company (DISTRIBUTOR)
	define ( 'ISSUER'	, '/Mazer \s+ Wholesale/ix' ) ;
	define ( 'DISTRIBUTER'	, '/Achim \s+ Importing \s+ Co/ix' ) ;
	
	// Name of the PDF file to process
	$file 			=  "Purchase_Order_5106_from_Mazer_Wholesale.pdf" ;
	
	// Instantiate a PdfToText class, don't forget to set the BlockSeparator property to a non-empty-string (otherwise, some quantities will
	// appear catenated to article description), then load pdf text contents
	$pdf 			=  new PdfToText ( ) ;
	$pdf -> BlockSeparator 	=  " " ;
	$pdf -> Load ( $file ) ;
	
	// Check if the current PO is for us
	if  ( ( $start = IsValidPO ( $pdf, $po_info ) )  !==  false )
	   {
		// IsValidPO() returns the text index immediately after the last column header, "AMOUNT"
		$po_text 	=  substr ( $pdf -> Text, $start ) ;
		
		// Retrieve PO lines
		GetPOLines ( $po_text, $po_info ) ;
		
		// Print them - that's all !
		print_r ( $po_info ) ;
	    }
	
	
	// The IsValidPO functino checks if the pdf contents represent a PO emitted by ISSUER and aimed at DISTRIBUTOR.
	// It returns the index of the text immediately after the "AMOUNT" column header
	function  IsValidPO ( $pdf, &$po_info )
	   {
		static 	$header_re 	=  '#
						VENDOR \s+ (?P<vendor> .*?) \s+
						SHIP \s+ TO \s+ (?P<shipto> .*? )  \s+
						P\.O\. \s+ NO\. \s+ (?P<number> \d+) \s+
						DATE \s+ (?P<date> \d+/\d+/\d+)
					    #imsx' ;
		
		$po_info 	=  [] ;
		
					    
		if  ( preg_match ( ISSUER, $pdf -> Text )  &&  preg_match ( DISTRIBUTER, $pdf -> Text ) )
		   {
			$index 	=  strpos ( $pdf -> Text, "AMOUNT" ) ;
			
			if  ( $index  !==  false )
			   {
				if  ( preg_match ( $header_re, $pdf -> Text, $match ) )
				   {
					$po_info [ 'vendor' ]		=  $match [ 'vendor' ] ;
					$po_info [ 'ship-to' ] 		=  $match [ 'shipto' ] ;
					$po_info [ 'order-number' ]	=  $match [ 'number' ] ;
					$po_info [ 'date' ]		=  $match [ 'date'   ] ;
					
					return ( $index + 7 ) ;
				    }
			    }
		    }
		    
		return ( false ) ;
	    }
	    
	    
	// The GetPOLines() function extracts data from individual lines coming from the purchase order.
	// See the header file comments for an explanation of the returned value.
	function  GetPOLines ( $text, &$po_info )
	   {
		static 	$line_re 	=  '/
						(?P<article> .*?)
						\s+
						(?P<quantity> \d+ (\. \d+)? )
						\s+
						(?P<rate> \d+ (\. \d+)? )
						\s+
						(?P<amount> \d+ (\. \d+)? )
						\s+
					    /imsx' ;
					    
		if  ( ! preg_match_all ( $line_re, $text, $matches ) )
			return ( false ) ;
		
		// Extract information from the match result and group them line by line
		$po_lines 	=  [] ;
		
		for  ( $i = 0, $count = count ( $matches [ 'article' ] ) ; $i  <  $count ; $i ++ )
		   {
			$po_lines [] 	=
			   [
				'article' 	=>  preg_replace ( '/\s+/', ' ', $matches [ 'article'  ] [$i] ),	// Some duplicate spaces may have been inserted by the extraction process, so remove them
				'quantity'	=>  $matches [ 'quantity' ] [$i],
				'rate' 		=>  $matches [ 'rate'     ] [$i],
				'amount' 	=>  $matches [ 'amount'   ] [$i]
			    ] ;
		    }
		    
		// All done, return
		$po_info [ 'articles' ] 	=  $po_lines ;
	    }