(function () {
    var division;
    var originalDivisionMethod;
    var piggybackMethod;
    module("Piggyback", {
        setup:function(){
            division = mockFunction();
            originalDivisionMethod = division;
            when(division)(anything()).then(function(numerator, denominator) {
                return numerator / denominator;
            });

            piggybackMethod = mockFunction();
            when(piggybackMethod)(anything()).then(function(numerator, denominator, output) {
                console.log("numerator ", numerator, "denominator ", denominator, "ouput ", output);
            });
            division = division.piggyback(piggybackMethod);

        }
    });
    JsMockito.Integration.QUnit();
    JsHamcrest.Integration.QUnit();


    test("Happy path", function () {

        equal(division(10, 5), 2, "Happy path works");

        verify(originalDivisionMethod, once())(10, 5);
        verify(piggybackMethod, once())(10, 5, 2);


    });
})();


