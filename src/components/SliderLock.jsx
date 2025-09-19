import { lockIconFull } from "../utility/heroIcons";

let SliderLock = ({
	sliderSettings,
	sliderKey,
	disabled,
	displayLock,
	displayLockLabel,
	blockingConditions,
}) => {
	let opacity = !disabled || !displayLock ? "opacity-0" : "opacity-100";
	let conditionOpacity = displayLockLabel ? "opacity-100" : "opacity-0";

	return (
		<div
			className={`absolute bottom-[55%] overflow-visible ${opacity} transition-opacity duration-300`}
		>
			<p className={"scale-[5]"}>{lockIconFull}</p>
			<ul
				className={`${conditionOpacity} transition-opacity duration-300 absolute top-[50%] left-[50%] -translate-x-1/2 flex items-center justify-center flex-col`}
			>
				{blockingConditions.map((blockingCondition) => {
					let displayInformation =
						sliderSettings?.names[blockingCondition];
					let displayColor =
						displayInformation?.color || "rgba(172, 172, 172, 1)";

					return (
						<li
							className="text-lg p-0"
							style={{
								color: displayColor,
							}}
							key={`slider-${sliderKey}-${blockingCondition}`}
						>
							{blockingCondition}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default SliderLock;
