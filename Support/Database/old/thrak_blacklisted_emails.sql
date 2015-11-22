/***************************************************************************************************

    NAME
	thrak_blacklisted_emails.sql

    DESCRIPTION
	Table that holds the current list of blacklisted emails.

    AUTHOR
	Christian Vigh, 01/2014.

    HISTORY
    [Version : 1.0]		[Date : 2014/01/14]		[Author : CV]
	Initial release.

 ***************************************************************************************************/

-- Table creation
DROP TABLE IF EXISTS  thrak_blacklisted_emails ;

CREATE TABLE thrak_blacklisted_emails
    (
	blae_id 		INT 			NOT NULL AUTO_INCREMENT 
							COMMENT 'Blacklisted email unique id',
	blae_email		VARCHAR(256)		NOT NULL DEFAULT ''
							COMMENT 'Email address',
	blae_email_crc		BIGINT			NOT NULL DEFAULT 0
							COMMENT 'email CRC64 ; used to accelerate lookups',
	blae_username		VARCHAR(256)		NOT NULL DEFAULT ''
							COMMENT 'Username part of the email address',
	blae_username_crc	BIGINT			NOT NULL DEFAULT 0
							COMMENT 'Username CRC64 ; used to accelerate lookups',
	blae_domain_name	VARCHAR(256)		NOT NULL DEFAULT ''
							COMMENT 'Domain name part of the email address',
	blae_domain_name_crc	BIGINT			NOT NULL DEFAULT 0
							COMMENT 'Domain name CRC64 ; used to accelerate lookups',
	blae_hit_count 		INT 			NOT NULL DEFAULT 0
							COMMENT 'Number of times this email has been seen',
							
	PRIMARY KEY 	by_id			( blae_id ),
	KEY 	    	by_email		( blae_email(16) ),
	KEY 	    	by_crc			( blae_email_crc, blae_email(16) ),
	KEY 	    	by_username_crc		( blae_email_crc, blae_username(16) ),
	KEY 	    	by_domain_name_crc	( blae_email_crc, blae_domain_name(16) ),
	KEY 	    	by_hit_count		( blae_hit_count, blae_email(16) )
     )  ENGINE = MyISAM DEFAULT CHARSET latin1 COMMENT 'List of blacklisted emails' ;
     
-- Create insert/update triggers to compute the email name CRC64, that will speed up lookups
DROP TRIGGER IF EXISTS trigger_before_insert_blacklisted_emails ;

DELIMITER //
CREATE TRIGGER trigger_before_insert_blacklisted_emails BEFORE INSERT ON thrak_blacklisted_emails
	FOR EACH ROW BEGIN
		SET NEW. blae_email_crc 	=  CRC64( NEW. blae_email ) ;
		SET NEW. blae_username_crc 	=  CRC64( NEW. blae_username ) ;
		SET NEW. blae_domain_name_crc 	=  CRC64( NEW. blae_domain_name ) ;
	END //	
DELIMITER ;

DROP TRIGGER IF EXISTS trigger_before_update_blacklisted_emails ;

DELIMITER //
CREATE TRIGGER trigger_before_update_blacklisted_emails BEFORE UPDATE ON thrak_blacklisted_emails
	FOR EACH ROW BEGIN
		SET NEW. blae_email_crc 	=  CRC64( NEW. blae_email ) ;
		SET NEW. blae_username_crc 	=  CRC64( NEW. blae_username ) ;
		SET NEW. blae_domain_name_crc 	=  CRC64( NEW. blae_domain_name ) ;
	END //
DELIMITER ;

-- Load blacklisted emails     
LOAD DATA INFILE 'thrak_blacklisted_emails.csv'
	INTO TABLE thrak_blacklisted_emails
	FIELDS TERMINATED BY ';' OPTIONALLY ENCLOSED BY '"' ESCAPED BY '"'
	IGNORE 1 LINES ;

-- Optimize the table
OPTIMIZE TABLE thrak_blacklisted_emails ;