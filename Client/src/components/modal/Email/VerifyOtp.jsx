import { Button, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useNotification } from '../../../providers/Notification';
import userServices from '../../../services/api/user';
import './verifyOtp.scss';

function VerifyOtp({ email, onBack, onVerified }) {
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(180);
  const notification = useNotification();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleVerify = async () => {
    if (!otp.trim()) {
      notification.error({ description: 'Please enter the OTP' });
      return;
    }

    try {
      const payload = {
        email: email,
        code: otp
      }
      const res = await userServices.verifyOTP(payload);
      console.log(res)
      if (res.status === "success") {
        notification.success({ description: `Update Email:${email} successfully` });
        onVerified?.()
      } else {
        notification.error({ description: res.message || 'Invalid OTP' });
      }
    } catch {
      notification.error({ description: 'Verification failed' });
    }
  };

  const handleResend = async () => {
    try {
      await userServices.createOTP({ email });
      notification.success({ description: 'OTP has been resent' });
      setTimeLeft(120);
    } catch {
      notification.error({ description: 'Failed to resend OTP' });
    }
  };

  return (
    <div className="VerifyOtp">
      <div className="VerifyOtp__Header">
        <p>
          We've sent a code to <strong>{email}</strong>
        </p>
      </div>

      <div className="VerifyOtp__Content">
        <Input
          id="otp-input"
          placeholder="Enter your OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
        />

        <div className="VerifyOtp__Resend">
          {timeLeft > 0 ? (
            <span className="VerifyOtp__Countdown">
              You can resend OTP in <strong>{timeLeft}s</strong>
            </span>
          ) : (
            <span className="VerifyOtp__ResendLink" onClick={handleResend}>
              Didn't receive it? <u>Resend OTP</u>
            </span>
          )}
        </div>
      </div>

      <div className="VerifyOtp__Actions">
        <Button onClick={onBack} className="VerifyOtp__Button--Secondary">
          Back
        </Button>
        <Button type="primary" onClick={handleVerify}>
          Verify
        </Button>
      </div>
    </div>
  );
}

export default VerifyOtp;
