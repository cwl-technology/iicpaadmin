import Header from "@/_component/user/Header";
import Footer from "@/_component/user/Footer";
export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Header />
                {children}
                <Footer/>
            </body>
        </html>
    );
}