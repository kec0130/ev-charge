import Navigation from './Navigation';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
