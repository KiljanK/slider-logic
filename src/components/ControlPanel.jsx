import { useState } from "react";
import toggleDisplayStates from "../utility/toggleDisplayStates";
import ShowStates from "../utility/ShowStates";
import {
	reloadIcon,
	labelsIcon,
	labelsIconFull,
	lockIcon,
	lockIconFull,
	settingsIcon,
	chevronLeft,
} from "../utility/heroIcons";

let ControlPanel = ({
	labelDisplay,
	setLabelDisplay,
	lockDisplay,
	setLockDisplay,
	resetSliderValues,
}) => {
	// region Setup

	let [visibility, setVisibility] = useState(true);

	let labelOnClick = () => {
		toggleDisplayStates(labelDisplay, setLabelDisplay);
	};

	let lockOnClick = () => {
		toggleDisplayStates(lockDisplay, setLockDisplay);
	};

	// region Icons

	let buttons = {
		reload: {
			iconInactive: reloadIcon,
			iconActive: reloadIcon,
			logicState: ShowStates.LONG,
			onClick: resetSliderValues,
		},

		labels: {
			iconInactive: labelsIcon,
			iconActive: labelsIconFull,
			logicState: labelDisplay,
			onClick: labelOnClick,
		},

		locks: {
			iconInactive: lockIcon,
			iconActive: lockIconFull,
			logicState: lockDisplay,
			onClick: lockOnClick,
		},

		settings: {
			iconInactive: settingsIcon,
			iconActive: settingsIcon,
			logicState: ShowStates.LONG,
			onClick: () => {},
		},
	};

	// region Rendering

	let buttonClasses = `bg-gray-500/50 hover:bg-gray-700/50 active:scale-[0.9] text-white flex items-center justify-center p-1`;
	let hidingToggleClasses = `transition-all ${
		visibility ? "" : "rotate-180"
	}`;

	return (
		<header
			className={`absolute top-0 left-0 z-[1] h-fit ${
				visibility ? "" : "-translate-x-[100%]"
			} transition-all rounded-br-lg w-fit p-2 bg-gray-600/30 shadow-md text-white flex flex-col space-y-2`}
		>
			{Object.keys(buttons).map((buttonName) => {
				let button = buttons[buttonName];

				let opacity = button.logicState ? "opacity-100" : "opacity-25";
				let icon = button.iconInactive;

				if (button.logicState === ShowStates.LONG) {
					icon = button.iconActive;
				}

				return (
					<button
						className={`${opacity} ${buttonClasses} rounded-md`}
						key={`header-button-${buttonName}`}
						onClick={button.onClick}
					>
						{icon}
					</button>
				);
			})}

			{/* Separate Hiding / Showing Button */}
			<button
				className={`absolute top-[50%] right-[0] -translate-y-1/2 translate-x-[100%] rounded-r-lg !m-0 bg-gray-600/30 shadow-md p-1 opacity-25 hover:opacity-100 transition-all`}
				onClick={() => {
					setVisibility(!visibility);
				}}
			>
				<p className={hidingToggleClasses}>{chevronLeft}</p>
			</button>
		</header>
	);
};

export default ControlPanel;
