/***************************************************************************************************

    NAME
	thrak_blacklist_log.sql

    DESCRIPTION
	Log table that logs any attempt of blacklisted domains, emails and ip addresses.

    AUTHOR
	Christian Vigh, 01/2014.

    HISTORY
    [Version : 1.0]		[Date : 2014/01/14]		[Author : CV]
	Initial release.

 ***************************************************************************************************/

-- Blacklist log. This table contains only fixed-size data to allow for faster searches.
DROP TABLE IF EXISTS  thrak_blacklist_log ;

CREATE TABLE thrak_blacklist_log
    (
	blal_id 		INT 			NOT NULL AUTO_INCREMENT 
							COMMENT 'Log entry unique id',
	blal_entry_type		ENUM ( 'domain', 'email', 'ip' )
							NOT NULL
							COMMENT 'Log entry type',
	blal_entry_id 		INT 			NOT NULL DEFAULT 0
							COMMENT 'Entry id in its original table : blacklisted domains, emails or ips',
	blal_entry_time 	TIMESTAMP 		NOT NULL
							COMMENT 'Entry log time (ie, the time the blacklisted item was detected)',
							
	PRIMARY KEY 	by_id			( blal_id ),
	KEY 	    	by_time			( blal_entry_time, blal_entry_type ),
	KEY 	    	by_type			( blal_entry_type, blal_entry_time )
    )  ENGINE = MyISAM DEFAULT CHARSET latin1 COMMENT 'List of connected ips' ;
 							
							
-- Blacklist log variable data. 
DROP TABLE IF EXISTS  thrak_blacklist_variable_log ;

CREATE TABLE thrak_blacklist_variable_log
    (
	blavl_blacklist_id 	INT 			NOT NULL DEFAULT 0
							COMMENT 'Unique id in thrak_blacklist_log',
	blavl_data		TEXT 			NOT NULL
							COMMENT 'Various data, such as $_SERVER, $_POST, etc.',
							
	PRIMARY KEY 	by_id			( blavl_blacklist_id )
    )  ENGINE = MyISAM DEFAULT CHARSET latin1 COMMENT 'List of connected ips' ;
