import React from "react";
import { useForm } from "react-hook-form";

import BasicButton from "@/components/common/button/BasicButton";
import Input from "@/components/common/inputs/Input";
import useAuth from "@/hooks/auth/useAuth";

import AuthFormContainer from "./AuthFormContainer";

export default function OAuthSignupForm() {
	const {
		handleSubmit,
		register,
		setError,
		formState: { errors },
	} = useForm({ mode: "onBlur" });

	const { OAuthSignUp } = useAuth();

	const nicknameValidationSchema = {
		required: "닉네임은 필수 입력입니다.",
		maxLength: {
			value: 10,
			message: "닉네임은 최대 10자까지 가능합니다.",
		},
	};

	return (
		<AuthFormContainer
			handleSubmit={handleSubmit}
			setError={setError}
			api={OAuthSignUp}
		>
			<div className="mb-[6rem]">
				<Input
					inputType="nickname"
					register={register}
					validationSchema={nicknameValidationSchema}
					errors={errors}
				/>
			</div>
			<div className="mb-[6rem]">
				<BasicButton label="가입하기" />
			</div>
		</AuthFormContainer>
	);
}
