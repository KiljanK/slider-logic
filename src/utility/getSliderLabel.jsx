import ShowStates from "./ShowStates";

let getSliderLabel = (
	sliderSettings,
	displayLabels,
	sliderKey,
	classes,
	keyPrefix
) => {
	let name = null;
	let color = "rgba(255, 255, 255, 1)";

	if (Object.keys(sliderSettings?.names)?.includes(sliderKey)) {
		let keySettings = sliderSettings?.names[sliderKey];
		let labels = keySettings?.labels;

		if (labels?.long && displayLabels === ShowStates.LONG) {
			name = keySettings?.labels?.long;
		} else if (labels?.short && displayLabels === ShowStates.SHORT) {
			name = keySettings?.labels?.short;
		}

		color = keySettings?.color || "rgba(255, 255, 255, 1)";
	}

	if (!name) return;

	return (
		<p
			key={`${keyPrefix}-${sliderKey}`}
			className={`${classes}`}
			style={{ color: color }}
		>
			{name}
		</p>
	);
};

export default getSliderLabel;
