
// function to check if two arrays are equal or not
function arrEqual(arrayOne, arrayTwo){

// get array lengths
let N = arrayOne.length;
let M = arrayTwo.length;

// check whether array lengths are equal or not
if (N != M){ // If not
    return false; // arrays are not similar
}

// Sort both arrays
arrayOne.sort();
arrayTwo.sort();

// Compare elements 
for (let i = 0; i < N; i++){
    if (arrayOne[i] != arrayTwo[i]){  // if two elements doesn't match
        return false;
    }
}

// If all elements are same.
	return true;
}

module.exports = { arrEqual };
