import React from "react";
import { useForm } from "react-hook-form";

import BasicButton from "@/components/common/button/BasicButton";
import Input from "@/components/common/inputs/Input";
import { emailPattern } from "@/constants/regExp";

import OAuthLayout from "../OAuthLayout";
import AuthFormContainer from "./AuthFormContainer";

interface ISignInForm {
	email: string;
	password: string;
}

export default function SignInForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ISignInForm>();

	const emailValidationSchema = {
		required: "이메일은 필수 입력입니다.",
		pattern: {
			value: emailPattern,
			message: "이메일 형식으로 작성해 주세요.",
		},
	};

	const passwordValidationSchema = {
		required: "비밀번호는 필수 입력입니다.",
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
					inputType="password"
					register={register}
					validationSchema={passwordValidationSchema}
					errors={errors}
				/>
			</div>
			<div className="mb-[6rem]">
				<BasicButton label="로그인" />
			</div>
			<OAuthLayout />
		</AuthFormContainer>
	);
}
