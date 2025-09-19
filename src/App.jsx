import { useState } from "react";
import SliderPanel from "./components/SliderPanel";
import ControlPanel from "./components/ControlPanel";
import ShowStates from "./utility/ShowStates";
import defaultSliders from "./utility/defaultSliders";

let App = () => {
	// region Setup
	let generateSliderValues = (input) => {
		let output = {};
		let sliderKeys = input?.names ? Object.keys(input?.names) : [];
		for (let sliderKey of sliderKeys) {
			output[sliderKey] = 0;
		}
		return output;
	};

	let [sliders, setSliders] = useState(generateSliderValues(defaultSliders));
	let [sliderSettings, setSliderSettings] = useState(defaultSliders);
	let [labelDisplay, setLabelDisplay] = useState(ShowStates.SHORT);
	let [lockDisplay, setLockDisplay] = useState(ShowStates.LONG);
	let [infoDisplay, setInfoDisplay] = useState(true);

	// region SliderLogic

	let resetSliderValues = () => {
		let newSliders = { ...sliders };

		for (let sliderKey of Object.keys(newSliders)) {
			newSliders[sliderKey] = 0;
		}

		setSliders(newSliders);
	};

	let sliderSetter = (name, value) => {
		let newSliders = { ...sliders };
		newSliders[name] = value;

		let rules = sliderSettings?.rules;
		let requirements = rules?.requirements || {};
		let exclusions = rules?.exclusions || [];
		let equivalencies = rules?.equivalencies || [];

		let cascadeRequirementRules = (name) => {
			for (let requiringSlider of Object.keys(requirements)) {
				if (requirements[requiringSlider]?.includes(name)) {
					newSliders[requiringSlider] = 0;

					cascadeRequirementRules(requiringSlider);
				}
			}
		};

		let cascadeExclusionRules = (name) => {
			for (let exclusion of exclusions) {
				if (exclusion?.includes(name)) {
					let getsExcluded = exclusion?.find(
						(element) => element !== name
					);

					newSliders[getsExcluded] = 0;
					cascadeRequirementRules(getsExcluded);
					cascadeEquivalencyRules(getsExcluded, 0, equivalencies);
				}
			}
		};

		let cascadeEquivalencyRules = (name, value, equivalencies) => {
			for (let equivalency of equivalencies) {
				if (equivalency?.includes(name)) {
					let getsManuallySet = equivalency?.find(
						(element) => element !== name
					);

					newSliders[getsManuallySet] = value;

					if (value === 0 && Object.keys(requirements).length > 0) {
						cascadeRequirementRules(getsManuallySet);
					}

					cascadeExclusionRules(getsManuallySet);

					// prevent infinite recursions
					let newEquivalencies = [...equivalencies];
					newEquivalencies.splice(
						equivalencies.indexOf(equivalency),
						1
					);

					cascadeEquivalencyRules(
						getsManuallySet,
						value,
						newEquivalencies
					);
				}
			}
		};

		// If you are setting a slider to 0, check if any other sliders become unavailable (recursively)
		if (value === 0 && Object.keys(requirements).length > 0) {
			cascadeRequirementRules(name);
		}

		// Respect mutually exclusive sliders
		if (value > 0 && exclusions.length > 0) {
			cascadeExclusionRules(name);
		}

		// Also keep in mind that sliders may me linked to each other
		if (equivalencies.length > 0) {
			cascadeEquivalencyRules(name, value, equivalencies);
		}

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
				resetSliderValues={resetSliderValues}
				infoDisplay={infoDisplay}
				setInfoDisplay={setInfoDisplay}
			/>
			<SliderPanel
				sliderValues={sliders}
				sliderSettings={sliderSettings}
				sliderSetter={sliderSetter}
				labelDisplay={labelDisplay}
				lockDisplay={lockDisplay}
				infoDisplay={infoDisplay}
			/>
		</div>
	);
};

export default App;
