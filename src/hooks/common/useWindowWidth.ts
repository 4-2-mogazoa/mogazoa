import { useEffect, useState } from "react";

import useThrottle from "./useThrottle";

function useWindowWidth() {
	const isClientSide = typeof window !== "undefined";

	const [width, setWidth] = useState(isClientSide ? window.innerWidth : 0);

	const handleResize = () => {
		if (isClientSide) {
			setWidth(window.innerWidth);
		}
	};

	const throttledHandleResize = useThrottle(handleResize, 200);

	useEffect(() => {
		if (isClientSide) {
			window.addEventListener("resize", throttledHandleResize);
			return () => {
				window.removeEventListener("resize", throttledHandleResize);
			};
		}
	}, [isClientSide, throttledHandleResize]);

	return width;
}

export default useWindowWidth;
