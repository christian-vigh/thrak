/***************************************************************************************************

    NAME
	thrak_blacklisted_ips.sql

    DESCRIPTION
	Table that holds the current list of blacklisted emails.

    AUTHOR
	Christian Vigh, 01/2014.

    HISTORY
    [Version : 1.0]		[Date : 2014/01/14]		[Author : CV]
	Initial release.

 ***************************************************************************************************/

-- Table creation
DROP TABLE IF EXISTS  thrak_blacklisted_ips ;

CREATE TABLE thrak_blacklisted_ips
    (
	blai_ip 		INT UNSIGNED 		NOT NULL DEFAULT 0
							COMMENT 'Blacklisted ip',
	blai_time		DOUBLE	 		NOT NULL DEFAULT 0
							COMMENT 'Blacklisting start time',
	blai_duration 		INT UNSIGNED 		NOT NULL DEFAULT 0xFFFFFFFF
							COMMENT 'Blacklist duration time for this ip',
							
	PRIMARY KEY 	    	by_ip			( blai_ip )
    )  ENGINE = MyISAM DEFAULT CHARSET latin1 COMMENT 'List of blacklisted ips' ;
 							
 							
