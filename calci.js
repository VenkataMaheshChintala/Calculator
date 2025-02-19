document.addEventListener("DOMContentLoaded",function() {
    const display = document.getElementById("display");

    window.addtoInput =  function(input) {
        display.value += input;
    }

    window.calculateAnswer = function() {
        display.value = eval(display.value);
    }

    window.clearInput = function() {
        display.value = "";
    }
})