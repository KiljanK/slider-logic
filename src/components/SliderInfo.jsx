import getSliderLabel from "../utility/getSliderLabel";
import {
	lockIconFull,
	lightningIconFull,
	equalsIcon,
} from "../utility/heroIcons";

let SliderInfo = ({
	sliderSettings,
	sliderKey,
	disabled,
	displayInformation,
	displayLabels,
}) => {
	// region Setup
	let rules = sliderSettings?.rules;
	if (Object.keys(rules)?.length === 0) return;

	let makeElementsFromKeys = (elementList, keyList) => {
		for (let key of keyList) {
			let sliderLabel = getSliderLabel(
				sliderSettings,
				displayLabels,
				key,
				null,
				`slider-info-of-${sliderKey}`
			);

			elementList.push(sliderLabel);
		}
	};

	let requirements = [];
	let exclusions = [];
	let equivalencies = [];

	// region Exclusion Labels
	if (Object.keys(rules?.requirements)?.includes(sliderKey)) {
		let requiredKeys = rules?.requirements[sliderKey];
		makeElementsFromKeys(requirements, requiredKeys);
	}

	// region Exclusion Labels
	let relevantExclusions =
		rules?.exclusions?.filter((exclusion) =>
			exclusion?.includes(sliderKey)
		) || [];

	if (relevantExclusions.length > 0) {
		let exclusionKeys = [];
		for (let relevantExclusion of relevantExclusions) {
			exclusionKeys.push(
				relevantExclusion?.find((key) => key !== sliderKey)
			);
		}
		makeElementsFromKeys(exclusions, exclusionKeys);
	}

	// region Equivalency Labels
	let relevantEquivalencies =
		rules?.equivalencies?.filter((equivalency) =>
			equivalency?.includes(sliderKey)
		) || [];

	if (relevantEquivalencies.length > 0) {
		let equivalencyKeys = [];
		for (let relevantEquivalency of relevantEquivalencies) {
			equivalencyKeys.push(
				relevantEquivalency?.find((key) => key !== sliderKey)
			);
		}
		makeElementsFromKeys(equivalencies, equivalencyKeys);
	}

	// If there are no rules, skip this whole thing
	if ([...requirements, ...exclusions, ...equivalencies].length === 0) return;

	let opacity = !displayInformation ? "opacity-0 z-[0]" : "opacity-100 z-[2]";

	// region Rendering
	return (
		<ul
			className={`bg-white/50 backdrop-blur-sm rounded-lg p-2 text-center mt-12 absolute top-0 select-none cursor-default ${opacity} transition-opacity duration-1000 flex flex-col items-start justify-center pointer-events-none`}
		>
			{requirements?.length > 0 && (
				<span className={`flex items-center justify-center space-x-2`}>
					{lockIconFull}
					{requirements}
				</span>
			)}

			{exclusions?.length > 0 && (
				<span className={`flex items-center justify-center space-x-2`}>
					{lightningIconFull}
					{exclusions}
				</span>
			)}

			{equivalencies?.length > 0 && (
				<span className={`flex items-center justify-center space-x-2`}>
					{equalsIcon}
					{equivalencies}
				</span>
			)}
		</ul>
	);
};

export default SliderInfo;
