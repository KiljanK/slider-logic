import { useState, useEffect } from "react";
import Slider from "./components/Slider";
import ControlPanel from "./components/ControlPanel";
import ShowStates from "./utility/ShowStates";
import applySettings from "./utility/applySettings";
import findBlockers from "./utility/findBlockers";
import defaultSliders from "./utility/defaultSliders";
import generateSliderValues from "./utility/generateSliderValues";
import { codeIcon } from "./utility/heroIcons";

let App = () => {
	// region Setup

	let [sliders, setSliders] = useState(generateSliderValues(defaultSliders));
	let [sliderSettings, setSliderSettings] = useState(defaultSliders);
	let [labelDisplay, setLabelDisplay] = useState(ShowStates.SHORT);
	let [lockDisplay, setLockDisplay] = useState(true);
	let [infoDisplay, setInfoDisplay] = useState(false);
	let [legalDisplay, setLegalDisplay] = useState(false);

	// Attempting to write a settings object taken from the URI

	useEffect(() => {
		try {
			let searchParameters = new URL(document.location.toString())
				.searchParams;
			let searchSettings = searchParameters?.get("settings");

			let newSliderSettings = JSON.parse(
				decodeURIComponent(searchSettings)
			);

			// Ignore empty settings, also ignore settings that have neither rules nor names
			if (!newSliderSettings) return;
			let keys = Object.keys(newSliderSettings) || [];
			if (!keys.includes("names") && keys.includes("rules")) return;

			applySettings(
				sliderSettings,
				newSliderSettings,
				setSliders,
				setSliderSettings
			);
		} catch {}
	}, []);

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

					let blockingConditions = findBlockers(
						sliderSettings,
						sliders,
						getsManuallySet
					);

					if (blockingConditions.length === 0) {
						newSliders[getsManuallySet] = value;
					}

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
				legalDisplay={legalDisplay}
				setLegalDisplay={setLegalDisplay}
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

			<div
				className={`absolute top-0 right-0 p-2 italic flex items-center justify-center space-x-2 animate-opacity duration-300 ${
					legalDisplay ? "opacity-50" : "opacity-0"
				}`}
			>
				<p>
					This app is for my private (personal) use only and does not
					represent a public product or service.
				</p>
				<a
					href={`https://github.com/KiljanK/slider-logic/`}
					target="_blank"
					rel="noopener noreferrer"
					className={`flex items-center justify-center space-x-1 hover:underline`}
				>
					<p>{codeIcon}</p>
					<p>GitHub</p>
				</a>
			</div>
		</div>
	);
};

export default App;
