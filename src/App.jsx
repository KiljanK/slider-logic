import { useState } from "react";
import ControlPanel from "./components/ControlPanel";
import ShowStates from "./utility/ShowStates";

function App() {
	let [sliderSettings, setSliderSettings] = useState({});
	let [labelDisplay, setLabelDisplay] = useState(ShowStates.SHORT);
	let [lockDisplay, setLockDisplay] = useState(ShowStates.SHORT);

	return (
		<div className="min-w-screen min-h-screen bg-gray-800 text-white flex justify-center items-center">
			<ControlPanel
				labelDisplay={labelDisplay}
				setLabelDisplay={setLabelDisplay}
				lockDisplay={lockDisplay}
				setLockDisplay={setLockDisplay}
			/>
			<p className="text-3xl">Start Page</p>
		</div>
	);
}

export default App;
