import { useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext';
import Modal from '../Modal/Modal';

import { FiPlus } from "react-icons/fi";

import './Navbar.scss'
import Input from '../Input/Input';
import { color } from 'chart.js/helpers';

const Navbar = () => {
    const { user } = useAuthContext();
    const [showModal, setShowModal] = useState(false)
    const [openDropdown, setOpenDropdown] = useState(false)
    const [modalTitle, setModalTitle] = useState()
    const [inputCategory, setInputCategory] = useState()

    const handleOpenModal = () => {
        setShowModal(true)
        setOpenDropdown(false)
    }
    const handleCloseModal = () => {
        setShowModal(false)
    }

    const dropdownRef = useRef()
    const closeOutDropdown = e => dropdownRef.current === e.target ? setOpenDropdown(false) : ''

    const sendInfo = (title, category) => {
        setModalTitle(title)
        setInputCategory(category)
    }

    return (
        <>
            <div className='navbar'>
                <NavLink className='logo' to='/'>
                    EduFinance Hub
                </NavLink>
                <div className='flexy'>
                    {user && <button className='add-btn' onClick={() => setOpenDropdown(!openDropdown)}> <FiPlus /></button>}
                    {user ?
                        (
                            <NavLink to='/profile' className='flexy navUser'>
                                <p className='text-4xl'>Hi, {user.name}</p>
                            </NavLink>
                        )
                        :
                        (<div className='flexy'>
                            <NavLink to='/home' className='nav-link'>Home</NavLink>
                            <NavLink to='/login' className='nav-link'>Login</NavLink>
                            <NavLink to='/register' className='nav-link'>Register</NavLink>
                        </div>)
                    }
                </div>
            </div>
            {showModal && <Modal onClose={handleCloseModal} title={modalTitle}> <Input onClose={handleCloseModal} sector={inputCategory} /></Modal>}
            {openDropdown && (
                <div className='drop-screen' ref={dropdownRef} onClick={closeOutDropdown}>
                    <div className='dropdown'>
                        <button className='dropdown-item' onClick={() => { handleOpenModal(); sendInfo('Add Expense', 'expense') }}>Expense</button>
                        <button className='dropdown-item' onClick={() => { handleOpenModal(); sendInfo('Add Income', 'income') }}>Income</button>
                        <Link to='/goals' className='dropdown-item' onClick={() => setOpenDropdown(!openDropdown)}>Goal</Link>
                    </div>
                </div>
            )}
        </>
    );
}

export default Navbar