var stroomArray = [];
var spanningArray = [];
var zonnepaneelStatus = 0;

function inUitklappenZonnepanelen() {
    // Check of zonnepaneel in of uitgeklapt is
    // Zo ja, klap de zonnepanelen in. Zo nee, klap ze uit.

    if (zonnepaneelStatus <= 0) {
        // Define the API URL
        const apiUrl = 'http://145.49.127.248:1880/aaadlander/aaad2?zonnepaneel=Uit';
        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }
          };

        // Make a request
        fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
            throw new Error('Er is iets mis gegaan tijdens het versturen van het commando.');
            }
            else {
                alert(`De zonnepanelen worden uitgeklapt.`);

                // Wordt vervangen door websocket data
                zonnepaneelStatus = 100;
            }
            
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    else if (zonnepaneelStatus >= 100) {
        // Define the API URL
        const apiUrl = 'http://145.49.127.248:1880/aaadlander/aaad2?zonnepaneel=In';
        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }
          };

        // Make a request
        fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
            throw new Error('Er is iets mis gegaan tijdens het versturen van het commando.');
            }
            else {
                alert(`De zonnepanelen worden ingeklapt.`);

                // Wordt vervangen door websocket data
                zonnepaneelStatus = 0;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    else{
        alert(`Wacht tot de zonnepanelen zijn in- of uitgeklapt.`);
    }

}

function popStroomGraph() {
    var tbodyRef = document.getElementById('stroomgrafiek').getElementsByTagName('tbody')[0];
    var newbody = document.createElement('tbody');

    var maxValue = findMax(stroomArray);
    
    // Plaats elke entry in de grafiek
    for (let index = 0; index < stroomArray.length; index++) {
        const element = stroomArray[index];
        
        if (index == 0) {
            var newrow = newbody.insertRow();
            var newcell = newrow.insertCell();
            newcell.style = "--end: " + calculateDecimal(element, maxValue) + ";"
    
            var newtext = document.createTextNode(element + " mA");
            newcell.appendChild(newtext);
        }
        else{
            var newrow = newbody.insertRow();
            var newcell = newrow.insertCell();
            newcell.style = "--start: " + calculateDecimal(stroomArray[index - 1], maxValue) + "; --end: " + calculateDecimal(element, maxValue) + ";"
    
            var newtext = document.createTextNode(element + " mA");
            newcell.appendChild(newtext);
        }
    }

    tbodyRef.parentNode.replaceChild(newbody, tbodyRef);
}

function popSpanningGraph() {
    var tbodyRef = document.getElementById('spanninggrafiek').getElementsByTagName('tbody')[0];
    var newbody = document.createElement('tbody');

    var maxValue = findMax(spanningArray);
    
    // Plaats elke entry in de grafiek
    for (let index = 0; index < spanningArray.length; index++) {
        const element = spanningArray[index];
        
        if (index == 0) {
            var newrow = newbody.insertRow();
            var newcell = newrow.insertCell();
            newcell.style = "--end: " + calculateDecimal(element, maxValue) + ";"
    
            var newtext = document.createTextNode(element + " V");
            newcell.appendChild(newtext);
        }
        else{
            var newrow = newbody.insertRow();
            var newcell = newrow.insertCell();
            newcell.style = "--start: " + calculateDecimal(spanningArray[index - 1], maxValue) + "; --end: " + calculateDecimal(element, maxValue) + ";"
    
            var newtext = document.createTextNode(element + " V");
            newcell.appendChild(newtext);
        }
    }

    tbodyRef.parentNode.replaceChild(newbody, tbodyRef);
}

function findMax(array){
    var maxValue = 0;

    array.forEach(element => {
        if (element > maxValue) {
            maxValue = element;
        }
    });
    
    return maxValue;
}

function calculateDecimal(number, maxValue){
    var decimalvalue = ((number * 100) / maxValue) / 100;

    return decimalvalue;
}

function firstInFirstOut(array, newEntry){
    if (array.length < 15) {
        // Als de array minder dan 15 entries heeft, voeg nieuwe waarde toe.
        addToArray(array, newEntry);
    }
    else{
        // als de array 15 entries heeft, verwijder de eerste, voeg de nieuwe toe.

        array.shift();

        addToArray(array, newEntry);
    }
}

function addToArray(array, newEntry){
    array.push(newEntry);
}

// Websocket (https://javascript.info/websocket)
socket = new WebSocket("ws://145.49.127.248:1880/ws/aaad2");
socket.onopen = function(e) {
    alert("[open] Websocket geopend");
  };

socket.onmessage = function(event) {
    // alert(`[message] Data ontvangen: ${event.data}`);

    // get event json
    const msg = JSON.parse(event.data);

    // verwerk alleen sensor data als de zonnepanelen zijn uitgeklapt.
    if (zonnepaneelStatus == 100) {
        // process event data
        var newStroom = msg.payload.stroom / 100;
        var newSpanning = msg.payload.spanning / 10;

        // add to arrays
        firstInFirstOut(stroomArray, newStroom)
        firstInFirstOut(spanningArray, newSpanning);

        // Update graphs
        popStroomGraph();
        popSpanningGraph();
    }

    // Weergeef status van zonnepaneel
    if (zonnepaneelStatus == 100) {
        document.getElementById("statusZonnepaneel").innerHTML = "Uitgeklapt (100%)"
    }
    else if (zonnepaneelStatus == 0) {
        document.getElementById("statusZonnepaneel").innerHTML = "Ingeklapt (0%)"
    }
    else{
        document.getElementById("statusZonnepaneel").innerHTML = zonnepaneelStatus + "%";
    }

}

socket.onclose = function(event) {
    if (event.wasClean) {
      alert(`[close] Connection goed gesloten, code=${event.code} reden=${event.reason}`);
    } else {
      // e.g. server process killed or network down
      // event.code is usually 1006 in this case
      alert('[close] Connection gesloten');
    }
  };

socket.onerror = function(error) {
    alert(`[error]`);
  };

