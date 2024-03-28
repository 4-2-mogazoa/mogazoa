import Image from "next/image";
import React, { JSXElementConstructor, ReactElement, useEffect } from "react";
import { createPortal } from "react-dom";

import useTrapFocus from "@/hooks/common/useTrapFocus";
import { ModalConfig } from "@/store/modal";

type Props = {
	id: string;
	children: ReactElement<any, string | JSXElementConstructor<any>>;
	onRemove: (id: string) => void;
	config: ModalConfig;
};

function ModalWrapper({ children, id, onRemove, config }: Props) {
	const { focusableElements, handleModalTrapFocus } = useTrapFocus();
	const closeIconSrc = "/icons/close.svg";
	const modalRoot = document.getElementById("modal-root");

	const handleClickOutside = () => {
		if (config.isCloseClickOutside) {
			onRemove(id);
		}
	};

	useEffect(() => {
		const handleKeydownEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onRemove(id);
			}
		};

		if (config.isCloseESC) {
			document.addEventListener("keydown", handleKeydownEsc);
		}

		document.body.style.overflow = "hidden";

		return () => {
			if (config.isCloseESC) {
				document.removeEventListener("keydown", handleKeydownEsc);
			}
			document.body.style.overflow = "auto";
		};
	}, [config.isCloseESC, id, onRemove]);

	useEffect(() => {
		focusableElements.current[0]?.focus();

		document.addEventListener("keydown", handleModalTrapFocus);

		return () => {
			document.removeEventListener("keydown", handleModalTrapFocus);
		};
	}, []);

	return modalRoot
		? createPortal(
				<div
					className="fixed inset-0 flex items-center justify-center"
					aria-modal={true}
				>
					{/* 백드롭 */}
					<div
						className="absolute inset-0 backdrop-blur-sm backdrop-brightness-50"
						onClick={handleClickOutside}
					></div>
					{/* 모달 */}
					<div className="z-10 rounded-[1.6rem] bg-[#1C1C22]">
						<div className="flex flex-col items-end">
							<div className="px-[1.5rem] pt-[1.5rem] md:px-[2rem] md:pt-[2rem]">
								<button
									onClick={() => onRemove(id)}
									ref={(el: HTMLButtonElement) =>
										(focusableElements.current[0] = el)
									}
									className="relative size-[2.4rem] md:size-[3.6rem] lg:size-[4rem]"
								>
									<Image src={closeIconSrc} alt="모달 닫기" fill />
								</button>
							</div>
							<div className="px-[2rem] pb-[2rem] md:px-[4rem] md:pb-[4rem]">
								{React.cloneElement(children, { focusableElements })}
							</div>
						</div>
					</div>
				</div>,
				modalRoot,
			)
		: null;
}

export default ModalWrapper;
