import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
    FiSidebar, 
    FiShoppingBag,
    FiTrendingUp,
    FiThumbsUp,
    FiBarChart,
    FiUser,
    FiPaperclip,
    FiLogOut
} from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";

import './Sidebar.scss';
import { logout } from '../../store/AccessTokenStore';

const sidebarNavItems = [
    {
        display: 'Dashboard',
        icon: <FiSidebar />,
        to: '/',
        section: 'dashboard',
    },
    {
        display: 'Income',
        icon: <FiTrendingUp />,
        to: '/incomes',
        section: 'incomes',
    },
    {
        display: 'Expense',
        icon: <FiShoppingBag />,
        to: '/expenses',
        section: 'expenses',
    },
    {
        display: 'Goals',
        icon: <FiThumbsUp />,
        to: '/goals',
        section: 'goals',
    },
    {
        display: 'Finance Advisor AI',
        icon: <RiRobot2Line />,
        to: '/commons',
        section: 'commons',
    },
    {
        display: "Scholarship",
        icon: <RiRobot2Line />,
        to: "/scholarship",
        section: "scholarship",
    },
    // {
    //     display: 'Investments',
    //     icon: <FiThumbsUp />,
    //     to: '/investments',
    //     section: 'investments',
    // },
    {
        display: 'News',
        icon: <FiPaperclip />,
        to: '/news',
        section: 'news',
    },
    {
        display: 'Stock Calculator',
        icon: <FiPaperclip />,
        to: '/stock',
        section: 'stock',
        sectionNumber: 9
    },
    {
        display: 'Stock News Analysis',
        icon: <FiPaperclip />,
        to: '/prediction',
        section: 'prediction',
        sectionNumber: 0
    },
    {
        display: 'Financial Tracker',
        icon: <FiPaperclip />,
        to: '/financial_tracker',
        section: 'financial_tracker',
        sectionNumber: 0
    },
    {
        display: 'Profile',
        icon: <FiUser />,
        to: '/profile',
        section: 'profile',
    },
    {
        display: 'Logout',
        icon: <FiLogOut />,
        to: '/login',
        section: 'logout',
    },
];

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();

    useEffect(() => {
        const curPath = location.pathname;

        // Match 'scholarship' for both '/scholarship' and '/merit-based-scholarships'
        const activeItem = sidebarNavItems.findIndex(item =>
            curPath.includes(item.section)
        );

        setActiveIndex(activeItem !== -1 ? activeItem : 0);
    }, [location]);

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current?.querySelector('.sidebar__menu__item');
            if (sidebarItem) {
                indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
                setStepHeight(sidebarItem.clientHeight);
            }
        }, 50);
    }, []);

    const sidebarIndicatorHeight = activeIndex * stepHeight;

    return (
        <div className='sidebar'>
            <div className="sidebar__logo">
                <div className='sidebar__fullLogo'>
                    <FiBarChart style={{ marginRight: '1rem' }} />
                    <Link to={'/'}>EduFinance Hub</Link>
                </div>
            </div>

            <b><hr/></b>
            <h3 className='sidebar__title'>MAIN</h3>
            <b><hr/></b>

            <div ref={sidebarRef} className="sidebar__menu">
                <div
                    ref={indicatorRef}
                    className="sidebar__menu__indicator"
                    style={{
                        transform: 
                        `translateX(-50%) 
                        translateY(${sidebarIndicatorHeight}px)`
                    }}
                />

                {sidebarNavItems.map((item, index) => (
                    <Link to={item.to} key={index}>
                        <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                            <div className="sidebar__menu__item__icon">
                                {item.icon}
                            </div>
                            <div className="sidebar__menu__item__text">
                                {item.display}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
