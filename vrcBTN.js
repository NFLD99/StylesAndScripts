// ==UserScript==
// @name         Copy URL
// @namespace    http://tampermonkey.net/
// @version      4
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @updateURL    https://raw.githubusercontent.com/NFLD99/StylesAndScripts/main/vrcBTN.js
// @downloadURL  https://raw.githubusercontent.com/NFLD99/StylesAndScripts/main/vrcBTN.js
// ==/UserScript==

(function() {
    'use strict';

    function addButton() {
        var ownerElement = document.querySelector("#owner");
        if (ownerElement && !document.getElementById('copyButton')) {
            var button = document.createElement('button');
            button.id = 'copyButton';
            button.innerText = 'VRC';
            button.style.background = '#272728';
            button.style.color = '#f1f1f1';
            button.style.borderRadius = '50px';
            button.classList.add('glow-on-hover');
            button.addEventListener('click', function() {
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
            console.error('Element with id "owner" not found or button already added.');
        }
    }

    function addScript() {
        addButton();
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
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
