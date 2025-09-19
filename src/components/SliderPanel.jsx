import ShowStates from "../utility/ShowStates";

let SliderPanel = ({
	sliderValues,
	sliderSettings,
	sliderSetter,
	labelDisplay,
	lockDisplay,
}) => {
	// region Setup

	return (
		<div className={`w-[90%] px-4 py-8 justify-around flex flex-row`}>
			{Object.keys(sliderValues).map((sliderKey) => {
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

				return (
					<div
						className="slider-container z-[0] flex flex-col h-[70vh] items-center justify-center relative"
						key={`slider-${sliderKey}`}
					>
						<input
							className={`w-[70vh] -rotate-90 absolute bottom-[50%]`}
							type="range"
							orient="vertical"
							min="0"
							max="100"
							style={{
								"--slider-color": displayColor,
							}}
							value={currentValue}
							onChange={(e) => {
								let numericValue = parseInt(e.target.value);

								sliderSetter(sliderKey, numericValue);

								let progress = (numericValue * 100) / 100;
								e.target.style.setProperty(
									"--progress",
									`${progress}%`
								);
							}}
						/>
						<p
							className={`text-3xl text-center mt-12 absolute bottom-0 translate-y-full`}
							style={{
								color: displayColor,
							}}
						>
							{displayName}
						</p>
					</div>
				);
			})}
		</div>
	);
};

export default SliderPanel;
