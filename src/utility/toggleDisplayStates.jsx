import ShowStates from "./ShowStates";

let toggleDisplayStates = (state, setter) => {
	let current = state;
	let next = null;

	if (!current) {
		next = ShowStates.SHORT;
	} else if (current === ShowStates.SHORT) {
		next = ShowStates.LONG;
	} else if (current === ShowStates.LONG) {
		next = null;
	}

	setter(next);
};

export default toggleDisplayStates;
