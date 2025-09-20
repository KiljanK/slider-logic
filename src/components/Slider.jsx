import getSliderLabel from "../utility/getSliderLabel";
import SliderLock from "./SliderLock";
import SliderInfo from "./SliderInfo";

let Slider = ({
	sliderKey,
	sliderValues,
	sliderSettings,
	sliderSetter,
	labelDisplay,
	lockDisplay,
	infoDisplay,
}) => {
	// region Color Bar

	let displayColor =
		sliderSettings?.names?.[sliderKey]?.color || "rbga(255, 255, 255, 1)";

	let currentValue = sliderValues[sliderKey];

	let progressValue = currentValue;
	let progressModifier = 0;

	if (currentValue <= 10) {
		progressModifier = 5;
	} else if (currentValue >= 80) {
		progressModifier = -5;
	}

	progressValue += progressModifier;

	// region Disabling

	let disabled = false;
	let potentialBlockers = [];
	let blockingConditions = [];

	let requirements = sliderSettings?.rules?.requirements || {};
	for (let requirement of Object.keys(requirements)) {
		if (requirement !== sliderKey) continue;

		potentialBlockers = requirements[requirement];
	}

	for (let potentialBlocker of potentialBlockers) {
		if (sliderValues[potentialBlocker] <= 0) {
			blockingConditions.push(`${potentialBlocker}`);
		}
	}

	disabled = blockingConditions.length > 0;

	let opacity = disabled ? "opacity-25" : "opacity-100";

	// region Labeling

	let labelClass = `text-3xl text-center mt-12 absolute bottom-0 translate-y-full select-none cursor-default ${""} transition-opacity duration-1000`;

	let displayLabel = getSliderLabel(
		sliderSettings,
		labelDisplay,
		sliderKey,
		labelClass,
		`global-slider-label-of`
	);
	// region Rendering
	return (
		<div
			className={`slider-container z-[1] flex flex-col h-[70vh] items-center justify-center relative`}
		>
			<input
				className={`w-[70vh] -rotate-90 absolute bottom-[50%] ${opacity} transition-opacity duration-1000`}
				type="range"
				orient="vertical"
				min="0"
				max="100"
				style={{
					"--slider-color": displayColor,
					"--progress": `${progressValue}%`,
				}}
				value={currentValue}
				disabled={disabled}
				onChange={(e) => {
					let numericValue = Number(e.target.value);
					sliderSetter(sliderKey, numericValue);
				}}
			/>

			{displayLabel}

			<SliderInfo
				sliderSettings={sliderSettings}
				sliderKey={sliderKey}
				disabled={disabled}
				displayInformation={infoDisplay}
				displayLabels={labelDisplay}
			/>

			<SliderLock
				sliderSettings={sliderSettings}
				sliderKey={sliderKey}
				disabled={disabled}
				displayLock={lockDisplay}
				displayLabels={labelDisplay}
				blockingConditions={blockingConditions}
			/>
		</div>
	);
};

export default Slider;
