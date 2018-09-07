/*  Project 01_11_02

    Author: cynthia sepulveda
    Date:   sep.4.18

    Filename: script.js
*/

"use strict";




// GLOBAL VARIABLES
var httpRequest = false;
var entry = "MSFT";

// function to initiate the xhr object
function getRequestObject() {
    try {
        httpRequest = new XMLHttpRequest();
    } catch (reqestError) {
        return false;
    }
    return httpRequest;
}

//this funtion will stop any default submissions from executing 
function stopSubmission(evt) {
    if (evt.preventDefault) {
        evt.preventDefault();
    } else {
        evt.returnValue = false;
    }
    getQuote();
}
//request stock quote data from data
function getQuote() {
    if (document.getElementsByTagName("input")[0].value) {
        entry = document.getElementsByTagName("input")[0].value;
    }else{
     document.getElementsByTagName("input")[0].value = entry;
    }
    if (!httpRequest) {
        httpRequest = getRequestObject();
    }
    httpRequest.abort();
    httpRequest.open("get", "StockCheck.php?t=" + entry, true);
    httpRequest.send(null);
    httpRequest.onreadystatechange = displayData;

}

function displayData(){
    if (httpRequest.readyState === 4 && httpRequest.status === 200){
        var stockResults = httpRequest.responseText;
    
        var stockItems = JSON.parse(stockResults);
        console.log(stockItems)
      document.getElementsByTagName("input")[0].value;
        document.getElementById("ticker").innerHTML = stockItems.symbol;
        document.getElementById("openingPrice").innerHTML = stockItems.open;
        document.getElementById("lastTrade").innerHTML = stockItems.latestPrice;
        var date = new Date(stockItems.latestUpdate)
        document.getElementById("lastTradeDT").innerHTML = date.toDateString() + "<br>" + date.toLocaleTimeString();
        document.getElementById("change").innerHTML = (stockItems.latestPrice - stockItems.open).toFixed(2);
        document.getElementById("range").innerHTML = ("low " + (stockItems.low * 1).toFixed(2) + "<br>High" + (stockItems.high * 1).toFixed(2));
        document.getElementById("volume").innerHTML = (stockItems.latestVolume * 1).toLocaleString();
    
        
    }
}

function formatTable(){
    var rows = document.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++){
        rows[i].style.background = "#9FE098";
    }
}

//temporary event listener to see if funtion getrequestobj works

var form = document.getElementsByTagName("form")[0];
if (form.addEventListener) {
    form.addEventListener("submit", stopSubmission, false);
    window.addEventListener("load", formatTable);
    window.addEventListener("load", getQuote, false);
} else if (form.attachEvent) {
    form.attachEvent("onsubmit", stopSubmission);
    window.attachEvent("load", formatTable);
    window.attachEvent("onload", getQuote);
}
