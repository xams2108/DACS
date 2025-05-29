import { Modal, Button } from 'antd';
import './styles.scss';

function ModalConfirm({ isOpen,onClose, title, message, onConfirm }) {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      closable={false}
      className="modal-confirm"
    >
      <div className="modal-confirm__header">
        <h3 className="modal-confirm__title">{title || 'Confirm Action'}</h3>
        <button className="modal-confirm__close" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="modal-confirm__content">
        <p className="modal-confirm__message">
          {message || 'Are you sure you want to proceed with this action?'}
        </p>
        <div className="modal-confirm__actions">
          <Button
            onClick={onClose}
            className="modal-confirm__button modal-confirm__button--cancel"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={onConfirm}
            className="modal-confirm__button modal-confirm__button--ok"
          >
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalConfirm;
