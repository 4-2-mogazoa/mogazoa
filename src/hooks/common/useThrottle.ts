import { useCallback, useRef } from "react";

function useThrottle<T extends (...args: any[]) => void>(
	callback: T,
	delay: number,
): T {
	const isThrottling = useRef(false);

	const throttledCallback = useCallback(
		(...args: any[]) => {
			if (!isThrottling.current) {
				callback(...args);
				isThrottling.current = true;
				setTimeout(() => {
					isThrottling.current = false;
				}, delay);
			}
		},
		[callback, delay],
	);

	return throttledCallback as T;
}

export default useThrottle;
