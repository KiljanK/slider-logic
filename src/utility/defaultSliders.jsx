let defaultSliders = {
	names: {
		quiet: {
			color: "rgb(0, 166, 62)",
			labels: { short: "🔇", long: "Quiet" },
		},
		loud: {
			color: "rgb(251, 44, 54)",
			labels: { short: "🔊", long: "Loud" },
		},
		water: {
			color: "rgb(0, 132, 209)",
			labels: { short: "🚰", long: "Water" },
		},
		bathtub: {
			color: "rgba(220, 220, 220, 1)",
			labels: { short: "🛁", long: "Bathtub" },
		},
		bath: {
			color: "rgb(246, 51, 154)",
			labels: { short: "🛀", long: "Taking Bath" },
		},
		comfort: {
			color: "rgb(255, 210, 48)",
			labels: { short: "😌", long: "Comfort" },
		},
	},

	rules: {
		exclusions: [
			["day", "night"],
			["quiet", "loud"],
		],
		equivalencies: [],
		requirements: {
			bath: ["water", "bathtub"],
			comfort: ["bath", "quiet"],
		},
	},
};

export default defaultSliders;
