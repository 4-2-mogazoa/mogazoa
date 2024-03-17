import React, { ReactNode } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

type Props = { children: ReactNode; handleSubmit: any };

export default function AuthFormContainer({ children, handleSubmit }: Props) {
	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		console.log("데이터 :", data);
	};

	return (
		<form
			className="w-full max-w-[44rem] lg:max-w-[64rem]"
			onSubmit={handleSubmit(onSubmit)}
		>
			{children}
		</form>
	);
}
