import { create } from "zustand";


interface ConfirmModelStore{
    _id: string; 
    content: string;
    isOpen: boolean; 
    onOpen: (content: string, _id: string) => void;
    onClose: () => void;
}

const useConfirmModal = create<ConfirmModelStore>((set) => ({
    isOpen: false,
    _id: "", 
    content: '', 
    onOpen: (content: string, _id: string)=> set({isOpen: true, content, _id}),
    onClose: ()=> set({isOpen: false, _id: '', content: ''})
}))

export default useConfirmModal;