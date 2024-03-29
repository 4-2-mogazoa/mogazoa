import { useRef } from "react";

/**
 * 반환되는 focusableElements 배열에 tab으로 이동이 가능하게 하고 싶은 DOM 요소를 차례로 저장해주시면 됩니다.
 * @returns focusableElements: tab을 이용하여 이동하고 싶은 DOM 요소를 담는 배열, handleModalTrapFocus: tab, shift+tab으로 이동할 때, 모달 영역을 벗어나지 않도록 하는 함수(modalWrapper에 적용)
 */
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
