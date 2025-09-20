let generateSliderValues = (input) => {
	let output = {};
	let sliderKeys = input?.names ? Object.keys(input?.names) : [];
	for (let sliderKey of sliderKeys) {
		output[sliderKey] = 0;
	}
	return output;
};

export default generateSliderValues;
