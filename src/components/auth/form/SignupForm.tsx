import React from "react";
import { useForm } from "react-hook-form";

import BasicButton from "@/components/common/button/BasicButton";
import Input from "@/components/common/inputs/Input";
import { emailPattern, passwordPattern } from "@/constants/regExp";
import useAuth from "@/hooks/auth/useAuth";
import { RegistrationUserData } from "@/types/auth";

import AuthFormContainer from "./AuthFormContainer";

export default function SignupForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		setError,
	} = useForm<RegistrationUserData>({ mode: "onBlur" });

	const { signUp } = useAuth();

	const emailValidationSchema = {
		required: "이메일은 필수 입력입니다.",
		pattern: {
			value: emailPattern,
			message: "이메일 형식으로 작성해 주세요.",
		},
	};

	const nicknameValidationSchema = {
		required: "닉네임은 필수 입력입니다.",
		maxLength: {
			value: 20,
			message: "닉네임은 최대 20자까지 가능합니다.",
		},
	};

	const passwordValidationSchema = {
		required: "비밀번호는 필수 입력입니다.",
		pattern: {
			value: passwordPattern,
			message: "비밀번호는 숫자, 영문, 특수문자로만 가능합니다.",
		},
		minLength: {
			value: 8,
			message: "비밀번호는 최소 8자 이상입니다.",
		},
	};

	const passwordCheckedValidationSchema = {
		required: "비밀번호 확인을 입력해주세요.",
		validate: {
			matchesPreviousPassword: (value: string) => {
				const { password } = getValues();
				return password === value || "비밀번호가 일치하지 않습니다.";
			},
		},
	};

	return (
		<AuthFormContainer
			handleSubmit={handleSubmit}
			api={signUp}
			setError={setError}
		>
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
					inputType="passwordChecked"
					register={register}
					validationSchema={passwordCheckedValidationSchema}
					errors={errors}
				/>
			</div>
			<div className="mb-[6rem]">
				<BasicButton label="가입하기" />
			</div>
		</AuthFormContainer>
	);
}
