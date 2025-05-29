import React, { createContext, useContext } from 'react';
import { notification } from 'antd';
import "./styles.scss";

const NotificationContext = createContext(null);

export const useNotification = () => useContext(NotificationContext);

export default function NotificationProvider({ children }) {
  const [api, contextHolder] = notification.useNotification();

  // Hàm helper để gán mặc định className, nếu có className thì ghép thêm, không thì chỉ class mặc định
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

  return (
    <NotificationContext.Provider value={customApi}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
}
