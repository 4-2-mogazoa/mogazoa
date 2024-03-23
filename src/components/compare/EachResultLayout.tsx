import { ReactNode } from "react";

import EachResult from "./EachResult";
import EachResultImage from "./EachResultImage";
import EachResultLink from "./EachResultLink";
import EachResultTitle from "./EachResultTitle";

type Props = {
	title?: string;
	children: ReactNode;
};

export default function EachResultLayout({ title, children }: Props) {
	return (
		<div>
			{title && (
				<p className="text-[1.6rem] text-gray-100 after:mb-2 after:mt-4 after:block after:h-[0.1rem] after:bg-black-border lg:text-[2rem] after:lg:mt-6">
					{title}
				</p>
			)}
			<div className="grid grid-cols-2 justify-items-center gap-8 md:gap-12 lg:gap-16">
				{children}
			</div>
		</div>
	);
}

EachResultLayout.Image = EachResultImage;
EachResultLayout.Link = EachResultLink;
EachResultLayout.Title = EachResultTitle;
EachResultLayout.Result = EachResult;
