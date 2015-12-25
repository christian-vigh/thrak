<?php

/**
 * Master Unit Test Suite file for PhpDocumentor
 * 
 * This top-level test suite file organizes all class test suite files, 
 * so that the full suite can be run by calling:
 *     php -d error_reporting=22527 tests/AllTests.php
 *
 * But modern versions of PHPUnit don't need the AllTests file.  Just cd
 * into the directory above "tests" and call:
 *     phpunit -d error_reporting=22527 tests
 *
 * PHP versions 4 and 5
 *
 * @category Tools and Utilities
 * @package  phpDocumentor
 * @subpackage UnitTesting
 * @author   Chuck Burgess <ashnazg@php.net>
 * @license  http://www.opensource.org/licenses/lgpl-license.php LGPL
 * @version  CVS: $Id$
 * @link     http://pear.php.net/PhpDocumentor
 * @since    1.4.0a2
 * @todo     CS cleanup - change package to PhpDocumentor
 */

/**
 * Obtain the helper file.
 */
require_once dirname(__FILE__) . '/helper.inc';

// Keep tests from running twice when calling this file directly via PHPUnit.
$call_main = false;
if (strpos($_SERVER['argv'][0], 'phpunit') === false) {
    // Called via php, not PHPUnit.  Pass the request to PHPUnit.
    if (!defined('PHPUnit_MAIN_METHOD')) {
        /** The test's main method name */
        define('PHPUnit_MAIN_METHOD', 'PhpDocumentor_AllTests::main');
        $call_main = true;
    }
}

/**
 * Master Unit Test Suite class for PhpDocumentor
 * 
 * This top-level test suite class organizes 
 * all class test suite files, 
 * so that the full suite can be run 
 * by PhpUnit or via "pear run-tests -u". 
 *
 * @category Tools and Utilities
 * @package  phpDocumentor
 * @subpackage UnitTesting
 * @author   Chuck Burgess <ashnazg@php.net>
 * @license  http://www.opensource.org/licenses/lgpl-license.php LGPL
 * @version  Release: @package_version@
 * @link     http://pear.php.net/PhpDocumentor
 * @since    1.4.0a2
 * @todo     CS cleanup - change package to PhpDocumentor
 */
class PhpDocumentor_AllTests
{
    /**
     * Launches the TextUI test runner
     *
     * @return void
     * @uses PHPUnit_TextUI_TestRunner
     */
    public static function main()
    {
        PHPUnit_TextUI_TestRunner::run(self::suite());
    }

    /**
     * Adds all class test suites into the master suite
     *
     * @return PHPUnit_Framework_TestSuite a master test suite
     *                                     containing all class test suites
     * @uses PHPUnit_Framework_TestSuite
     */ 
    public static function suite()
    {
        $suite = new PHPUnit_Framework_TestSuite(
            'PhpDocumentor Full Suite of Unit Tests');

        $dir = new GlobIterator(dirname(__FILE__) . '/*Test.php');
        $suite->addTestFiles($dir);

        return $suite;
    }
}

if ($call_main) {
    PhpDocumentor_AllTests::main();
}
