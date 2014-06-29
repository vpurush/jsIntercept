(function () {
    var division;
    var originalDivisionMethod;
    var interceptorMethod;
    module("Interceptor", {
        setup:function(){
            division = mockFunction();
            originalDivisionMethod = division;
            when(division)(anything()).then(function(numerator, denominator) {
                return numerator / denominator;
            });

            interceptorMethod = mockFunction();
            when(interceptorMethod)(anything()).then(function(numerator, denominator) {
                if (denominator == 0) {
                    throw "denominator cannot be 0";
                } else if (denominator > numerator) {
                    console.log("Output will be less than 1. Aborting operation..");
                    return false;
                }
                return true;
            });
            division = division.intercept(interceptorMethod);

        }
    });
    JsMockito.Integration.QUnit();
    JsHamcrest.Integration.QUnit();


    test("Happy path", function () {

        equal(division(10, 5), 2, "Happy path works");

        verify(originalDivisionMethod, once())(10, 5);
        verify(interceptorMethod, once())(10, 5);


    });

    test("Interceptor return false", function () {

        equal(division(5, 10), undefined, "denominator > numerator scenario works");

        verify(originalDivisionMethod, never())(anything());
        verify(interceptorMethod, once())(5, 10);

    });

    test("Interceptor throws exception", function () {

        throws(function (){ division(10, 0); }, "denominator = 0 scenario works");

        verify(originalDivisionMethod, never())(anything());
        verify(interceptorMethod, once())(10, 0);
    });
})();


