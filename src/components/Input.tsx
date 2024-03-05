/* eslint-disable tailwindcss/no-custom-classname */
import { cva, VariantProps } from "class-variance-authority";
import React, { InputHTMLAttributes } from "react";

import { cn } from "../utils/cn";

const InputVariants = cva(
	`
  placeholder:gray-200 w-screen 
  rounded-xl
  border
  border-[#353542]
  bg-[#252530] px-[2rem] py-[2.3rem]
  text-white 
`,
	{
		variants: {
			variant: {
				default: "focus:border-main_blue focus:outline-none",
				error: "border-red outline-none",
			},
			size: {
				lg: "text-[1.6rem] placeholder:text-[1.6rem]",
				md: "text-[1.4rem] placeholder:text-[1.4rem]",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "lg",
		},
	},
);

interface InputProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
		VariantProps<typeof InputVariants> {
	inputType: "email" | "password" | "nickname" | "textfield";
}

export default function Input({ variant, size, inputType }: InputProps) {
	const textSizes = {
		labelSize: {
			lg: "1.6rem",
			md: "1.4rem",
		},
		errorMsgSize: {
			lg: "1.4rem",
			md: "1.2rem",
		},
	};

	const inputTypeValues = {
		email: {
			type: "text",
			labelValue: "이메일",
			placeholderValue: "이메일을 입력해 주세요",
			errorMsg: "잘못된 이메일입니다.",
		},
		password: {
			type: "password",
			labelValue: "비밀번호",
			placeholderValue: "비밀번호를 입력해 주세요",
			errorMsg: "비밀번호가 일치하지 않습니다..",
		},
		nickname: {
			type: "text",
			labelValue: "닉네임",
			placeholderValue: "닉네임을 입력해 주세요",
			errorMsg: "",
		},
		textfield: {
			type: "text",
			labelValue: "",
			placeholderValue: "상품명",
			errorMsg: "",
		},
	};

	const { type, labelValue, placeholderValue, errorMsg } =
		inputTypeValues[inputType];

	return (
		<>
			<div className="flex flex-col gap-[1rem]">
				<label
					className={`text-[${textSizes.labelSize[size ?? "lg"]}] text-white`}
					htmlFor={labelValue}
				>
					{labelValue}
				</label>
				<input
					type={type}
					placeholder={placeholderValue}
					className={cn(InputVariants({ variant: variant, size: size }))}
					id={labelValue}
				/>
				<p
					className={`text-[${textSizes.errorMsgSize[size ?? "lg"]}] text-red`}
				>
					{errorMsg}
				</p>
			</div>
		</>
	);
}
