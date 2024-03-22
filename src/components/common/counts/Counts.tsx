import React from "react";

import Count from "./Count";

type Props = {
	children: React.ReactNode;
};

function Counts({ children }: Props) {
	return <div className="_flex-center w-fit gap-4 lg:gap-6">{children}</div>;
}

Counts.Count = Count;

export default Counts;
