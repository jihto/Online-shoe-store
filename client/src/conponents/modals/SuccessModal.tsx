import Modal from "./Modal"



const SuccessModal:React.FC = () => {
    return (
        <Modal 
            isOpen={true}
            setIsOpen={() => {}}
            content="Successful"
        />
    )
}


export default SuccessModal;