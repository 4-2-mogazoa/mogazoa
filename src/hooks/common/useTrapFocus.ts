import { useRef } from "react";

export default function useTrapFocus() {
	const focusableElements = useRef<HTMLElement[]>([]);

	const handleModalTrapFocus = (e: KeyboardEvent) => {
		const firstFocusableElements = focusableElements.current[0];
		const lastFocusableElements =
			focusableElements.current[focusableElements.current.length - 1];
		if (e.key === "Tab") {
			if (document.activeElement == lastFocusableElements && !e.shiftKey) {
				firstFocusableElements?.focus();
				e.preventDefault();
			} else if (
				document.activeElement == firstFocusableElements &&
				e.shiftKey
			) {
				lastFocusableElements?.focus();
				e.preventDefault();
			}
		}
	};

	return { focusableElements, handleModalTrapFocus };
}
