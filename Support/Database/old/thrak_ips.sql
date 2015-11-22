/***************************************************************************************************

    NAME
	thrak_ips.sql

    DESCRIPTION
	Table that holds the list of ips who have made HTTP requests.

    AUTHOR
	Christian Vigh, 01/2014.

    HISTORY
    [Version : 1.0]		[Date : 2014/01/14]		[Author : CV]
	Initial release.

 ***************************************************************************************************/

-- IP logging, for each connection request
DROP TABLE IF EXISTS  thrak_ips ;

CREATE TABLE 	thrak_ips
    (
	ip_id 			INT 			NOT NULL AUTO_INCREMENT
							COMMENT 'Unique id for this Ip',
	ip_address		INT UNSIGNED		NOT NULL DEFAULT 0
							COMMENT 'Ip address',
	ip_time 		DOUBLE	 		NOT NULL DEFAULT 0
							COMMENT 'Ip connection time',
					
	PRIMARY KEY	by_id 			( ip_id ),
	KEY 	    	by_ip			( ip_address, ip_time ),
	KEY 	    	by_time			( ip_time, ip_address )
    )  ENGINE = MyISAM DEFAULT CHARSET latin1 COMMENT 'List of connected ips' ;
 							
-- Additional, variable-length data logging
DROP TABLE IF EXISTS 	 thrak_ips_data ;

CREATE TABLE 	thrak_ips_data
   (
	ipd_ip_id			INT			NOT NULL DEFAULT 0
								COMMENT 'Unique Ip logging identifier in the thrak_ips table',
	ipd_browser 			CHAR(16)		NOT NULL DEFAULT 'unknown'
								COMMENT 'Browser name',
	ipd_browser_version		INT UNSIGNED 		NOT NULL DEFAULT 0
								COMMENT 'Browser version',
	ipd_http_user_agent		VARCHAR(512)		NOT NULL DEFAULT ''
								COMMENT 'User-agent string',
	ipd_script_filename		VARCHAR(256)		NOT NULL DEFAULT ''
								COMMENT 'Called script filename',
	ipd_request_scheme		VARCHAR(32)		NOT NULL DEFAULT 'http'
								COMMENT 'Request scheme (protocol)',
	ipd_remote_port 		INT			NOT NULL DEFAULT 0
								COMMENT 'Remote port',
	ipd_query_string 		VARCHAR(2048)		NOT NULL DEFAULT ''
								COMMENT 'Query string',
							
	PRIMARY KEY 	by_id 			( ipd_ip_id ),
	KEY		by_browser		( ipd_browser, ipd_browser_version )
    )  ENGINE = MyISAM DEFAULT CHARSET latin1 COMMENT 'IP connection data' ;
