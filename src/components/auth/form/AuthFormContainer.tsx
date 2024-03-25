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
	setError?: any;
	api?: any;
};

export default function AuthFormContainer({
	children,
	handleSubmit,
	api,
	setError,
}: Props) {
	const router = useRouter();

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		try {
			await api(data, setError, router);
		} catch (e) {
			console.log(e);
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
