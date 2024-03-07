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

interface InputProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
		VariantProps<typeof InputVariants> {
	inputType: "email" | "password" | "nickname" | "textfield";
}

export default function Input({ variant, inputType }: InputProps) {
	const [isVisibility, setIsVisibility] = useState(false);

	const inputTypeValues = {
		email: {
			type: "text",
			labelValue: "이메일",
			placeholderValue: "이메일을 입력해 주세요",
			errorMsg: "잘못된 이메일입니다.",
		},
		password: {
			type: isVisibility ? "text" : "password",
			labelValue: "비밀번호",
			placeholderValue: "비밀번호를 입력해 주세요",
			errorMsg: "비밀번호가 일치하지 않습니다.",
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

	const visibilityOffIcon = "/icons/visibility_off.svg";
	const visibilityOnIcon = "/icons/visibility_on.svg";

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
					/>

					{inputType === "password" && (
						<div className="absolute bottom-1/2 right-[2rem] size-[2.2rem] translate-y-1/2 cursor-pointer">
							<Image
								src={isVisibility ? visibilityOnIcon : visibilityOffIcon}
								fill
								alt="visbility"
								onClick={() => {
									setIsVisibility(!isVisibility);
								}}
							/>
						</div>
					)}
				</div>

				<p className={`text-[text-1.2rem] text-red lg:text-[1.4rem]`}>
					{errorMsg}
				</p>
			</div>
		</>
	);
}
