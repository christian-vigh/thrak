<?php

if ($fp = @fopen('PHPUnit/Autoload.php', 'r', true)) {
    require_once 'PHPUnit/Autoload.php';
} elseif ($fp = @fopen('PHPUnit/Framework.php', 'r', true)) {
    require_once 'PHPUnit/Framework.php';
    require_once 'PHPUnit/TextUI/TestRunner.php';
} else {
    die('skip could not find PHPUnit');
}
fclose($fp);

if ('@php_dir@' == '@'.'php_dir'.'@') {
    // This package hasn't been installed.
    // Adjust path to ensure includes find files in working directory.
    set_include_path(dirname(dirname(__FILE__))
        . PATH_SEPARATOR . dirname(__FILE__)
        . PATH_SEPARATOR . get_include_path());
}

/**
 * Base directory of code
 *
 * Needed by some of the objects being tested in the suites.
 * @since 1.4.1
 */
define("PHPDOCUMENTOR_BASE", dirname(dirname(__FILE__)));

/**
 * PhpDocumentor Setup
 *
 * required by PhpDocumentor to instantiate the environment
 * @since 1.4.0a2
 */
require_once 'phpDocumentor/Setup.inc.php';
