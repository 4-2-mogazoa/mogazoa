import React, { ReactNode } from "react";

export default function Background({ children }: { children: ReactNode }) {
	return <div className="w-screen h-screen bg-black-300 p-3">{children}</div>;
}
