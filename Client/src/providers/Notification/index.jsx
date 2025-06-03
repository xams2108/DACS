import React, { createContext, useContext, useEffect } from 'react';
import { notification } from 'antd';
import websocketUtil from '../../utils/websocket';
import userService from '../../services/api/user';
import { useAuthProvider } from '../authProvider';
import './styles.scss';

const NotificationContext = createContext(null);

export const useNotification = () => useContext(NotificationContext);

export default function NotificationProvider({ children }) {
  const [api, contextHolder] = notification.useNotification();
  const { user } = useAuthProvider();

  // Helper để thêm class cho notification
  const withDefaultClass = (baseClass, config = {}) => {
    const existingClass = config.className || '';
    return {
      ...config,
      className: `${baseClass} ${existingClass}`.trim(),
    };
  };

  const customApi = {
    open: (config) =>
      api.open(withDefaultClass('custom-notification', config)),
    success: (config) =>
      api.success(withDefaultClass('custom-notification custom-notification-success', config)),
    error: (config) =>
      api.error(withDefaultClass('custom-notification custom-notification-error', config)),
    info: (config) =>
      api.info(withDefaultClass('custom-notification custom-notification-info', config)),
    warning: (config) =>
      api.warning(withDefaultClass('custom-notification custom-notification-warning', config)),
  };

  useEffect(() => {
    let isMounted = true; 

    const notifyHandler = (data) => {
      console.log('📩 Notify:', data);
      customApi.success({
        message: `${data.symbol} ${data.action === 'buy' ? '⬇️' : '⬆️'} ${parseFloat(data.currentPrice).toFixed(2)}`,
        description: `Target price: ${data.targetPrice.toFixed(2)}`,
        placement: 'topRight',
      });
      };

    const initWebSocket = async () => {
    try {
      const { jwt } = await userService.getJwt();

      if (!jwt || !isMounted) return;

      websocketUtil.connect('private', jwt);
      websocketUtil.on('private', 'notify', notifyHandler);
    } catch (err) {
      console.error('❌ Lỗi khi lấy JWT hoặc kết nối socket:', err);
    }
    };

    initWebSocket();

    return () => {
      isMounted = false;
      websocketUtil.off('notify', notifyHandler);
      websocketUtil.disconnect('private');
    };
  }, [user]);


  return (
    <NotificationContext.Provider value={customApi}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
}
