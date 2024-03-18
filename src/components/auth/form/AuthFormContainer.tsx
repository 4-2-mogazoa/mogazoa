import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import {
	FieldValues,
	SubmitHandler,
	UseFormHandleSubmit,
} from "react-hook-form";

type Props = {
	children: ReactNode;
	handleSubmit: UseFormHandleSubmit<FieldValues>;
	api?: any;
};

export default function AuthFormContainer({
	children,
	handleSubmit,
	api,
}: Props) {
	const router = useRouter();
	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		console.log("데이터 :", data);

		try {
			await api(data);
			router.push("/");
		} catch (e) {
			throw new Error(`${e}`);
		}
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
