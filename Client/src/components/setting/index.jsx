import React, { useState, useEffect } from 'react';
import {Card,Avatar,Form,Switch,Button,Tooltip,message,Divider,} from 'antd';
import {EditOutlined,CameraOutlined,CopyOutlined,MailOutlined,WalletOutlined,SettingOutlined,SaveOutlined,UserOutlined,} from '@ant-design/icons';
import './setting.scss';
import userService from '../../services/api/user';
import { useAuthProvider } from '../../providers/authProvider';
import ConnectWallet from "../connectwallet";
import ModalEmail from '../modal/Email';
function SettingsPanel() {
  const { isLogin } = useAuthProvider();
  const [email, setEmail] = useState('user@example.com');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [walletAddress, setWalletAddress] = useState('null');
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    (async () => {
        const { user } = await userService.getUser();
        setEmail(user.email || 'user@gmail.com.com');
        setWalletAddress(user.address);
        setNotificationsEnabled(user.statusNotify);
    })();
  }, [isLogin, isOpen]);

  const handleAvatarClick = () => {
    message.info('Avatar update feature coming soon!');
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
  };
  const OpenModal = () => {
    setIsOpen(true)
  }
  const CloseModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <ModalEmail isOpen={isOpen} onClose={CloseModal}/>
      {isLogin ? (
        <div className="settings-container">
          <Card className="settings-card">
            <div className="card-content-wrapper">
              {/* Profile Section */}
              <div className="profile-section">
                <div className="avatar-container" onClick={handleAvatarClick}>
                  <Avatar
                    className="user-avatar"
                    size={120}
                    icon={<UserOutlined />}
                    src="https://joeschmoe.io/api/v1/random"
                  />
                  <div className="avatar-overlay">
                    <CameraOutlined className="edit-icon" />
                  </div>
                </div>

                <div className="user-info">
                  <h2 className="user-email">
                    {email}
                    <Tooltip title="Edit email">
                      <EditOutlined 
                        onClick={OpenModal}
                        className="edit-action" 
                      />
                    </Tooltip>
                  </h2>

                  <div className="wallet-info" onClick={copyToClipboard}>
                    <WalletOutlined className="wallet-icon" />
                    <Tooltip title="Click to copy" mouseLeaveDelay={0}>
                      <span className="wallet-address">
                        {walletAddress}
                        <CopyOutlined className="copy-action" />
                      </span>
                    </Tooltip>
                  </div>
                </div>
              </div>

              <Divider className="section-divider" />

              {/* Settings Section */}
              <div className="settings-section">
                <h3 className="settings-title">
                  <SettingOutlined /> ACCOUNT PREFERENCES
                </h3>

                <Form layout="vertical" className="preferences-form">
                  <Form.Item
                    label={
                      <span className="form-label">
                        <MailOutlined /> EMAIL NOTIFICATIONS
                      </span>
                    }
                    className="setting-item"
                  >
                    <div className="setting-control">
                      <MailOutlined className="setting-icon" />
                      <Switch
                        checked={notificationsEnabled}
                        onChange={setNotificationsEnabled}
                        className="setting-switch"
                      />
                      <span className="setting-label">
                        {notificationsEnabled ? 'ENABLED' : 'DISABLED'}
                      </span>
                    </div>
                  </Form.Item>
                </Form>
              </div>
            </div>

            <div className="save-button-container">
              <Button
                type="primary"
                size="large"
                icon={<SaveOutlined />}
                className="save-button"
              >
                SAVE PREFERENCES
              </Button>
            </div>
          </Card>
        </div>
      ) : (
        <div className="settings-container">
          <Card className="settings-card settings-card--not-logged-in">
            <div className="not-logged-in">
              <h3 className="not-logged-in__title">You are not logged in</h3>
              <p className="not-logged-in__message">
                Please connect your wallet to access account settings.
              </p>
              <div className="not-logged-in__action">
                <ConnectWallet />
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}

export default SettingsPanel;
