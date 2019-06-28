/**
 * Very simple in-browser unit-test library, with zero deps.
 *
 * Background turns green if all tests pass, otherwise red.
 * View the JavaScript console to see failure reasons.
 *
 * Example:
 *
 *   adder.js (code under test)
 *
 *     function add(a, b) {
 *       return a + b;
 *     }
 *
 *   adder-test.html (tests - just open a browser to see results)
 *
 *     <script src="tinytest.js"></script>
 *     <script src="adder.js"></script>
 *     <script>
 *
 *     tests({
 *
 *       'adds numbers': function() {
 *         eq(6, add(2, 4));
 *         eq(6.6, add(2.6, 4));
 *       },
 *
 *       'subtracts numbers': function() {
 *         eq(-2, add(2, -4));
 *       },
 *
 *     });
 *     </script>
 *
 * That's it. Stop using over complicated frameworks that get in your way.
 *
 * -Joe Walnes
 * MIT License. See https://github.com/joewalnes/jstinytest/
 */
// TODO: if no test is called, the function should fail.
var TinyTestHelper = {
    renderStats: function(tests, failures){
        var numberOfTests = Object.keys(tests).length;
        var successes = numberOfTests - failures;
        // TODO: Appropriate singular and plural
        var summaryString = 'Ran ' 
                            + numberOfTests + ' tests: ' 
                            + successes + ' successes, '
                            + failures + ' failures';
        var summaryElemet = document.createElement('h1');
        summaryElemet.textContent = summaryString;
        document.body.appendChild(summaryElemet);   
    }
};

var TinyTest = {
    run: function(tests) {
        var failures = 0;
        var successes = 0;
        for (var testName in tests) {
            var testAction = tests[testName];      
            try {
                testAction.apply(this);
                successes++;
                console.log('%c' + testName, "color: green;"); 
            } catch (e) {
                failures++;
                console.groupCollapsed('%c' + testName, "color: red;");
                console.error(e.stack);
                console.groupEnd();
            }
        }    

        setTimeout(function() { // Give document a chance to complete
            if (window.document && document.body) {
                document.body.style.backgroundColor = (failures == 0 ? '#99ff99' : '#ff9999');
                TinyTestHelper.renderStats(tests, failures);
            } else {
                console.log('DOM is not ready yet!');
            }
        }, 0);
    },

    fail: function(msg) {
        throw new Error('fail(): ' + msg);
    },

    assert: function(value, msg) {
        assertionRanForThisTest = true;
        if (!value) {
            throw new Error('assert(): ' + msg);
        }
    },

    assertEquals: function(expected, actual) {
        // numberOfTestAssertionsRan++;
        assertionRanForThisTest = true;
        if (expected != actual) {
            throw new Error('assertEquals() "' + expected + '" != "' + actual + '"');
        }
    },

    assertStrictEquals: function(expected, actual) {
        // numberOfTestAssertionsRan++;
        assertionRanForThisTest = true;
        if (expected !== actual) {
            throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');
        }
    }
};
var numberOfTestAssertionsRan = 0;// TODO: try toggle flag true false to indicate a test ran for each test. So test will fail if it does not run(wo I dont have to explicitly fail() a test)
var assertionRanForThisTest = false;
// TODO: fail() for tests where it did not run else succeess
// TODO: bind assertionRanForThisTest with value to this.???
var fail               = TinyTest.fail.bind(TinyTest),
    assert             = TinyTest.assert.bind(TinyTest),
    assertEquals       = TinyTest.assertEquals.bind(TinyTest),
    eq                 = TinyTest.assertEquals.bind(TinyTest), // alias for assertEquals
    assertStrictEquals = TinyTest.assertStrictEquals.bind(TinyTest),
    tests              = TinyTest.run.bind(TinyTest)
