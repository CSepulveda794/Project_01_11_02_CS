/*  Project 01_11_02

    Author: cynthia sepulveda
    Date:   sep.4.18

    Filename: script.js
*/

"use strict";




// GLOBAL VARIABLES
var httpRequest = false;
var entry = "^IXIC";

// function to initiate the xhr object
function getRequestObject() {
    try  {
        httpRequest = new XMLHttpRequest();
    } catch (reqestError) {
        return false;
    }
    alert("httpRequest");
    return httpRequest;
}

//this funtion will stop any default submissions from executing 
function stopSubmission(evt){
    alert("stopSubmission()");
    if (evt.preventDefault){
        evt.preventDefault();
    } else {
        evt.returnValue = false;
    }
}

//temporary event listener to see if funtion getrequestobj works
if (window.addEventListener) {
    window.addEventListener("load", getRequestObject, false);
} else if(window.attachEvent) {
    window.attachEvent("onload", getRequestObject);
}


