
import { Outlet } from 'react-router-dom';
import Navbar from '../Componenets/Shared/NavBar/Navbar';
import Footer from '../Componenets/Shared/Footer/Footer';

export default function Layout() {
  return (
    <div>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}
