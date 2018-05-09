/*
File: Columns and Gutter.js
Description: A JavaScript that applies a number of columns and gutter width to the selected text box
input: integer(between 1 and 30) then comma(,) followed by column gap value (with valid units)
if unit is not added for column gap value, it takes the default measurement value
*/

//import basic checks
if (typeof (isLayoutOpen) == "undefined") {
	//import basic checks
	app.importScript(app.getAppScriptsFolder() + "/Dependencies/qx_validations.js");
	console.log("Loaded library for basic validation checks from application.");
}

//import measurements
if (typeof (setUnits) == "undefined") {
	//import basic checks
	app.importScript(app.getAppScriptsFolder() + "/Dependencies/qx_measurements.js");
	console.log("Loaded library for measurements from application.");
}

//Import necessary support scripts, if not included already
if (typeof (getValidNumericInput) == "undefined") {
	//import basic checks
	let inputsScript = app.getAppScriptsFolder() + "/Dependencies/qx_inputs.js";
	app.importScript(inputsScript);
	console.log("Loaded library qx_inputs for User Input.");
}

if (isLayoutOpen()) {
	if (getSelectedBoxOfType("text") != null) {
		//get the selected box
		let box = getSelectedBoxOfType("text");
		//get the current column count and gutter gap
		let currColCount = box.style.qxColumnCount;
		let currColGap = box.style.qxColumnGap;
		console.log("Current Column Count: " + currColCount + ", Current Column Gutter: " + currColGap);

		//get the box width
		let boxWidth = getBoxWidthInPts(box);

		//get the text inset
		let boxTextInset = getBoxInsetsInPts(box).left + getBoxInsetsInPts(box).right;

		//get the frame width
		let boxBorderWidth = 2 * getBoxBorderWidthInPts(box);

		//calculate the effective box width in pts
		let effectiveBoxWidth = boxWidth - (boxTextInset + boxBorderWidth);

		//get the current horizontal measurement units of the layout
		let currHorzUnits = getUnits(box.style.qxLeft);
		//input number of rows, columns and gutter widths
		let minBoxDim = 0.125;// since the minimum box dimension can be 0.1pt
		//get column count
		let minColumnCount = 1;
		let maxColumnCount = Math.min(parseInt(effectiveBoxWidth / (minBoxDim + minBoxDim ^ 2)), 30);
		let colCount = getValidNumericInput("How many columns?\nWhole numbers only. Partial boxes are not available", "2", minColumnCount, maxColumnCount, true);
		if (colCount != null) {
			let minColumnGutter = "0.125";//in points
			let maxColumnGutter = (effectiveBoxWidth - (colCount * minBoxDim)) / (colCount - 1);
			let colGutter = getValidNumericInput("Column gutter measurement\n\nExamples: 0.5in, 3pt etc.", 72, minColumnGutter, maxColumnGutter, false, currHorzUnits);
			if (colGutter != null) {
				box.style.qxColumnCount = colCount;//apply the column count value received
				box.style.qxColumnGap = colGutter;// apply the column gap value received
			}
		}
	}
}



