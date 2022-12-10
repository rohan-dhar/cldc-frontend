const easeInTransitionFactory = (time = 0.3) => ({
	duration: time,
	ease: [0, 0.88, 0.48, 1],
});

const anim = {
	page: {
		initial: {
			y: 90,
			scale: 0.85,
			opacity: 0.5,
			transition: easeInTransitionFactory(0.6),
		},
		animate: {
			y: 0,
			scale: 1,
			opacity: 1,
			transition: easeInTransitionFactory(0.6),
		},
		exit: {
			y: -90,
			scale: 0.85,
			opacity: 0.4,
			transition: easeInTransitionFactory(0.6),
		},
	},
};

export default anim;
