import React, { ReactNode } from "react";

export default function AuthFormContainer({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<form className="w-full max-w-[44rem] lg:max-w-[64rem]">{children}</form>
	);
}
