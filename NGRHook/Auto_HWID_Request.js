// ==UserScript==
// @name         Auto HWID Request
// @version      2
// @description  Auto requests HWID resets!
// @author       MrFluff
// @match        https://ngrhook.club/forums/profile.php?section=premium&id=*&focus=hwid
// @match        https://ngrhook.club/forums/index.php
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ngrhook.club
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    if (window.location.href.includes("https://ngrhook.club/forums/profile.php?section=premium&id=") && window.location.href.includes("&focus=hwid")) {
        var userName = document.querySelector("#brdwelcome > ul.conl > li > span > strong").innerText;
        document.querySelector("#profile3 > div:nth-child(3) > fieldset > div > label > p > input[type=text]:nth-child(1)").value = userName + " Says: Woof Woof! [Script by MrFluff]";
        document.querySelector("#profile3 > div:nth-child(3) > fieldset > div > label > p > input[type=submit]:nth-child(2)").click();
    }
    if (window.location.href === "https://ngrhook.club/forums/index.php") {
        document.querySelector("#brdmain > div.notice-bar > a").click();
    }
})();
