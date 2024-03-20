import Image from "next/image";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";

type Props = {
	id: string;
	children: React.ReactNode;
	onRemove: (id: string) => void;
};

function ModalWrapper({ children, id, onRemove }: Props) {
	const closeIconSrc = "/icons/close.svg";
	const modalRoot = document.getElementById("modal-root");

	useEffect(() => {
		const handleKeydownEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onRemove(id);
			}
		};

		document.addEventListener("keydown", handleKeydownEsc);
		document.body.style.overflow = "hidden";

		return () => {
			document.removeEventListener("keydown", handleKeydownEsc);
			document.body.style.overflow = "auto";
		};
	}, [id, onRemove]);

	return modalRoot
		? createPortal(
				<div
					className="fixed inset-0 flex items-center justify-center"
					aria-modal={true}
				>
					{/* 백드롭 */}
					<div
						className="absolute inset-0 backdrop-blur-sm backdrop-brightness-50"
						onClick={() => onRemove(id)}
					></div>
					{/* 모달 */}
					<div className="z-10 rounded-[1.6rem] bg-[#1C1C22]">
						<div className="flex flex-col items-end">
							<div className="px-[1.5rem] pt-[1.5rem] md:px-[2rem] md:pt-[2rem]">
								<button
									onClick={() => onRemove(id)}
									className="relative size-[2.4rem] md:size-[3.6rem] lg:size-[4rem]"
								>
									<Image src={closeIconSrc} alt="모달 닫기" fill />
								</button>
							</div>
							<div className="px-[2rem] pb-[2rem] md:px-[4rem] md:pb-[4rem]">
								{children}
							</div>
						</div>
					</div>
				</div>,
				modalRoot,
			)
		: null;
}

export default ModalWrapper;
