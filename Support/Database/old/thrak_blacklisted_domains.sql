/***************************************************************************************************

    NAME
	thrak_blacklisted_domains.sql

    DESCRIPTION
	Table that holds the current list of blacklisted domains.

    AUTHOR
	Christian Vigh, 01/2014.

    HISTORY
    [Version : 1.0]		[Date : 2014/01/13]		[Author : CV]
	Initial release.

 ***************************************************************************************************/

-- Table creation
DROP TABLE IF EXISTS  thrak_blacklisted_domains ;

CREATE TABLE thrak_blacklisted_domains
    (
	blad_id 		INT 			NOT NULL AUTO_INCREMENT 
							COMMENT 'Blacklisted domain unique id',
	blad_domain_name	VARCHAR(1024)		NOT NULL DEFAULT ''
							COMMENT 'Domain name',
	blad_domain_crc		BIGINT			NOT NULL DEFAULT 0
							COMMENT 'Domain CRC64 ; used to accelerate lookups',
	blad_hit_count 		INT 			NOT NULL DEFAULT 0
							COMMENT 'Number of times this domain has been seen',
							
	PRIMARY KEY 	by_id			( blad_id ),
	KEY 	    	by_domain		( blad_domain_name(32) ),
	KEY 	    	by_crc			( blad_domain_crc, blad_domain_name(32) ),
	KEY 	    	by_hit_count		( blad_hit_count, blad_domain_name(32) )
     )  ENGINE = MyISAM DEFAULT CHARSET latin1 COMMENT 'List of blacklisted domains' ;
     
-- Create insert/update triggers to compute the domain name CRC64, that will speed up lookups
DROP TRIGGER IF EXISTS trigger_before_insert_blacklisted_domains ;

DELIMITER //
CREATE TRIGGER trigger_before_insert_blacklisted_domains BEFORE INSERT ON thrak_blacklisted_domains
	FOR EACH ROW BEGIN
		SET NEW. blad_domain_crc = CRC64( NEW. blad_domain_name ) ;
	END //	
DELIMITER ;

DROP TRIGGER IF EXISTS trigger_before_update_blacklisted_domains ;

DELIMITER //
CREATE TRIGGER trigger_before_update_blacklisted_domains BEFORE UPDATE ON thrak_blacklisted_domains
	FOR EACH ROW BEGIN
		SET NEW. blad_domain_crc = CRC64( NEW. blad_domain_name ) ;
	END //
DELIMITER ;

-- Load blacklisted domains     
LOAD DATA INFILE 'thrak_blacklisted_domains.csv'
	INTO TABLE thrak_blacklisted_domains
	FIELDS TERMINATED BY ';' OPTIONALLY ENCLOSED BY '"' ESCAPED BY '"'
	IGNORE 1 LINES ;

-- Optimize the table
OPTIMIZE TABLE thrak_blacklisted_domains ;