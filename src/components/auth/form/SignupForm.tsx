import React from "react";
import { useForm } from "react-hook-form";

import BasicButton from "@/components/common/button/BasicButton";
import Input from "@/components/common/inputs/Input";

import AuthFormContainer from "./AuthFormContainer";

type ISignupForm = {
	email: string;
	nickname: string;
	password: string;
	passwordChecked: string;
};

export default function SignupForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ISignupForm>({ mode: "onBlur" });

	const emailValidationSchema = {
		required: "이메일은 필수 입력입니다.",
	};

	const nicknameValidationSchema = {
		required: "닉네임은 필수 입력입니다.",
	};

	const passwordValidationSchema = {
		required: "비밀번호는 필수 입력입니다.",
	};

	const passwordCkdValidationSchema = {
		required: "비밀번호확인은 필수 입력입니다.",
	};

	return (
		<AuthFormContainer handleSubmit={handleSubmit}>
			<div className="mb-[6rem] flex flex-col gap-[3rem] md:gap-[4rem]">
				<Input
					inputType="email"
					register={register}
					validationSchema={emailValidationSchema}
					errors={errors}
				/>
				<Input
					inputType="nickname"
					register={register}
					validationSchema={nicknameValidationSchema}
					errors={errors}
				/>
				<Input
					inputType="password"
					register={register}
					validationSchema={passwordValidationSchema}
					errors={errors}
				/>
				<Input
					inputType="passwordCkd"
					register={register}
					validationSchema={passwordCkdValidationSchema}
					errors={errors}
				/>
			</div>
			<div className="mb-[6rem]">
				<BasicButton label="가입하기" />
			</div>
		</AuthFormContainer>
	);
}
