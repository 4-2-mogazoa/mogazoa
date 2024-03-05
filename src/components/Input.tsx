import React, { InputHTMLAttributes } from "react";
import Background from "./Background";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

const InputVariants = cva(
	`
  px-[2rem] py-[2.3rem] 
  bg-[#252530]
  w-screen
  text-white
  border border-[#353542] rounded-xl
  placeholder:gray-200 
`,
	{
		variants: {
			variant: {
				default: "focus:outline-none focus:border-main_blue",
				error: "outline-none border-red",
			},
			size: {
				lg: "placeholder:text-[1.6rem] text-[1.6rem]",
				md: "placeholder:text-[1.4rem] text-[1.4rem]",
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
	isError?: boolean;
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
			<Background>
				<div className="flex flex-col gap-[1rem]">
					<label
						className={`text-white text-[${textSizes.labelSize[size ?? "lg"]}]`}
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
						className={`text-red text-[${textSizes.errorMsgSize[size ?? "lg"]}]`}
					>
						{errorMsg}
					</p>
				</div>
			</Background>
		</>
	);
}
