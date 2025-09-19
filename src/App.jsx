import { useState } from "react";
import SliderPanel from "./components/SliderPanel";
import ControlPanel from "./components/ControlPanel";
import ShowStates from "./utility/ShowStates";
import defaultSliders from "./utility/defaultSliders";

let App = () => {
	// region Setup
	let populateSliderValues = (input) => {
		let output = {};
		let sliderKeys = input?.names ? Object.keys(input?.names) : [];
		for (let sliderKey of sliderKeys) {
			output[sliderKey] = 0;
		}
		return output;
	};

	let [sliders, setSliders] = useState(populateSliderValues(defaultSliders));
	let [sliderSettings, setSliderSettings] = useState(defaultSliders);
	let [labelDisplay, setLabelDisplay] = useState(ShowStates.SHORT);
	let [lockDisplay, setLockDisplay] = useState(ShowStates.SHORT);

	let sliderSetter = (name, value) => {
		let newSliders = { ...sliders };
		newSliders[name] = value;

		setSliders(newSliders);
	};

	// region Rendering
	return (
		<div className="min-w-screen min-h-screen bg-gray-800 text-white flex justify-center items-center">
			<ControlPanel
				labelDisplay={labelDisplay}
				setLabelDisplay={setLabelDisplay}
				lockDisplay={lockDisplay}
				setLockDisplay={setLockDisplay}
			/>
			<SliderPanel
				sliderValues={sliders}
				sliderSettings={sliderSettings}
				sliderSetter={sliderSetter}
				labelDisplay={labelDisplay}
				lockDisplay={lockDisplay}
			/>
		</div>
	);
};

export default App;
