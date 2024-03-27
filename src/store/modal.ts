import { JSXElementConstructor, ReactElement, ReactNode } from "react";
import { create } from "zustand";

type ModalType = {
	id: string;
	content: ReactElement<any, string | JSXElementConstructor<any>>;
	config: ModalConfig;
};

export type ModalConfig = {
	isCloseClickOutside: boolean;
	isCloseESC: boolean;
};

type ModalState = {
	modals: ModalType[];
	actions: {
		openModal: (
			content: ReactElement<any, string | JSXElementConstructor<any>>,
			config?: Partial<ModalConfig>,
		) => string;
		closeModal: (id: string) => void;
		closeAllModals: () => void;
	};
};

const useModalStore = create<ModalState>((set) => ({
	modals: [],
	actions: {
		openModal: (content, config = {}) => {
			const id = crypto.randomUUID();
			set((state) => ({
				modals: [
					...state.modals,
					{
						id,
						content,
						config: { isCloseClickOutside: true, isCloseESC: true, ...config },
					},
				],
			}));
			return id;
		},
		closeModal: (id) =>
			set((state) => ({
				modals: state.modals.filter((modal) => modal.id !== id),
			})),
		closeAllModals: () => set({ modals: [] }),
	},
}));

export const useModalsStore = () => useModalStore((state) => state.modals);
export const useModalActions = () => useModalStore((state) => state.actions);
