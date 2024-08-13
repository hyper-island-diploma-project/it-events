import { Outlet } from 'react-router-dom';
import Menu from '../components/Menu';
import Footer from '../components/Footer';

export default function Root() {
  return (
    <>
      <Menu />
      <Outlet />
      <Footer />
    </>
  );
}
