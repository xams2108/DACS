import React, { useState, useEffect, useRef } from 'react';
import { Card, Avatar, Form, Switch, Button, Tooltip, Divider, message } from 'antd'; // Import message
import { EditOutlined, CameraOutlined, CopyOutlined, MailOutlined, WalletOutlined, SettingOutlined, SaveOutlined, UserOutlined } from '@ant-design/icons';
import './setting.scss';
import { useAuthProvider } from '../../providers/authProvider';
import { useNotification } from '../../providers/Notification';
import ConnectWallet from "../connectwallet";
import ModalEmail from '../modal/Email';
import userService from '../../services/api/user';

function SettingsPanel() {
  const { user,setUser } = useAuthProvider();
  const notification = useNotification();
  const [email, setEmail] = useState('user@example.com');
  const [avatar, setAvatar] = useState(null); // Initialize with null for proper initial display
  const [avatarFile, setAvatarFile] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [walletAddress, setWalletAddress] = useState('null');
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setEmail(user?.email || 'user@example.com');
    // Set avatar from user data, or null if not available
    setAvatar(user?.avatar || null);
    setWalletAddress(user?.address);
    setNotificationsEnabled(user?.statusNotify);
  }, [isOpen, user]);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNotificationsChange = (checked) => {
    setNotificationsEnabled(checked);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    message.success('Copied to clipboard!');
  };

  const OpenModal = () => {
    setIsOpen(true);
  };

  const CloseModal = () => {
    setIsOpen(false);
  };

  const handleSaveChanges = async () => {
    message.loading('Saving preferences...', 0);

    const formData = new FormData();
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }
    formData.append('statusNotify', notificationsEnabled);
    const result = await userService.updateUser(formData)
    if(result.success){
      notification.success({ description: result.message });
      setUser({
        ...user,
        avatar,
        statusNotify: notificationsEnabled,
      })
    }else{
      notification.error({ description: result.message });
    }
  };

  return (
    <>
      <ModalEmail isOpen={isOpen} onClose={CloseModal} />
      {user ? (
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
                    src={avatar || undefined} // Use avatar state for display
                  />
                  <div className="avatar-overlay">
                    <CameraOutlined className="edit-icon" />
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    accept="image/*"
                  />
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
                        onChange={handleNotificationsChange}
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
                onClick={handleSaveChanges}
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