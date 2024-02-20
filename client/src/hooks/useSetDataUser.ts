import { create } from "zustand";
 
interface UseSetDataUserStore {
    data: any;
    addItem: (name: string, _id: string) => void;
    clearItem: () => void;
}

const useSetBreadCrumb = create<UseSetDataUserStore>((set) => ({
    data: null,
    idCurrent: "",
    addItem: (name: string, _id: string) =>
        set((state: UseSetDataUserStore) => ({ data: [...state.data, { _id, name }], idCurrent: _id })),
    clearItem: () => set(() => ({ data: [], idCurrent: "" })),
}));

export default useSetBreadCrumb;