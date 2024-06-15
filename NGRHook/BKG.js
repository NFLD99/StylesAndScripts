// ==UserScript==
// @name         BKG
// @version      1
// @description  Allows you sto set a custom BKG!
// @author       MrFluff
// @match        https://ngrhook.club/forums/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ngrhook.club
// @grant        none
// ==/UserScript==

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
    updateBackgroundImage(value);
}
function handleButtonClick() {
    var imageUrl = prompt("Please enter the URL of the image:");
    if (imageUrl !== null && imageUrl.trim() !== "") {
        setCookie("--usrBkg", imageUrl, 365);
    }
}
function updateBackgroundImage(url) {
    document.body.style.cssText = "margin: 0; padding: 0; background: url('" + url + "') 50% 50%/cover; background-attachment: fixed;";
}
function handleCookieChange(event) {
    if (event.cookieName === "--usrBkg") {
        var newImageUrl = event.cookieValue;
        updateBackgroundImage(newImageUrl);
    }
}
function getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}
var initialImageUrl = getCookie("--usrBkg");
if (initialImageUrl) {
    updateBackgroundImage(initialImageUrl);
}
window.addEventListener("cookiechange", handleCookieChange);
var ulElement = document.querySelector("#brdmenu > ul");
var inputButton = document.createElement("input");
inputButton.type = "button";
inputButton.value = "Set Background Image";
inputButton.addEventListener("click", handleButtonClick);
var liElement = document.createElement("li");
liElement.appendChild(inputButton);
ulElement.appendChild(liElement);
