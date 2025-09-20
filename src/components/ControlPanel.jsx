import { useState } from "react";
import mobileCheck from "../utility/mobileCheck";
import applySettings from "../utility/applySettings";
import toggleDisplayStates from "../utility/toggleDisplayStates";
import ShowStates from "../utility/ShowStates";
import {
	reloadIcon,
	labelsIcon,
	labelsIconFull,
	lockIcon,
	lockIconFull,
	settingsIcon,
	infoIcon,
	infoIconFull,
	scaleIcon,
	chevronLeft,
} from "../utility/heroIcons";

let ControlPanel = ({
	labelDisplay,
	setLabelDisplay,
	lockDisplay,
	setLockDisplay,
	infoDisplay,
	setInfoDisplay,
	legalDisplay,
	setLegalDisplay,
	sliderSettings,
	setSliderSettings,
	setSliders,
	resetSliderValues,
}) => {
	// region Setup

	let [visibility, setVisibility] = useState(true);

	let settingsOnClick = async (e) => {
		let isMobile = mobileCheck();
		let newText = ``;

		if (isMobile) {
			newText = prompt("Please Enter a new Settings-Object!");
		} else {
			let clipboard = await navigator.clipboard.readText();
			newText = clipboard;
		}

		newText = `${newText}`.trim();

		try {
			let newSliderSettings = JSON.parse(newText);
			await applySettings(
				sliderSettings,
				newSliderSettings,
				setSliders,
				setSliderSettings
			);
		} catch {}
	};

	// region Button Content

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
			onClick: () => {
				toggleDisplayStates(labelDisplay, setLabelDisplay);
			},
		},

		locks: {
			iconInactive: lockIcon,
			iconActive: lockIconFull,
			logicState: lockDisplay,
			onClick: () => {
				setLockDisplay(!lockDisplay);
			},
		},

		info: {
			iconInactive: infoIcon,
			iconActive: infoIconFull,
			logicState: infoDisplay,
			onClick: () => {
				setInfoDisplay(!infoDisplay);
			},
		},

		legal: {
			iconInactive: scaleIcon,
			iconActive: scaleIcon,
			logicState: legalDisplay,
			onClick: () => {
				setLegalDisplay(!legalDisplay);
			},
		},

		settings: {
			iconInactive: settingsIcon,
			iconActive: settingsIcon,
			logicState: ShowStates.LONG,
			onClick: settingsOnClick,
		},
	};

	// region Rendering

	let buttonClasses = `bg-gray-500/50 hover:bg-gray-700/50 active:scale-[0.9] text-white flex items-center justify-center p-1`;
	let rotationClass = visibility ? "" : "rotate-180";

	return (
		<header
			className={`absolute top-0 left-0 z-[2] h-fit ${
				visibility ? "" : "-translate-x-[100%]"
			} transition-all rounded-br-lg w-fit p-2 bg-gray-600/30 shadow-md text-white flex flex-col space-y-2`}
		>
			{/* Map all of the buttons onto the Panel */}
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
				<p className={`transition-all ${rotationClass}`}>
					{chevronLeft}
				</p>
			</button>
		</header>
	);
};

export default ControlPanel;
