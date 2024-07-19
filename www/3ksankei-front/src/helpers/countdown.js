import { ref } from "vue";

/**
 *
 * @param {number} duration
 * @param {Function} callback
 * @param {number} startValue
 * @param {number} endValue
 */
export const createCountdown = (
	duration,
	callback,
	startValue = 100,
	endValue = 0,
	updatesPerSecond = 2,
) => {
	const updateInterval = 1000 / updatesPerSecond;
	const value = ref(startValue);
	const valueChangePerUpdate =
		(startValue - endValue) / ((duration / 1000) * updatesPerSecond);

	const countdown = {
		running: false,
		interval: null,
		start: () => {
			countdown.running = true;
			countdown.interval = setInterval(() => {
				value.value = Math.max(endValue, value.value - valueChangePerUpdate);
				if (value.value <= endValue) {
					countdown.stop();
				}
			}, updateInterval);
		},
		cancel: () => {
			clearInterval(countdown.interval);
			countdown.running = false;
			value.value = startValue;
		},
		stop: () => {
			clearInterval(countdown.interval);
			countdown.running = false;
			callback();
		},
		reset: () => {
			value.value = startValue;
		},
	};
	return [countdown, value];
};
