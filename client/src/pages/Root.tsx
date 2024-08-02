import { Outlet } from 'react-router-dom';
import TabBar from '../components/TabBar';
import Footer from '../components/Footer';

export default function Root() {
  return (
    <>
      <TabBar />
      <Outlet />
      <Footer />
    </>
  );
}
