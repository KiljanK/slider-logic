import ShowStates from "./ShowStates";

let getSliderLabel = (
	sliderSettings,
	displayLabels,
	sliderKey,
	classes,
	keyPrefix
) => {
	let displayName = null;
	let color = "rgba(255, 255, 255, 1)";

	if (Object.keys(sliderSettings?.names)?.includes(sliderKey)) {
		let keySettings = sliderSettings?.names[sliderKey];
		let labels = keySettings?.labels;

		if (labels?.long && displayLabels === ShowStates.LONG) {
			displayName = keySettings?.labels?.long;
		} else if (labels?.short && displayLabels === ShowStates.SHORT) {
			displayName = keySettings?.labels?.short;
		}

		color = keySettings?.color || "rgba(255, 255, 255, 1)";
	}

	if (!displayName) return;

	return (
		<p
			key={`${keyPrefix}-${sliderKey}`}
			className={`${classes}`}
			style={{ color: color }}
		>
			{displayName}
		</p>
	);
};

export default getSliderLabel;
