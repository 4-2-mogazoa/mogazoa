import { useCallback, useEffect, useRef } from "react";

function useThrottle<T extends (...args: any[]) => void>(
	callback: T,
	delay: number,
): T {
	const isThrottling = useRef(false);
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

	const throttledCallback = useCallback(
		(...args: any[]) => {
			if (!isThrottling.current) {
				callback(...args);
				isThrottling.current = true;
				timer.current = setTimeout(() => {
					isThrottling.current = false;
				}, delay);
			}
		},
		[callback, delay],
	);

	useEffect(() => {
		return () => {
			if (timer.current) {
				clearTimeout(timer.current);
			}
		};
	}, []);

	return throttledCallback as T;
}

export default useThrottle;
