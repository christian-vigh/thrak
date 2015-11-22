/***************************************************************************************************

    NAME
	Procedures.sql
	
    DESCRIPTION
	Creates the stored procedures used by the Thrak framework.

    AUTHOR
    	Christian Vigh, 2014.
	
    HISTORY
    [Version : 1.0]		[Date : 2010/03/28]		[Author : CV]
    	Initial release.
    	
    [Version : 2.0]		[Date : 2014/01/20]		[Author : CV]
	Ported to the thrak version 2 framework.
	
 ****************************************************************************************************/


/*===================================================================================================

	PROCEDURE thrak_query -
		Executes a non-parameterized query. This can be useful in cases of a CREATE TABLE or
		DROP TABLE statement, which seems to generate syntax errors when used from within a
		stored procedure.
        
  ===================================================================================================*/
DELIMITER {}
CREATE PROCEDURE thrak_query ( IN  Query 	TEXT )
	SQL SECURITY INVOKER
	READS SQL DATA
	COMMENT 'Executes a non-parameterized query'
     BEGIN
	-- Prepare parameters
	SET @SQL = Query ;

	-- Prepare the statement
	PREPARE  Statement  FROM  @SQL ;

	-- Execute it
	EXECUTE Statement ;

	-- Deallocate
	DEALLOCATE PREPARE  Statement ;
     END {}
DELIMITER ;


/*===================================================================================================

	PROCEDURE thrak_parameterized_query -
		Executes a parameterized query with up to 12 parameters.
		Unused parameters has to be set to NULL.
        
  ===================================================================================================*/
DELIMITER {}
CREATE PROCEDURE thrak_parameterized_query_1 
		   ( 
			  IN  Query  		TEXT, 
			  IN  Param1 		TEXT
		    )
		SQL SECURITY INVOKER
		READS SQL DATA
		COMMENT 'Executes a parameterized query with 1 parameter'
     BEGIN
	-- Prepare parameters
	SET @SQL = Query ;
	SET @P01 = Param1 ;

	-- Prepare the statement
	PREPARE  Statement  FROM  @SQL ;

	-- Execute it
	EXECUTE Statement USING @P01 ;

	-- Deallocate
	DEALLOCATE PREPARE  Statement ;
     END {}
DELIMITER ;

DELIMITER {}
CREATE PROCEDURE thrak_parameterized_query_2
		   ( 
			  IN  Query  		VARCHAR (4096), 
			  IN  Param1 		VARCHAR (1024),
			  IN  Param2 		VARCHAR (1024)
		    )
		SQL SECURITY INVOKER
		READS SQL DATA
		COMMENT 'Executes a parameterized query with 2 parameters'
     BEGIN
	-- Prepare parameters
	SET @SQL = Query ;
	SET @P01 = Param1 ;
	SET @P02 = Param2 ;

	-- Prepare the statement
	PREPARE  Statement  FROM  @SQL ;

	-- Execute it
	EXECUTE Statement USING @P01, @P02 ;

	-- Deallocate
	DEALLOCATE PREPARE  Statement ;
     END {}
DELIMITER ;

DELIMITER {}
CREATE PROCEDURE thrak_parameterized_query_3
		   ( 
			  IN  Query  		VARCHAR (4096), 
			  IN  Param1 		VARCHAR (1024),
			  IN  Param2 		VARCHAR (1024),
			  IN  Param3 		VARCHAR (1024)
		    )
		SQL SECURITY INVOKER
		READS SQL DATA
		COMMENT 'Executes a parameterized query with 3 parameters'
     BEGIN
	-- Prepare parameters
	SET @SQL = Query ;
	SET @P01 = Param1 ;
	SET @P02 = Param2 ;
	SET @P03 = Param3 ;

	-- Prepare the statement
	PREPARE  Statement  FROM  @SQL ;

	-- Execute it
	EXECUTE Statement USING @P01, @P02, @P03 ;

	-- Deallocate
	DEALLOCATE PREPARE  Statement ;
     END {}
DELIMITER ;

DELIMITER {}
CREATE PROCEDURE thrak_parameterized_query_4
		   ( 
			  IN  Query  		VARCHAR (4096), 
			  IN  Param1 		VARCHAR (1024),
			  IN  Param2 		VARCHAR (1024),
			  IN  Param3 		VARCHAR (1024),
			  IN  Param4 		VARCHAR (1024)
		    )
		SQL SECURITY INVOKER
		READS SQL DATA
		COMMENT 'Executes a parameterized query with 4 parameters'
     BEGIN
	-- Prepare parameters
	SET @SQL = Query ;
	SET @P01 = Param1 ;
	SET @P02 = Param2 ;
	SET @P03 = Param3 ;
	SET @P04 = Param4 ;

	-- Prepare the statement
	PREPARE  Statement  FROM  @SQL ;

	-- Execute it
	EXECUTE Statement USING @P01, @P02, @P03, @P04 ;

	-- Deallocate
	DEALLOCATE PREPARE  Statement ;
     END {}
DELIMITER ;

DELIMITER {}
CREATE PROCEDURE thrak_parameterized_query_5
		    ( 
			  IN  Query  		VARCHAR (4096), 
			  IN  Param1 		VARCHAR (1024),
			  IN  Param2 		VARCHAR (1024),
			  IN  Param3 		VARCHAR (1024),
			  IN  Param4 		VARCHAR (1024),
			  IN  Param5 		VARCHAR (1024)
		     )
		SQL SECURITY INVOKER
		READS SQL DATA
		COMMENT 'Executes a parameterized query with 5 parameters'
     BEGIN
	-- Prepare parameters
	SET @SQL = Query ;
	SET @P01 = Param1 ;
	SET @P02 = Param2 ;
	SET @P03 = Param3 ;
	SET @P04 = Param4 ;
	SET @P05 = Param5 ;

	-- Prepare the statement
	PREPARE  Statement  FROM  @SQL ;

	-- Execute it
	EXECUTE Statement USING @P01, @P02, @P03, @P04, @P05 ;

	-- Deallocate
	DEALLOCATE PREPARE  Statement ;
     END {}
DELIMITER ;

DELIMITER {}
CREATE PROCEDURE thrak_parameterized_query_6
		   ( 
			  IN  Query  		VARCHAR (4096), 
			  IN  Param1 		VARCHAR (1024),
			  IN  Param2 		VARCHAR (1024),
			  IN  Param3 		VARCHAR (1024),
			  IN  Param4 		VARCHAR (1024),
			  IN  Param5 		VARCHAR (1024),
			  IN  Param6 		VARCHAR (1024)
		    )
		SQL SECURITY INVOKER
		READS SQL DATA
		COMMENT 'Executes a parameterized query with 6 parameters'
     BEGIN
	-- Prepare parameters
	SET @SQL = Query ;
	SET @P01 = Param1 ;
	SET @P02 = Param2 ;
	SET @P03 = Param3 ;
	SET @P04 = Param4 ;
	SET @P05 = Param5 ;
	SET @P06 = Param6 ;

	-- Prepare the statement
	PREPARE  Statement  FROM  @SQL ;

	-- Execute it
	EXECUTE Statement USING @P01, @P02, @P03, @P04, @P05, @P06 ;

	-- Deallocate
	DEALLOCATE PREPARE  Statement ;
     END {}
DELIMITER ;

DELIMITER {}
CREATE PROCEDURE thrak_parameterized_query_7
		   ( 
			  IN  Query  		VARCHAR (4096), 
			  IN  Param1 		VARCHAR (1024),
			  IN  Param2 		VARCHAR (1024),
			  IN  Param3 		VARCHAR (1024),
			  IN  Param4 		VARCHAR (1024),
			  IN  Param5 		VARCHAR (1024),
			  IN  Param6 		VARCHAR (1024),
			  IN  Param7 		VARCHAR (1024)
		    )
		SQL SECURITY INVOKER
		READS SQL DATA
		COMMENT 'Executes a parameterized query with 7 parameters'
     BEGIN
	-- Prepare parameters
	SET @SQL = Query ;
	SET @P01 = Param1 ;
	SET @P02 = Param2 ;
	SET @P03 = Param3 ;
	SET @P04 = Param4 ;
	SET @P05 = Param5 ;
	SET @P06 = Param6 ;
	SET @P07 = Param7 ;

	-- Prepare the statement
	PREPARE  Statement  FROM  @SQL ;

	-- Execute it
	EXECUTE Statement USING @P01, @P02, @P03, @P04, @P05, @P06, @P07 ;

	-- Deallocate
	DEALLOCATE PREPARE  Statement ;
     END {}
DELIMITER ;

DELIMITER {}
CREATE PROCEDURE thrak_parameterized_query_8
		   ( 
			  IN  Query  		VARCHAR (4096), 
			  IN  Param1 		VARCHAR (1024),
			  IN  Param2 		VARCHAR (1024),
			  IN  Param3 		VARCHAR (1024),
			  IN  Param4 		VARCHAR (1024),
			  IN  Param5 		VARCHAR (1024),
			  IN  Param6 		VARCHAR (1024),
			  IN  Param7 		VARCHAR (1024),
			  IN  Param8 		VARCHAR (1024)
		    )
		SQL SECURITY INVOKER
		READS SQL DATA
		COMMENT 'Executes a parameterized query with 8 parameters'
     BEGIN
	-- Prepare parameters
	SET @SQL = Query ;
	SET @P01 = Param1 ;
	SET @P02 = Param2 ;
	SET @P03 = Param3 ;
	SET @P04 = Param4 ;
	SET @P05 = Param5 ;
	SET @P06 = Param6 ;
	SET @P07 = Param7 ;
	SET @P08 = Param8 ;

	-- Prepare the statement
	PREPARE  Statement  FROM  @SQL ;

	-- Execute it
	EXECUTE Statement USING @P01, @P02, @P03, @P04, @P05, @P06, @P07, @P08 ;

	-- Deallocate
	DEALLOCATE PREPARE  Statement ;
     END {}
DELIMITER ;

DELIMITER {}
CREATE PROCEDURE thrak_parameterized_query_9
		   ( 
			  IN  Query  		VARCHAR (4096), 
			  IN  Param1 		VARCHAR (1024),
			  IN  Param2 		VARCHAR (1024),
			  IN  Param3 		VARCHAR (1024),
			  IN  Param4 		VARCHAR (1024),
			  IN  Param5 		VARCHAR (1024),
			  IN  Param6 		VARCHAR (1024),
			  IN  Param7 		VARCHAR (1024),
			  IN  Param8 		VARCHAR (1024),
			  IN  Param9 		VARCHAR (1024)
		    )
		SQL SECURITY INVOKER
		READS SQL DATA
		COMMENT 'Executes a parameterized query with 9 parameters'
     BEGIN
	-- Prepare parameters
	SET @SQL = Query ;
	SET @P01 = Param1 ;
	SET @P02 = Param2 ;
	SET @P03 = Param3 ;
	SET @P04 = Param4 ;
	SET @P05 = Param5 ;
	SET @P06 = Param6 ;
	SET @P07 = Param7 ;
	SET @P08 = Param8 ;
	SET @P09 = Param9 ;

	-- Prepare the statement
	PREPARE  Statement  FROM  @SQL ;

	-- Execute it
	EXECUTE Statement USING @P01, @P02, @P03, @P04, @P05, @P06, @P07, @P08, @P09 ;

	-- Deallocate
	DEALLOCATE PREPARE  Statement ;
     END {}
DELIMITER ;

DELIMITER {}
CREATE PROCEDURE thrak_parameterized_query_10
		   ( 
			  IN  Query  		VARCHAR (4096), 
			  IN  Param1 		VARCHAR (1024),
			  IN  Param2 		VARCHAR (1024),
			  IN  Param3 		VARCHAR (1024),
			  IN  Param4 		VARCHAR (1024),
			  IN  Param5 		VARCHAR (1024),
			  IN  Param6 		VARCHAR (1024),
			  IN  Param7 		VARCHAR (1024),
			  IN  Param8 		VARCHAR (1024),
			  IN  Param9 		VARCHAR (1024),
			  IN  Param10 		VARCHAR (1024)
		    )
		SQL SECURITY INVOKER
		READS SQL DATA
		COMMENT 'Executes a parameterized query with 10 parameters'
     BEGIN
	-- Prepare parameters
	SET @SQL = Query ;
	SET @P01 = Param1 ;
	SET @P02 = Param2 ;
	SET @P03 = Param3 ;
	SET @P04 = Param4 ;
	SET @P05 = Param5 ;
	SET @P06 = Param6 ;
	SET @P07 = Param7 ;
	SET @P08 = Param8 ;
	SET @P09 = Param9 ;
	SET @P10 = Param10 ;

	-- Prepare the statement
	PREPARE  Statement  FROM  @SQL ;

	-- Execute it
	EXECUTE Statement USING @P01, @P02, @P03, @P04, @P05, @P06, @P07, @P08, @P09, @P10 ;

	-- Deallocate
	DEALLOCATE PREPARE  Statement ;
     END {}
DELIMITER ;

DELIMITER {}
CREATE PROCEDURE thrak_parameterized_query_11
		   ( 
			  IN  Query  		VARCHAR (4096), 
			  IN  Param1 		VARCHAR (1024),
			  IN  Param2 		VARCHAR (1024),
			  IN  Param3 		VARCHAR (1024),
			  IN  Param4 		VARCHAR (1024),
			  IN  Param5 		VARCHAR (1024),
			  IN  Param6 		VARCHAR (1024),
			  IN  Param7 		VARCHAR (1024),
			  IN  Param8 		VARCHAR (1024),
			  IN  Param9 		VARCHAR (1024),
			  IN  Param10 		VARCHAR (1024),
			  IN  Param11 		VARCHAR (1024)
		    )
		SQL SECURITY INVOKER
		READS SQL DATA
		COMMENT 'Executes a parameterized query with 11 parameters'
     BEGIN
	-- Prepare parameters
	SET @SQL = Query ;
	SET @P01 = Param1 ;
	SET @P02 = Param2 ;
	SET @P03 = Param3 ;
	SET @P04 = Param4 ;
	SET @P05 = Param5 ;
	SET @P06 = Param6 ;
	SET @P07 = Param7 ;
	SET @P08 = Param8 ;
	SET @P09 = Param9 ;
	SET @P10 = Param10 ;
	SET @P11 = Param11 ;

	-- Prepare the statement
	PREPARE  Statement  FROM  @SQL ;

	-- Execute it
	EXECUTE Statement USING @P01, @P02, @P03, @P04, @P05, @P06, @P07, @P08, @P09, @P10, @P11 ;

	-- Deallocate
	DEALLOCATE PREPARE  Statement ;
     END {}
DELIMITER ;

DELIMITER {} ;
CREATE PROCEDURE thrak_parameterized_query_12
		   ( 
			  IN  Query  		VARCHAR (4096), 
			  IN  Param1 		VARCHAR (1024),
			  IN  Param2 		VARCHAR (1024),
			  IN  Param3 		VARCHAR (1024),
			  IN  Param4 		VARCHAR (1024),
			  IN  Param5 		VARCHAR (1024),
			  IN  Param6 		VARCHAR (1024),
			  IN  Param7 		VARCHAR (1024),
			  IN  Param8 		VARCHAR (1024),
			  IN  Param9 		VARCHAR (1024),
			  IN  Param10 		VARCHAR (1024),
			  IN  Param11 		VARCHAR (1024),
			  IN  Param12 		VARCHAR (1024)
		    )
		SQL SECURITY INVOKER
		READS SQL DATA
		COMMENT 'Executes a parameterized query with 12 parameters'
     BEGIN
	-- Prepare parameters
	SET @SQL = Query ;
	SET @P01 = Param1 ;
	SET @P02 = Param2 ;
	SET @P03 = Param3 ;
	SET @P04 = Param4 ;
	SET @P05 = Param5 ;
	SET @P06 = Param6 ;
	SET @P07 = Param7 ;
	SET @P08 = Param8 ;
	SET @P09 = Param9 ;
	SET @P10 = Param10 ;
	SET @P11 = Param11 ;
	SET @P12 = Param12 ;

	-- Prepare the statement
	PREPARE  Statement  FROM  @SQL ;

	-- Execute it
	EXECUTE Statement USING @P01, @P02, @P03, @P04, @P05, @P06, @P07, @P08, @P09, @P10, @P11, @P12 ;

	-- Deallocate
	DEALLOCATE PREPARE  Statement ;
     END {}
DELIMITER ;

