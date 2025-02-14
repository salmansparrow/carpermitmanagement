import MainNavBar from "../common/MainNavBar";

function Layout({ children }) {
  return (
    <>
      <MainNavBar />
      {children}
    </>
  );
}

export default Layout;
