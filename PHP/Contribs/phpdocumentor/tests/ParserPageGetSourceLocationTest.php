<?php
/**
 * Unit Tests for the ParserPage->getSourceLocation() method
 * @package tests
 * @subpackage PhpDocumentorUnitTests
 * @author Chuck Burgess
 * @since 1.4.0a1
 * @todo research possibility of refactoring
 *       ParserClass->getSourceLocation() and
 *       ParserPage->getSourceLocation()
 *       into a common method...
 *       also, there might be more occurrences
 *       of similar getSourceLocation() methods
 *       in other classes.
 */

/**
 * Obtain the helper file.
 */
require_once dirname(__FILE__) . '/helper.inc';

/**
 * Unit Testing of the ParserPage's getSourceLocation() method
 * @package tests
 * @subpackage PhpDocumentorUnitTests
 * @author Chuck Burgess
 * @since 1.4.0a1
 */
class ParserPageGetSourceLocationTest extends PHPUnit_Framework_TestCase {

    /**
     * @var phpDocumentor_setup
     * @access private
     * @since 1.4.0a1
     */
    private $ps;
    /**
     * @var parserPage
     * @access private
     * @since 1.4.0a1
     */
    private $pp;

    /**
     * Sets up the fixture, for example, open a network connection.
     * This method is called before a test is executed.
     * @access protected
     * @since 1.4.0a1
     */
    protected function setUp() {
        $GLOBALS['_phpDocumentor_install_dir'] = PHPDOCUMENTOR_BASE;
        $GLOBALS['_phpDocumentor_setting']['quiet'] = "true";
        $this->ps = new phpDocumentor_setup;
        $this->ps->setTitle("Unit Testing");    // this step is necessary to ensure ps->render is instantiated

        $this->pp = new parserPage();
    }

    /**
     * Tears down the fixture, for example, close a network connection.
     * This method is called after a test is executed.
     * @access protected
     * @since 1.4.0a1
     */
    protected function tearDown() {
        unset($this->pp);
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
     * Shows correct behavior when
     * sourceLocation is not set yet
     * with no pearize value set
     * @since 1.4.0a1
     */
    public function testWhenLocationNotSetAndPearizeNull() {
        $this->assertEquals($this->pp->getSourceLocation($this->ps->render), false);
    }
    /**
     * Shows correct behavior when
     * sourceLocation is not set yet
     * with pearize explicitly false
     * @since 1.4.0a1
     */
    public function testWhenLocationNotSetAndPearizeFalse() {
        $this->assertEquals($this->pp->getSourceLocation($this->ps->render, false), false);
    }
    /**
     * Shows correct behavior when
     * sourceLocation is not set yet
     * with pearize explicitly true
     * @since 1.4.0a1
     */
    public function testWhenLocationNotSetAndPearizeTrue() {
        $this->assertEquals($this->pp->getSourceLocation($this->ps->render, true), false);
    }

    /**
     * Shows correct behavior when
     * sourceLocation is set to an absolute path that is not a "pear" location,
     * with no pearize value set
     * @since 1.4.0a1
     */
    public function testWhenNonPearLocationSetAndPearizeNull() {
        $this->pp->setSourceLocation('/where/on/earth/are/we');
        $this->assertEquals($this->pp->getSourceLocation($this->ps->render), '/where/on/earth/are/we');
    }
    /**
     * Shows correct behavior when
     * sourceLocation is set to an absolute path that is not a "pear" location,
     * with pearize explicitly false
     * @since 1.4.0a1
     */
    public function testWhenNonPearLocationSetAndPearizeFalse() {
        $this->pp->setSourceLocation('/where/on/earth/are/we');
        $this->assertEquals($this->pp->getSourceLocation($this->ps->render, false), '/where/on/earth/are/we');
    }
    /**
     * Shows correct behavior when
     * sourceLocation is set to an absolute path that is not a "pear" location,
     * with pearize explicitly true
     * @since 1.4.0a1
     * @todo Revisit this test... I think it highlights a bug in the getSourceLocation method.
     *       Compare it with the same test in bug1574047.php
     *       against similar method parserClass->getSourceLocation().
     */
    public function testWhenNonPearLocationSetAndPearizeTrue() {
        $this->pp->setSourceLocation('/where/on/earth/are/we');
        $this->assertEquals($this->pp->getSourceLocation($this->ps->render, true), 'whereoneartharewe');
    }

    /**
     * Show correct behavior when
     * sourceLocation is set to an absolute path that IS a "pear" location,
     * with pearize not set
     * @since 1.4.0a1
     */
    public function testWhenPearLocationSetAndPearizeNull() {
        $this->pp->sourceLocation = '/outside/pear/inside';
        $this->assertEquals($this->pp->getSourceLocation($this->ps->render), '/outside/pear/inside');
    }
    /**
     * Show correct behavior when
     * sourceLocation is set to an absolute path that IS a "pear" location,
     * with pearize explicitly false
     * @since 1.4.0a1
     */
    public function testWhenPearLocationSetAndPearizeFalse() {
        $this->pp->sourceLocation = '/outside/pear/inside';
        $this->assertEquals($this->pp->getSourceLocation($this->ps->render, false), '/outside/pear/inside');
    }
    /**
     * Show correct behavior when
     * sourceLocation is set to an absolute path that IS a "pear" location,
     * with pearize explicitly true
     * @since 1.4.0a1
     */
    public function testWhenPearLocationSetAndPearizeTrue() {
        $this->pp->sourceLocation = '/outside/pear/inside';
        $this->assertEquals($this->pp->getSourceLocation($this->ps->render, true), 'inside');
    }

    /**
     * Include a ".." in an absolute, non-PEAR path,
     * with pearize not set
     * @since 1.4.0a1
     */
    public function testWhenNonPearLocationSetIncludingDotsAndPearizeNull() {
        $this->pp->sourceLocation = '/outside/plum/inside/../inside';
        $this->assertEquals($this->pp->getSourceLocation($this->ps->render), '/outside/plum/inside/../inside');
    }
    /**
     * Include a ".." in an absolute, non-PEAR path,
     * with pearize explicitly false
     * @since 1.4.0a1
     */
    public function testWhenNonPearLocationSetIncludingDotsAndPearizeFalse() {
        $this->pp->sourceLocation = '/outside/plum/inside/../inside';
        $this->assertEquals($this->pp->getSourceLocation($this->ps->render, false), '/outside/plum/inside/../inside');
    }
    /**
     * Include a ".." in an absolute, non-PEAR path,
     * with pearize explicitly true
     * @since 1.4.0a1
     * @todo Revisit this test... I think it highlights a bug in the getSourceLocation method.
     *       Compare it with the same test in bug1574047.php
     *       against similar method parserClass->getSourceLocation().
     */
    public function testWhenNonPearLocationSetIncludingDotsAndPearizeTrue() {
        $this->pp->sourceLocation = '/outside/plum/inside/../inside';
        $this->assertEquals($this->pp->getSourceLocation($this->ps->render, true), 'outsidepluminside..inside');
    }

    /**
     * Include a ".." in a relative, non-PEAR path,
     * with pearize not set
     * @since 1.4.0a1
     */
    public function testWhenNonPearRelativeLocationSetAndPearizeNull() {
        $this->pp->sourceLocation = 'outside/plum/inside/../inside';
        $this->assertEquals($this->pp->getSourceLocation($this->ps->render), 'outside/plum/inside/../inside');
    }
    /**
     * Include a ".." in a relative, non-PEAR path,
     * with pearize explicitly false
     * @since 1.4.0a1
     */
    public function testWhenNonPearRelativeLocationSetAndPearizeFalse() {
        $this->pp->sourceLocation = 'outside/plum/inside/../inside';
        $this->assertEquals($this->pp->getSourceLocation($this->ps->render, false), 'outside/plum/inside/../inside');
    }
    /**
     * Include a ".." in a relative, non-PEAR path,
     * with pearize explicitly false
     * @since 1.4.0a1
     * @todo Revisit this test... I think it highlights a bug in the getSourceLocation method.
     *       Compare it with the same test in bug1574047.php
     *       against similar method parserClass->getSourceLocation().
     */
    public function testWhenNonPearRelativeLocationSetAndPearizeTrue() {
        $this->pp->sourceLocation = 'outside/plum/inside/../inside';
        $this->assertEquals($this->pp->getSourceLocation($this->ps->render, true), 'outsidepluminside..inside');
    }

    /**
     * Include a ".." in an absolute, PEAR path,
     * with pearize not set
     * @since 1.4.0a1
     */
    public function testWhenPearLocationSetIncludingDotsAndPearizeNull() {
        $this->pp->sourceLocation = '/outside/pear/inside/../inside';
        $this->assertEquals($this->pp->getSourceLocation($this->ps->render), '/outside/pear/inside/../inside');
    }
    /**
     * Include a ".." in an absolute, PEAR path,
     * with pearize explicitly false
     * @since 1.4.0a1
     */
    public function testWhenPearLocationSetIncludingDotsAndPearizeFalse() {
        $this->pp->sourceLocation = '/outside/pear/inside/../inside';
        $this->assertEquals($this->pp->getSourceLocation($this->ps->render, false), '/outside/pear/inside/../inside');
    }
    /**
     * Include a ".." in an absolute, PEAR path,
     * with pearize explicitly true
     * @since 1.4.0a1
     */
    public function testWhenPearLocationSetIncludingDotsAndPearizeTrue() {
        $this->pp->sourceLocation = '/outside/pear/inside/../inside';
        $this->assertEquals($this->pp->getSourceLocation($this->ps->render, true), 'inside/../inside');
    }

    /**
     * Include a ".." in a relative, PEAR path,
     * with pearize not set
     * @since 1.4.0a1
     */
    public function testWhenPearRelativeLocationSetAndPearizeNull() {
        $this->pp->sourceLocation = 'outside/pear/inside/../inside';
        $this->assertEquals($this->pp->getSourceLocation($this->ps->render), 'outside/pear/inside/../inside');
    }
    /**
     * Include a ".." in a relative, PEAR path,
     * with pearize explicitly false
     * @since 1.4.0a1
     */
    public function testWhenPearRelativeLocationSetAndPearizeFalse() {
        $this->pp->sourceLocation = 'outside/pear/inside/../inside';
        $this->assertEquals($this->pp->getSourceLocation($this->ps->render, false), 'outside/pear/inside/../inside');
    }
    /**
     * Include a ".." in a relative, PEAR path,
     * with pearize explicitly true
     * @since 1.4.0a1
     */
    public function testWhenPearRelativeLocationSetAndPearizeTrue() {
        $this->pp->sourceLocation = 'outside/pear/inside/../inside';
        $this->assertEquals($this->pp->getSourceLocation($this->ps->render, true), 'inside/../inside');
    }

    /**
     * END OF "demonstrate the correct behavior" --------------|
     */

    /**
     * END OF "normal, expected cases" ---------------------------------|
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
