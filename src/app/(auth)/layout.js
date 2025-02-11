
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: 'Admin Login | IICPA'
}

export default function AdminLoginLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="stylesheet" href="/assets/css/admin.css"/>
      </head>
      <body>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
