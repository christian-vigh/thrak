/***************************************************************************************************

    NAME
	thrak_functions.sql

    DESCRIPTION
	Utility functions.

    AUTHOR
	Christian Vigh, 01/2014.

    HISTORY
    [Version : 1.0]		[Date : 2014/01/13]		[Author : CV]
	Initial release.

 ***************************************************************************************************/

 
 
 /*=================================================================================================
 
      FUNCTION
	CRC64 - Returns a 64-bit CRC value.
	
  *=================================================================================================*/
DROP FUNCTION IF EXISTS CRC64 ;
DELIMITER {}

/* 
CREATE FUNCTION CRC64 ( data LONGTEXT CHARSET latin1) 
	RETURNS BIGINT UNSIGNED 
	DETERMINISTIC
	NO SQL
	SQL SECURITY INVOKER
	COMMENT 'Return a 64 bit CRC of given input, as an unsigned big integer'
BEGIN
	RETURN CONV( RIGHT( MD5( data ), 16), 16, 10) ;
END {}
*/
/*
select blae_domain_crc, count(blae_domain_crc) as 'count' from thrak_blacklisted_domains group by blae_domain_crc

select * from thrak_blacklisted_domains where blae_domain_crc = 9223372036854775807

select blae_domain_name, count(blae_domain_name) as count from thrak_blacklisted_domains group by blae_domain_name having count(blae_domain_name )>1

select count(blae_domain_crc) as 'count' from thrak_blacklisted_domains 
	group by blae_domain_crc having count(blae_domain_crc)>1 order by count(blae_domain_crc)

select distribution, count(distribution) as 'count' 
from
(
select count(blae_domain_crc) as 'distribution' from thrak_blacklisted_domains 
	group by blae_domain_crc having count(blae_domain_crc)>1 order by count(blae_domain_crc)
) as Selection
group by distribution
order by count(distribution) 

http://code.google.com/p/common-schema/source/browse/trunk/common_schema/routines/general/crc64.sql?r=3
*/

CREATE FUNCTION CRC64 ( data LONGTEXT CHARSET latin1) 
	RETURNS BIGINT UNSIGNED 
	DETERMINISTIC
	NO SQL
	SQL SECURITY INVOKER
	COMMENT 'Return a 64 bit CRC of given input, as an unsigned big integer'
BEGIN
	RETURN CRC32( data << 32 ) | CRC32 ( REVERSE( data ) ) ;
END {}
 
DELIMITER ; 
