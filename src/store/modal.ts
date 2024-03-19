import { ReactNode } from "react";
import { create } from "zustand";

type ModalType = {
	id: string;
	content: ReactNode;
};

type ModalState = {
	modals: ModalType[];
	actions: {
		openModal: (content: ReactNode) => string;
		closeModal: (id: string) => void;
		closeAllModals: () => void;
	};
};

const useModalStore = create<ModalState>((set) => ({
	modals: [],
	actions: {
		openModal: (content) => {
			const id = crypto.randomUUID();
			set((state) => ({ modals: [...state.modals, { id, content }] }));
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
