import generateSliderValues from "./generateSliderValues";

let applySettings = async (
	sliderSettings,
	newSliderSettings,
	setSliders,
	setSliderSettings
) => {
	let previous = { ...sliderSettings };

	try {
		setSliders(generateSliderValues(newSliderSettings));
		setSliderSettings(newSliderSettings);
	} catch {
		setSliders(generateSliderValues(previous));
		setSliderSettings(previous);
	}
};

export default applySettings;
