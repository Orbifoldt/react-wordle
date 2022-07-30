import './modal.css'

export interface ModalProps {
    text: string,
    visible: boolean,
    onClose: () => void
}

export const Modal = ({ text, visible = true, onClose }: ModalProps): JSX.Element | null => {
    if (!visible) {
        return null
    }
    return (
        <div className="modal">
            <div>
                <div className='modal-header'>Modal Header<button className='modal-close-button' onClick={onClose}>Close</button></div>
                <div className='modal-body'>Modal text = {text}</div>
            </div>
        </div>
    )
}