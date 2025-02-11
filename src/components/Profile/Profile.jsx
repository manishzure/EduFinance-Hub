// Profile.jsx
import React from 'react';

const Profile = ({ isOpen }) => {
    return (
        <div className={`sidebar__profile ${isOpen ? 'open' : ''}`}>
            <div className="sidebar__profile__header">
                <span className="sidebar__profile__name">Profile</span>
            </div>
            {isOpen && (
                <div className="sidebar__profile__options">
                    <div className="sidebar__profile__option">Expenses</div>
                    <div className="sidebar__profile__option">Goals</div>
                    <div className="sidebar__profile__option">Income</div>
                </div>
            )}
        </div>
    );
};

export default Profile;