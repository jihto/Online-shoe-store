import Modal from "./Modal";
import useConfirmModal from "../../hooks/useConfirmModal";
import ButtonStatic from "../buttons/ButtonStatic";  
 
interface ConfirmModalProps{
    handleConfirm: () => void;
}

const ConfirmModel: React.FC<ConfirmModalProps> = ({
    handleConfirm
}) => {
    const confirmModal = useConfirmModal(); 
    return (
        <Modal
            isOpen={true}
            hanldeClose={confirmModal.onClose}
            showIn="center"
            content={<div >
                    <p className="text-xl font-medium p-10">{confirmModal.content}</p>

                <hr/>
            </div>} 
            action={
                <div className="grid grid-cols-2 justify-center w-full">
                    <ButtonStatic
                        className="bg-red-600 px-4 py-2 rounded-md text-white" 
                        handleSubmit={handleConfirm}  
                    >Accept</ButtonStatic>
                    <ButtonStatic
                        className="bg-[#465BA6] flex-row-reverse px-4 py-2 rounded-md text-white" 
                        handleSubmit={confirmModal.onClose} 
                    >Cancel</ButtonStatic>
                </div> 
            }
        />
    )
}


export default ConfirmModel;