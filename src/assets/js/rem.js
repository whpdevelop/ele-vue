function rem() {
    var html = document.querySelector('html');
    var winW = window.innerWidth;
    var fontSize;
    if (winW >= 750) {
        winW = 750
    } else if (winW <= 320) {
        winW = 320

    }
    fontSize = 100 / 750 * winW
    html.style.fontSize = fontSize + 'px';
}
rem()
window.onresize = function () {
    rem()
}