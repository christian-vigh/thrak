<?php
	include ( '../../PdfToText.phpclass' ) ;

	function  output ( $message )
	   {
		if  ( php_sapi_name ( )  ==  'cli' )
			echo ( $message ) ;
		else
			echo ( nl2br ( $message ) ) ;
	    }

	$file	=  'Error2' ;
	$pdf	=  new PdfToText ( "$file.pdf" ) ;


	
	$raj = explode( "\n", $pdf -> Text);
	//service tax 37
	//Egas 22
	//VAt 37
	//wealthtax 28
	for ($x = 0; $x <= 28; $x++) {
		echo "Line Number is $x:$raj[$x]   <br>";
	} 
	$crs = 0;
	$crs = $crs + 1;
	$useful1 = substr($raj[$crs], 7);	
	$useful1a = substr($raj[$crs],2,3);	
	$crs = $crs + 1;
	$useful2 = substr($raj[$crs], 15);	
	$crs = $crs + 1;
	$useful3 = substr($raj[$crs], 6);	
	$crs = $crs + 1;
	$useful4 = substr($raj[$crs], 12);	
	$crs = $crs + 2;
	$useful6 = substr($raj[$crs], 35);	
	$crs = $crs + 5;
		$length = count($raj);
		for ($i = 0; $i < $length; $i++) {
		
		if (trim($raj[$i]) ==  trim("DEDUCTEES[0021]"))
		{

		$crs = $i;
		}
		}
		$crs = $crs +3;
		$favcolor = trim($raj[$crs]);

switch ($favcolor) {
    case "Nature of payment :Interest other than":
		$crs = $crs + 1;
		$useful11= (trim($raj[$crs]));	
		break;
    case "Nature of payment :Payment of Employees":
       $crs = $crs + 1;
	    $useful11= trim($raj[$crs]);	
       break;
	case "Nature of payment :Payment of contractors":
       $crs = $crs + 1;
	    $useful11= trim($raj[$crs]);	
       break;
	   	case "Nature of payment :Commission or":
       $crs = $crs + 1;
	    $useful11= trim($raj[$crs]);	
       break;
	   case "Nature of payment :Fees for Professional or":
       $crs = $crs + 1;
	    $useful11= trim($raj[$crs]);	
       break;
	   case "Nature of payment :Rent[94I]":
        $tempsection = explode(":" , $raj[$crs]);
		$useful11 =$tempsection[1];
        break;
    default:
	//$tempsection = explode(":" , $raj[$crs]);
	$crs = $crs + 1;
	
}

	
	if (trim($raj[$crs]) !=  trim("For the assessment"))
	{
	$crs = $crs + 1;
	}		
	$crs = $crs + 2;
	$useful14 = $raj[$crs];	
	
	 $crs = $crs + 3;
	//NOw CRS 15
	$tempsection = explode(":" , $raj[$crs]);

	if (trim($tempsection[0]) ==  trim("SBI Ref No."))
	{
	$useful17 = $tempsection[1];
	}
	$crs = $crs + 5;
	$useful22 = $raj[$crs];	
	//NOw CRS 18
	$crs = $crs + 2;
	$useful24 = substr($raj[$crs], 9);	

	
		echo "<tr>";
	echo "<td>Line 1 $useful1</td>";
	echo "<td>Line 1a $useful1a</td>";
	echo "<td>Line 2 $useful2</td>";
	echo "<td>Line 3 $useful3</td>";
	echo "<td>Line 4 $useful4</td>";
	echo "<td>Line 11 $useful11</td>";
	echo "<td>Line 14 $useful14</td>";
	echo "<td>Line 17 $useful17</td>";
	echo "<td>Line 22 $useful22</td>";
	echo "<td>Line 24 $useful24</td>";

	echo "</tr>";



	
	
?>
	
	