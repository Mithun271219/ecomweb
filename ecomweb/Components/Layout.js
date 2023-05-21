import NavBar from "./NavBar"

function Layout({ children }) {
    return (
        <>
            <NavBar />
            <main>{children}</main>
        </>
    )
}

export default Layout