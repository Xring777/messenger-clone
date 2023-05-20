import { create } from 'zustand'

interface SideBarStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSideBar = create<SideBarStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSideBar;