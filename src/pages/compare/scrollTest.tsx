import { useEffect, useRef, useState } from "react";

import getDataByScroll from "@/utils/getDataByScroll";

export default function ScrollTest() {
	const ref = useRef<HTMLDivElement>(null);

	const [data, setData] = useState([-3, -2, -1, 0]);
	const [index, setIndex] = useState(1);

	useEffect(() => {
		console.count();

		if (ref.current) {
			ref.current.addEventListener("scroll", handleScroll);
		}

		return () => {
			if (ref.current) {
				ref.current.removeEventListener("scroll", handleScroll);
			}
		};
	}, [index]);

	const test = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

	const handleLoadMoreData = (nextIndex: number) => {
		setIndex((prev) => prev + 3);
		setData((prev) => [...prev, ...test.slice(nextIndex, nextIndex + 3)]);
	};

	const handleScroll = () => getDataByScroll(ref, index, handleLoadMoreData);

	return (
		<div>
			<div ref={ref} className="_scrollbar h-24 bg-black-bg">
				{data.map((num) => (
					<div key={num} className="text-[2rem] text-white">
						{num}
					</div>
				))}
			</div>
		</div>
	);
}
