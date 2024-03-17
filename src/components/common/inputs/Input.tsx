/* eslint-disable tailwindcss/no-custom-classname */
import { cva, VariantProps } from "class-variance-authority";
import Image from "next/image";
import React, { InputHTMLAttributes, useState } from "react";

import cn from "../../../utils/cn";

const InputVariants = cva(
	`
  placeholder:gray-200 w-full 
  rounded-xl border border-[#353542]
  bg-[#252530] px-[2rem] py-[2.3rem]
  text-[1.4rem] text-white placeholder:text-[1.4rem]
	lg:text-[1.6rem] lg:placeholder:text-[1.6rem]
`,
	{
		variants: {
			variant: {
				default: "focus:border-main_blue focus:outline-none",
				error: "border-red outline-none",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

type InputProps = InputHTMLAttributes<HTMLInputElement> &
	VariantProps<typeof InputVariants> & {
		inputType: "email" | "password" | "nickname" | "textfield" | "passwordCkd";
		register?: any;
		validationSchema?: any;
		errors?: any;
	};

export default function Input({
	variant,
	inputType,
	register,
	validationSchema,
	errors,
}: InputProps) {
	const [isVisibility, setIsVisibility] = useState(false);

	const inputTypeValues = {
		email: {
			type: "text",
			labelValue: "이메일",
			placeholderValue: "이메일을 입력해 주세요",
		},
		password: {
			type: isVisibility ? "text" : "password",
			labelValue: "비밀번호",
			placeholderValue: "비밀번호를 입력해 주세요",
		},
		nickname: {
			type: "text",
			labelValue: "닉네임",
			placeholderValue: "닉네임을 입력해 주세요",
		},
		textfield: {
			type: "text",
			labelValue: "",
			placeholderValue: "상품명",
		},
		passwordCkd: {
			type: isVisibility ? "text" : "password",
			labelValue: "비밀번호 확인",
			placeholderValue: "비밀번호를 한번 더 입력해 주세요",
		},
	};

	const { type, labelValue, placeholderValue } = inputTypeValues[inputType];

	const visibilityOffIconSrc = "/icons/visibility_off.svg";
	const visibilityOnIconSrc = "/icons/visibility_on.svg";

	return (
		<>
			<div className="flex flex-col gap-[1rem]">
				<label
					className={`text-[1.4rem] text-white lg:text-[1.6rem]`}
					htmlFor={labelValue}
				>
					{labelValue}
				</label>
				<div className="relative">
					<input
						type={type}
						placeholder={placeholderValue}
						className={cn(InputVariants({ variant: variant }))}
						id={labelValue}
						{...register(inputType, validationSchema)}
					/>

					{(inputType === "password" || inputType === "passwordCkd") && (
						<div className="absolute bottom-1/2 right-[2rem] size-[2.2rem] translate-y-1/2 cursor-pointer">
							<Image
								src={isVisibility ? visibilityOnIconSrc : visibilityOffIconSrc}
								fill
								alt="visibility"
								onClick={() => {
									setIsVisibility(!isVisibility);
								}}
							/>
						</div>
					)}
				</div>

				{errors && (
					<p className={`text-[text-1.2rem] text-red lg:text-[1.4rem]`}>
						{errors[inputType]?.message}
					</p>
				)}
			</div>
		</>
	);
}
