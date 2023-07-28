const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header>
        <nav>전기차지</nav>
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
