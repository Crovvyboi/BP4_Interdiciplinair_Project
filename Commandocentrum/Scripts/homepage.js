function inUitklappenZonnepanelen() {
    // Check of zonnepaneel in of uitgeklapt is
    // Zo ja, klap de zonnepanelen in. Zo nee, klap ze uit.

    // To do: 
    //      - Vervang if statements voor de data uit de websocket
    //      - Blokkeer de knop totdat een signaal is gegeven dat de zonnepanelen volledig in/uit zijn geklapt (wordt procentueel gedaan waarschijnlijk)

    if (document.getElementById("statusZonnepaneel").innerHTML == "Ingeklapt" || document.getElementById("statusZonnepaneel").innerHTML == "Kan niet verbinden") {
        // Verander status van zonnepaneel -> Uitgeklapt
        document.getElementById("statusZonnepaneel").innerHTML = "Uitgeklapt"
    }
    else if (document.getElementById("statusZonnepaneel").innerHTML == "Uitgeklapt") {
        // Verander status van zonnepaneel -> Ingeklapt
        document.getElementById("statusZonnepaneel").innerHTML = "Ingeklapt"
    }
    else {
        // Kan geen verbinding maken met de aaadlander
        document.getElementById("statusZonnepaneel").innerHTML = "Kan niet verbinden"
    }


    // Tijdelijk, wordt later geactiveerd via de websocket
    popStroomGraph();
    popSpanningGraph();
}

function popStroomGraph() {
    // Tijdelijke array, wordt vervangen door websocket data
    const stroomArray = [15, 6, 9, 4, 1, 7, 19, 11, 5, 18, 16, 14, 17, 20, 13];

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
    // Tijdelijke array, wordt vervangen door websocket data
    const spanningArray = [17, 1, 10, 14, 4, 16, 11, 20, 12, 13, 19, 8, 6, 2, 3];

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

webSocket = new WebSocket("ws://145.49.127.248:1880/ws/aaad2");
websocket.onmessage = function(event) => {
    switch (key) {
        case value:
            
            break;
    
        default:
            break;
    }
}

