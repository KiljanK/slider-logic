import getSliderLabel from "../utility/getSliderLabel";
import { lockIconFull } from "../utility/heroIcons";

let SliderLock = ({
	sliderSettings,
	sliderKey,
	disabled,
	displayLock,
	displayLabels,
	blockingConditions,
}) => {
	let opacity = disabled ? "opacity-100" : "opacity-0";
	opacity = displayLock ? opacity : "opacity-0";

	return (
		<div
			className={`absolute bottom-[55%] overflow-visible ${opacity} transition-opacity duration-300`}
		>
			<p className={"scale-[5]"}>{lockIconFull}</p>
			<ul
				className={`${opacity} transition-opacity duration-300 absolute top-[50%] left-[50%] -translate-x-1/2 flex items-center justify-center flex-col`}
			>
				{blockingConditions.map((blockingCondition) => {
					let sliderLabel = getSliderLabel(
						sliderSettings,
						displayLabels,
						blockingCondition,
						"text-lg p-0 text-center",
						`slider-blocker-of-${sliderKey}`
					);

					return (
						<li
							key={`li-slider-blocker-of-${sliderKey}-${blockingCondition}`}
						>
							{sliderLabel}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default SliderLock;
