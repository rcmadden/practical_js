var array = ["Jan", "March", "April", "May", "June", "July"]
var insertItem = 99;
var tempCurrent;
var tempNext;
var insertItemCount = 1;
var newArrayLength = array.length + insertItemCount;
tempCurrent = array[1]; 
// second time array[1] = tempCurrent
array[1] = insertItem; //tempCurrent
tempNext = array[2];
array[2] = tempCurrent;

tempCurrent = array[3];
array[3] = tempNext;
tempNext = array[4]; //
array[4] = tempCurrent;
tempCurrent = array[5];//
array[5] = tempNext;
tempNext = array[6]; //
array[6] = tempCurrent;
// tempCurrent = array[7];//
// array[7] = tempNext;



var insertItem = 99;
var tempCurrent;
var tempNext;
var insertItemCount = 1;
var arrayLength = array.length;
var newArrayLength = array.length + insertItemCount;

for(var i = insertItemCount; i < arrayLength; i++){

	if(i === insertItemCount){
		tempCurrent = array[i]; 
    	array[i] = insertItem; //tempNext
		tempNext = array[i + 1];
		array[i + 1] = tempCurrent;
    } else {
		tempCurrent = tempNext;
		tempNext = array[i + 1];
		array[i + 1] = tempCurrent;
		
	}

}


function splice(array, startIndex, optionalDeleteCount, optionalItems){
   	var arrayLength = array.length;
    var insertItem = 99;
    var tempCurrent;
    var tempNext;
    var insertItemCount = 1;
    var arrayLength = array.length;
    var insertItemCount = arguments.length + 1 - 4;
	console.log(insertItemCount);

    for(var i = insertItemCount; i < arrayLength; i++){
        if(i === insertItemCount){
            tempCurrent = array[i]; 
            array[i] = insertItem; //tempNext
            tempNext = array[i + 1];
            array[i + 1] = tempCurrent;
        } else {
            tempCurrent = tempNext;
            tempNext = array[i + 1];
            array[i + 1] = tempCurrent;

        }

    } 
	return array;
}

var array = ["Jan", "March", "April", "May", "June", "July"];
var insertItem = 99;
var tempCurrent;
var tempNext;
var insertItemCount = 1;
var arrayLength = array.length;
var newArrayLength = array.length + insertItemCount;

for(var i = insertItemCount; i < arrayLength; i++){
	debugger;
	// tempCurrent = array[1];
	// tempCurrent = array[i];
    // second time array[1] = tempNext
// 	tempCurrent = tempNext;
// 	tempNext = array[i + 1];
// 	array[i + 1] = tempNext;
	if(i === insertItemCount){
		tempCurrent = array[i]; 
    	array[i] = insertItem; //tempNext
		tempNext = array[i + 1];
		array[i + 1] = tempCurrent;
// 		tempCurrent = array[i + 1];
    } else {
		tempCurrent = tempNext;
		tempNext = array[i + 1];
		array[i] = tempCurrent; 
//     	array[i + 1] = tempNext;
    	
// 		tempNext = array[i + 1 + 1];
// 		array[i + 1 + 1] = tempNext;
// 		tempCurrent = array[i + 1];
		
	}
	// tempNext = array[2];
	// tempNext = array[i + 1];
	// array[2] = tempCurrent;
	// array[i + 1] = tempCurrent;
    // second loop tempCurrent i + 1 and tempNext i + 1 + 1
//     tempCurrent = array[3];
//     array[3] = tempNext;
//     tempNext = array[4]; //
//     array[4] = tempCurrent;
}
// tempCurrent = array[5];//
// array[5] = tempNext;
// tempNext = array[6]; //
// array[6] = tempCurrent;
// tempCurrent = array[7];//
// array[7] = tempNext;

array;