import ShowStates from "../utility/ShowStates";
import SliderLock from "./SliderLock";
import SliderInfo from "./SliderInfo";

let SliderPanel = ({
	sliderValues,
	sliderSettings,
	sliderSetter,
	labelDisplay,
	lockDisplay,
	infoDisplay,
}) => {
	// region Setup

	return (
		<div className={`w-[90%] px-4 py-8 justify-around flex flex-row`}>
			{Object.keys(sliderValues).map((sliderKey) => {
				// general display logic
				let displayInformation = sliderSettings?.names[sliderKey];
				let displayColor =
					displayInformation?.color || "rgba(172, 172, 172, 1)";
				let displayNames = displayInformation?.labels;
				let displayName = null;

				if (labelDisplay === ShowStates.SHORT) {
					displayName = displayNames?.short || sliderKey;
				} else if (labelDisplay === ShowStates.LONG) {
					displayName = displayNames?.long || sliderKey;
				}

				let currentValue = sliderValues[sliderKey];

				// disabling logic
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
				let displayLock = false;
				let displayLockLabel = false;

				if (lockDisplay === ShowStates.SHORT) {
					displayLock = true;
				} else if (lockDisplay === ShowStates.LONG) {
					displayLock = true;
					displayLockLabel = true;
				}

				// region Rendering
				return (
					<div
						className={`slider-container z-[0] flex flex-col h-[70vh] items-center justify-center relative`}
						key={`slider-${sliderKey}`}
					>
						<input
							className={`w-[70vh] -rotate-90 absolute bottom-[50%] ${opacity} transition-opacity duration-1000`}
							type="range"
							orient="vertical"
							min="0"
							max="100"
							style={{
								"--slider-color": displayColor,
								"--progress": `${currentValue}%`,
							}}
							value={currentValue}
							disabled={disabled}
							onChange={(e) => {
								let numericValue = parseInt(e.target.value);

								sliderSetter(sliderKey, numericValue);
							}}
						/>

						<p
							className={`text-3xl text-center mt-12 absolute bottom-0 translate-y-full select-none cursor-default ${
								displayName ? opacity : "opacity-0"
							} transition-opacity duration-1000`}
							style={{
								color: displayColor,
							}}
						>
							{displayName}
						</p>

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
							displayLock={displayLock}
							displayLockLabel={displayLockLabel}
							blockingConditions={blockingConditions}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default SliderPanel;
