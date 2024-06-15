// ==UserScript==
// @name         Auto HWID Request
// @version      1
// @description  Auto requests HWID resets!
// @author       MrFluff
// @match        https://ngrhook.club/forums/profile.php?section=premium&id=*&focus=hwid
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ngrhook.club
// @grant        none
// ==/UserScript==
var userName = document.querySelector("#brdwelcome > ul.conl > li > span > strong").innerText
document.querySelector("#profile3 > div:nth-child(3) > fieldset > div > label > p > input[type=text]:nth-child(1)").value= userName + "Says: Woof Woof! [Script by MrFluff]";
document.querySelector("#profile3 > div:nth-child(3) > fieldset > div > label > p > input[type=submit]:nth-child(2)").click();
