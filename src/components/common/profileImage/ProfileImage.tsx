import { cva, type VariantProps } from "class-variance-authority";
import Image, { StaticImageData } from "next/image";
import React from "react";

import cn from "@/utils/cn";

const profileImageVariants = cva("relative overflow-hidden rounded-full", {
	variants: {
		size: {
			small: "size-[3.6rem] lg:size-[4.2rem]",
			medium: "size-[4.8rem] lg:size-[5.2rem]",
			large: "size-[12rem] lg:size-[18rem]",
		},
	},
});

// todo: StaticImageData 타입은 추후 기능 구현 테스트 이후에 삭제 예정
type Props = React.HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof profileImageVariants> & {
		size: "small" | "medium" | "large";
		src: string | StaticImageData;
	};

export default function ProfileImage({ src, size }: Props) {
	return (
		<div className={cn(profileImageVariants({ size }))}>
			<Image src={src} alt="사용자 프로필 이미지" fill />
		</div>
	);
}
