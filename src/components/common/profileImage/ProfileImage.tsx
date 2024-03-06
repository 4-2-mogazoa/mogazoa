import { cva, type VariantProps } from "class-variance-authority";
import Image, { StaticImageData } from "next/image";
import React from "react";

import cn from "@/utils/cn";

const profileImageVariants = cva("relative overflow-hidden rounded-full", {
	variants: {
		variant: {
			ranking: "size-[3.6rem] md:size-[4.2rem]",
			follower: "size-[4.8rem] md:size-[5.2rem]",
			profile: "size-[12rem] md:size-[18rem]",
		},
	},
});

type Props = React.HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof profileImageVariants> & {
		variant: "ranking" | "follower" | "profile";
		src: string | StaticImageData;
	};

export default function ProfileImage({ src, variant }: Props) {
	return (
		<div className={cn(profileImageVariants({ variant }))}>
			<Image src={src} alt="사용자 프로필 이미지" fill />
		</div>
	);
}
