// ==UserScript==
// @name         Copy URL
// @namespace    http://tampermonkey.net/
// @version      9
// @description  try to take over the world!
// @author       NFLD99
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @updateURL    https://raw.githubusercontent.com/NFLD99/StylesAndScripts/main/vrcBTN.js
// @downloadURL  https://raw.githubusercontent.com/NFLD99/StylesAndScripts/main/vrcBTN.js
// ==/UserScript==
(function () {
    'use strict';

    function isInBlacklist(videoId, blacklist) {
        return blacklist.includes(videoId);
    }

    // Extract video ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get('v');

    // Function to retrieve the JSON blacklist and perform the necessary checks
    function checkBlacklist() {
        const urlParams = new URLSearchParams(window.location.search);
        const videoId = urlParams.get('v');
        const timestamp = new Date().getTime(); // Generate a unique timestamp
        const url = `https://raw.githubusercontent.com/NFLD99/no/main/blacklist.json?_=${timestamp}`;

        GM_xmlhttpRequest({
            method: "GET",
            url: url,
            onload: function (response) {
                if (response.status === 200) {
                    try {
                        const blacklist = JSON.parse(response.responseText);
                        if (isInBlacklist(videoId, blacklist)) {
                            window.location.href = 'https://www.youtube.com/';
                        }
                    } catch (error) {
                        console.error("Error parsing blacklist JSON:", error);
                    }
                } else {
                    console.error("Failed to fetch blacklist:", response.statusText);
                }
            },
            onerror: function (error) {
                console.error("Error fetching blacklist:", error);
            }
        });
    }
    function addButton() {
        var ownerElement = document.querySelector("#logo");
        if (ownerElement && !document.getElementById('copyButton')) {
            // checkBlacklist()
            var button = document.createElement('button');
            button.id = 'copyButton';
            button.innerText = 'VRC';
            button.style.background = '#272728';
            button.style.color = '#f1f1f1';
            button.style.borderRadius = '50px';
            button.style.width = '50px';
            button.classList.add('glow-on-hover');
            button.addEventListener('click', function () {
                var currentUrl = window.location.href;
                var indexOfAmpersand = currentUrl.indexOf('&');
                var modifiedUrl = indexOfAmpersand !== -1 ? currentUrl.substring(0, indexOfAmpersand) : currentUrl;
                var tempInput = document.createElement('input');
                tempInput.value = modifiedUrl;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
            });
            ownerElement.parentNode.insertBefore(button, ownerElement.nextSibling);
        } else {
            console.log('Element with id "owner" not found or button already added.');
            // checkBlacklist()
        }
    }
    function addScript() {
        addButton();
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                    var ownerElement = document.querySelector("#owner");
                    if (ownerElement) {
                        addButton();
                    }
                }
            });
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    addScript();

    // Listen for DOM changes
    document.addEventListener("DOMContentLoaded", addScript);
    window.addEventListener("load", addScript);
    window.addEventListener("popstate", addScript);

    // Listen for URL changes
    window.addEventListener("hashchange", addScript);
})();

