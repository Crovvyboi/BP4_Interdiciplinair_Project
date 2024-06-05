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

    return array;
}

function addToArray(array, newEntry){
    array.push(newEntry);
    return array;
}


// module.exports= {findMax, calculateDecimal, firstInFirstOut, addToArray};