function resetTest() {
    let form = document.getElementById("prms");
    BlindTest.reset(form.elements[0].value), form.elements[1].value;
}

function resetOnLoad() {
    resetTest();
}