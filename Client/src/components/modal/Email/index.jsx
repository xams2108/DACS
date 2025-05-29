import { useState } from 'react';
import { Modal } from 'antd';
import './styles.scss';
import InputEmail from './InputEmail';
import VerifyOtp from './VerifyOtp';

function ModalEmail({ isOpen, onClose }) {
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');

  const handleNext = (enteredEmail) => {
    setEmail(enteredEmail);
    setStep('otp');
  };

  const handleBack = () => {
    setStep('email');
  };

  const onVerified = () => {
    setStep('email');
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      closable={false}
      className="modal-email"
    >
      <div className="modal-email__header">
        <h3 className="modal-email__title">
          {step === 'email' ? 'Set Your Email' : 'Verify OTP'}
        </h3>
        <button className="modal-email__close" onClick={onClose}>✕</button>
      </div>

      <div className="modal-email__content">
        {step === 'email' ? (
          <InputEmail onNext={handleNext} />
        ) : (
          <VerifyOtp email={email} onBack={handleBack} onVerified={onVerified} />
        )}
      </div>
    </Modal>
  );
}

export default ModalEmail;
