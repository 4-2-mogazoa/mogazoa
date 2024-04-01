export default function trapFocus(
	focusableNodes: NodeListOf<Element> | undefined,
) {
	const handleModalTrapFocus = (e: KeyboardEvent) => {
		const firstFocusableElement = focusableNodes?.[0];
		const lastFocusableElement = focusableNodes?.[focusableNodes.length - 1];

		if (e.key === "Tab") {
			if (document.activeElement == lastFocusableElement && !e.shiftKey) {
				(firstFocusableElement as HTMLElement)?.focus();
				e.preventDefault();
			} else if (
				document.activeElement == firstFocusableElement &&
				e.shiftKey
			) {
				(lastFocusableElement as HTMLElement)?.focus();
				e.preventDefault();
			}
		}
	};

	return handleModalTrapFocus;
}
