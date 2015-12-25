<?php
/**
 * Unit Tests for the HighlightParser->getInlineTags() method
 * @package tests
 * @subpackage PhpDocumentorUnitTests
 * @author Chuck Burgess
 * @since 1.4.0a2
 */

/**
 * Obtain the helper file.
 */
require_once dirname(__FILE__) . '/helper.inc';

/**
 * Unit Testing of the HighlightParser's getInlineTags() method
 * @package tests
 * @subpackage PhpDocumentorUnitTests
 * @author Chuck Burgess
 * @since 1.4.0a2
 */
class HighlightParserGetInlineTagsTest extends PHPUnit_Framework_TestCase {

    /**
     * @var phpDocumentor_setup
     * @access private
     * @since 1.4.0a2
     */
    private $ps;
    /**
     * @var phpDocumentor_HighlightParser
     * @access private
     * @since 1.4.0a2
     */
    private $hp;

    /**
     * Sets up the fixture, for example, open a network connection.
     * This method is called before a test is executed.
     * @access protected
     * @since 1.4.0a2
     */
    protected function setUp() {
        $GLOBALS['_phpDocumentor_install_dir'] = PHPDOCUMENTOR_BASE;
        $GLOBALS['_phpDocumentor_setting']['quiet'] = "on";

        $this->ps = new phpDocumentor_setup();
        $this->hp = new phpDocumentor_HighlightParser();
    }

    /**
     * Tears down the fixture, for example, close a network connection.
     * This method is called after a test is executed.
     * @access protected
     * @since 1.4.0a2
     */
    protected function tearDown() {
        unset($this->hp);
        unset($this->ps);
    }


    /**
     * NOW LIST THE TEST CASES -------------------------------------------------------|
     */

    /**
     * normal, expected cases ------------------------------------------|
     */

    /**
     * demonstrate the correct behavior -----------------------|
     */

    /**
     * Shows correct behavior when called with no actual value
     * and no $endinternal flag arg
     * @since 1.4.0a2
     */
    public function testShowCorrectBehaviorWhenGivenOneEmptyArg() {
        $this->assertEquals('',$this->hp->getInlineTags(''));
    }
    /**
     * Shows correct behavior when called with no actual value
     * and a FALSE $endinternal flag arg
     * @since 1.4.0a2
     */
    public function testShowCorrectBehaviorWhenGivenOneEmptyArgAndFalse() {
        $this->assertEquals('',$this->hp->getInlineTags('', false));
    }
    /**
     * Shows correct behavior when called with no actual value
     * and a TRUE $endinternal flag arg
     * @since 1.4.0a2
     */
    public function testShowCorrectBehaviorWhenGivenOneEmptyArgAndTrue() {
        $this->assertEquals('',$this->hp->getInlineTags('', true));
    }

    /**
     * END OF "demonstrate the correct behavior" --------------|
     */
    /**
     * END OF "normal, expected cases" ---------------------------------|
     * @todo write more "normal" test cases
     */


    /**
     * odd, edge cases -------------------------------------------------|
     */
    /**
     * END OF "odd, edge cases" ----------------------------------------|
     * @todo write some "edge" test cases
     */

    /**
     * END OF "NOW LIST THE TEST CASES" ----------------------------------------------|
     */
}
