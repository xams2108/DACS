import { Button, Input } from 'antd';
import { useState } from 'react';
import { useNotification } from '../../../providers/Notification';
import userServices from "../../../services/api/user";
import './inputEmail.scss';

function InputEmail({ onNext }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const notification = useNotification();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleFinish = async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      notification.error({ description: 'Please enter your email' });
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      notification.error({ description: 'Invalid email format!' });
      return;
    }

    setLoading(true);
    try {
      const payload = { email: trimmedEmail };
      const res = await userServices.createOTP(payload);
      if (res.success) {
        notification.success({ description: 'OTP has been sent to your email.' });
        onNext(trimmedEmail);
      } else {
        notification.error({ description: res.message || 'Failed to send OTP. Please try again.' });
      }
    } catch  {
      notification.error({ description: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="InputEmail">
      <div className="InputEmail__Content">
        <label className="InputEmail__Content__Label" htmlFor="email-input">
          Email
        </label>
        <div className="InputEmail__Content__Input">
          <Input
            id="email-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
      </div>

      <div className="InputEmail__Button">
        <Button type="primary" onClick={handleFinish} loading={loading}>
          Send OTP
        </Button>
      </div>
    </div>
  );
}

export default InputEmail;
