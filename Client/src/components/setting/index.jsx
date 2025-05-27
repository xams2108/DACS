import React, { useState, useEffect } from 'react';
import {
  Card, Avatar, Form, Switch, Button, Tooltip, message, Divider,
} from 'antd';
import {
  EditOutlined, CameraOutlined, CopyOutlined, MailOutlined, WalletOutlined, SettingOutlined,
  SaveOutlined, UserOutlined,
} from '@ant-design/icons';
import './setting.scss';
import userService from '../../services/api/user';

function SettingsPanel() {
  const [email, setEmail] = useState('user@example.com');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [walletAddress, setWalletAddress] = useState('null');

  useEffect(() => {
    (async () => {
      try {
        const { user } = await userService.getUser();
        setEmail(user.email || 'user@example.com');
        setWalletAddress(user.address || '');
        setNotificationsEnabled(user.statusNotify ?? false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        message.error('Failed to fetch user data.');
      }
    })();
  }, []);

  const handleAvatarClick = () => {
    message.info('Avatar update feature coming soon!');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress).then(() => {
      message.success('Wallet address copied to clipboard!');
    });
  };

  return (
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
                  <EditOutlined className="edit-action" />
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
            <h3 className="settings-title"><SettingOutlined /> ACCOUNT PREFERENCES</h3>

            <Form layout="vertical" className="preferences-form">
              <Form.Item
                label={<span className="form-label"><MailOutlined /> EMAIL NOTIFICATIONS</span>}
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

          <div className="save-button-container">
            <Button type="primary" size="large" icon={<SaveOutlined />} className="save-button">
              SAVE PREFERENCES
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default SettingsPanel;
