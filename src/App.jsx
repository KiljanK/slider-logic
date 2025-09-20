import { useState } from "react";
import Slider from "./components/Slider";
import ControlPanel from "./components/ControlPanel";
import ShowStates from "./utility/ShowStates";
import defaultSliders from "./utility/defaultSliders";
import generateSliderValues from "./utility/generateSliderValues";

let App = () => {
	// region Setup

	let [sliders, setSliders] = useState(generateSliderValues(defaultSliders));
	let [sliderSettings, setSliderSettings] = useState(defaultSliders);
	let [labelDisplay, setLabelDisplay] = useState(ShowStates.SHORT);
	let [lockDisplay, setLockDisplay] = useState(true);
	let [infoDisplay, setInfoDisplay] = useState(false);

	// region Slider Logic

	let resetSliderValues = () => {
		let newSliders = { ...sliders };

		for (let sliderKey of Object.keys(newSliders)) {
			newSliders[sliderKey] = 0;
		}

		setSliders(newSliders);
	};

	let sliderSetter = (key, value) => {
		let newSliders = { ...sliders };
		newSliders[key] = value;

		let rules = sliderSettings?.rules;
		let requirements = rules?.requirements || {};
		let exclusions = rules?.exclusions || [];
		let equivalencies = rules?.equivalencies || [];

		let cascadeRequirementRules = (key) => {
			for (let requiringSlider of Object.keys(requirements)) {
				if (requirements[requiringSlider]?.includes(key)) {
					newSliders[requiringSlider] = 0;

					cascadeRequirementRules(requiringSlider);
				}
			}
		};

		let cascadeExclusionRules = (key) => {
			for (let exclusion of exclusions) {
				if (exclusion?.includes(key)) {
					let getsExcluded = exclusion?.find(
						(element) => element !== key
					);

					newSliders[getsExcluded] = 0;
					cascadeRequirementRules(getsExcluded);
					cascadeEquivalencyRules(getsExcluded, 0, equivalencies);
				}
			}
		};

		let cascadeEquivalencyRules = (key, value, equivalencies) => {
			for (let equivalency of equivalencies) {
				if (equivalency?.includes(key)) {
					let getsManuallySet = equivalency?.find(
						(element) => element !== key
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
			cascadeRequirementRules(key);
		}

		// Respect mutually exclusive sliders
		if (value > 0 && exclusions.length > 0) {
			cascadeExclusionRules(key);
		}

		// Also keep in mind that sliders may me linked to each other
		if (equivalencies.length > 0) {
			cascadeEquivalencyRules(key, value, equivalencies);
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
				infoDisplay={infoDisplay}
				setInfoDisplay={setInfoDisplay}
				sliderSettings={sliderSettings}
				setSliderSettings={setSliderSettings}
				setSliders={setSliders}
				resetSliderValues={resetSliderValues}
			/>

			<div className={`w-[90%] px-4 py-8 justify-around flex flex-row`}>
				{Object.keys(sliders).map((sliderKey) => {
					return (
						<Slider
							sliderKey={sliderKey}
							sliderValues={sliders}
							sliderSettings={sliderSettings}
							sliderSetter={sliderSetter}
							labelDisplay={labelDisplay}
							lockDisplay={lockDisplay}
							infoDisplay={infoDisplay}
							key={`slider-${sliderKey}`}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default App;
