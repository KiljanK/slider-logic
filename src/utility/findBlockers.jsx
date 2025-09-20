let findBlockers = (sliderSettings, sliderValues, sliderKey) => {
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

	return blockingConditions;
};

export default findBlockers;
