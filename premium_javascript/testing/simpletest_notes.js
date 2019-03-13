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
// DONE: Get successes to be green.
// DONE: Make only 1 error per failure goes to the console 
// DONE: Make failures red.
// DONE: Show stck traces for failures. (given)
// DONE: Only show stack traces if you click expand.
// TODO: Output summary statistics to the DOM.

var TinyTestHelper = {
    renderStats: function(tests, failures){
        var numberOfTests = Object.keys(tests).length;
        var successes = numberOfTests - failures;

        var summaryString = 'Ran ' + numberOfTests + ' tests: ' 
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
            // debugger;
            var testAction = tests[testName];  // TODO: run this through the debugger
            try {
                testAction.apply(this);
                successes++;
                // pre-video
                    // console.log('%cTest: %s OK', "color: green;", testName); 
                // Notes:
                    // concatonating + inputs makes it one argument
                    // console.log('Test:', testName, 'OK'); 
                    // console.log('%cTest:' + testName + 'OK', "color: green;"); 
                console.log('%c' + testName, "color: green;"); 


            } catch (e) {
                failures++;
                // pre-video:
                    // console.error(e.stack);
                    // ? the info from e.stack is identical to e?
                // Notes: only make one call to error.
                // console.log('Test:', testName, 'FAILED', e);
                console.groupCollapsed('%c' + testName, "color: red;");
                // console.log('%c' + testName, "color: red;");
                console.error(e.stack);
                console.groupEnd();
            }
        }    

        setTimeout(function() { // Give document a chance to complete
            if (window.document && document.body) {
                document.body.style.backgroundColor = (failures == 0 ? '#99ff99' : '#ff9999');
                TinyTestHelper.renderStats(tests, failures);
                // var numberOfTests = Object.keys(tests).length;
                // var successes = numberOfTests - failures;

                // var summaryString = 'Ran ' + numberOfTests + ' tests: ' 
                //                     + successes + ' successes, '
                //                     + failures + ' failures';
                // var summaryElemet = document.createElement('h1');
                // summaryElemet.textContent = summaryString;
                // document.body.appendChild(summaryElemet);
                 
                // pre-video:
                    /* 
                    // create a new div element 
                    var newDiv = document.createElement("div"); 
                    newDiv.setAttribute("style", "font-size: 2em; font-weight: bold;");
                    // and give it some content 
                    var newContent = document.createTextNode("Ran " + (successes + failures) + " tests: " + successes +" successes, "+ failures + " Failures"); 
                    // add the text node to the newly created div
                    newDiv.appendChild(newContent);  
                    // add the newly created element and its content into the DOM 
                    var currentDiv = document.getElementById("div1"); 
                    document.body.insertBefore(newDiv, currentDiv); 
                    */

            } else {
                console.log('DOM is not ready yet!');
            }
        }, 0);
    },

    fail: function(msg) {
        throw new Error('fail(): ' + msg);
    },

    assert: function(value, msg) {
        if (!value) {
            throw new Error('assert(): ' + msg);
        }
    },

    assertEquals: function(expected, actual) {
        if (expected != actual) {
            throw new Error('assertEquals() "' + expected + '" != "' + actual + '"');
        }
    },

    assertStrictEquals: function(expected, actual) {
        if (expected !== actual) {
            throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');
        }
    }

};
// Gordon Note: As a prototyping test framework would elimate
// all but strictEquality === (assert and asserEquals n/a)

var fail               = TinyTest.fail.bind(TinyTest),
    assert             = TinyTest.assert.bind(TinyTest),
    assertEquals       = TinyTest.assertEquals.bind(TinyTest),
    eq                 = TinyTest.assertEquals.bind(TinyTest), // alias for assertEquals
    assertStrictEquals = TinyTest.assertStrictEquals.bind(TinyTest),
    tests              = TinyTest.run.bind(TinyTest)
