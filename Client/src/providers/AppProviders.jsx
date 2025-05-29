import { ThirdwebProvider } from 'thirdweb/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './authProvider';
import NotificationProvider from './Notification';
export default function AppProviders({ children }) {
  return (
    <ThirdwebProvider>
      <BrowserRouter>
        <AuthProvider>
            <NotificationProvider>
                {children}
            </NotificationProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThirdwebProvider>
  );
}
