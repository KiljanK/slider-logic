let defaultSliders = {
	names: {
		testA: {
			color: "rgb(0, 166, 62)",
			labels: { short: "A", long: "Slider A" },
		},
		testB: {
			color: "rgb(0, 132, 209)",
			labels: { short: "B", long: "Slider B" },
		},
		testC: {
			color: "rgb(130, 0, 219)",
			labels: { short: "C", long: "Slider C" },
		},
		testD: {
			color: "rgb(251, 44, 54)",
			labels: { short: "D", long: "Slider D" },
		},
		testE: {
			color: "rgb(246, 51, 154)",
			labels: { short: "E", long: "Slider E" },
		},
		testF: {
			color: "rgb(255, 210, 48)",
			labels: { short: "F", long: "Slider F" },
		},
	},

	rules: {
		exclusions: [
			["testA", "testC"],
			["testA", "testD"],
			["testA", "testE"],
		],
		equivalencies: [],
		requirements: {
			testD: ["testB"],
			testC: ["testB"],
			testE: ["testF"],
		},
	},
};

export default defaultSliders;
