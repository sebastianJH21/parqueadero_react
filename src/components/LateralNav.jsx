import "./LateralNav.css";
import { MdOutlineEventAvailable } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoMdExit } from "react-icons/io";
import { FiMenu, FiX } from "react-icons/fi";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { LuDoorOpen } from "react-icons/lu";
import { RiCalendarTodoLine } from "react-icons/ri";
import { NavLink, Link} from "react-router-dom";
import { useState } from "react";
import { BsFillCarFrontFill } from "react-icons/bs";

function LateralNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [rol, setRol] = useState('');
  let token = JSON.parse(localStorage.getItem('token'))

  fetch('http://localhost:8081/api/auth/profile', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token.accessToken}`,
      'Accept': 'application/json'
    }
  })
    .then(response => response.json())
    .then(result => {
      setRol(result.result.rol);
    })
    .catch(error => console.error(error))


  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-purple-600 font-bold sidebar-link active"
      : "text-gray-700 sidebar-link";


  return (
    <>
      <button
        className="hamburger-btn"
        onClick={toggleMenu}
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <ul className="sidebar-menu">
            <li>
              <NavLink to="/disponibilidad" className={navLinkClass}>
                <RiCalendarTodoLine className="iconDisponibilidad" />
                <span>Disponibilidad</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/entrada" className={navLinkClass}>
                <LuDoorOpen className="iconEntrada" />
                <span>Entrada</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/salida" className={navLinkClass}>
                <IoMdExit className="iconExit" />
                <span>Salida</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/mensualidad" className={navLinkClass}>
                <MdOutlineCalendarMonth className="iconMensualidad" />
                <span>Mensualidad</span>
              </NavLink>
            </li>
            {
              rol === 'Administrador' ?
                (
                  <>
                    <li>
                      <NavLink to="/reporte" className={navLinkClass}>
                        <HiOutlineDocumentReport className="iconReporte" />
                        <span>Reporte</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/tipo-vehiculos" className={navLinkClass}>
                        <BsFillCarFrontFill className="iconVehicle" />
                        <span>Tipo vehiculos</span>
                      </NavLink>
                    </li>
                  </>
                ) : ('')
            }

          </ul>
          <div className="sidebar-footer">
            {
              rol === 'Administrador'
                ? (
                  <Link to="/formularioregistro" className="sidebar-footer-link">
                    Crear cuenta
                  </Link>
                ) : ('')
            }
          </div>
        </div>
      </aside>
    </>
  );
}

export default LateralNav;