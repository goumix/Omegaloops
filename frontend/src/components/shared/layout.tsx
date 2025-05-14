import Header from "./header";
import Footer from "./footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="app">
            <Header />
            <main className="main">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout;
