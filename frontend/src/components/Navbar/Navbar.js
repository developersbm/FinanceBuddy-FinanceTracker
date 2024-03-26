import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
// import avatar from '../../img/avatar.png';
import { signout } from '../../utils/Icons';
// import { menuItems } from '../../utils/menuItems';
import logo from '../../img/logo.png';
import profile from '../../img/profile.png';
import letters from '../../img/letters.png';

const Navbar = () => {
    const [active, setActive] = useState(null);

    return (
        <NavStyled>
            <div className="flex-1">
            <StyledNavLink to="/home" className="btn btn-ghost text-xl">
                <img src={logo} style={{ width: '40px', height: '40px' }} /></StyledNavLink>
                <img src={letters} style={{ height: '30px' , paddingLeft: '10px'}} />
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                <li><StyledNavLink to="/screens/dashboard">Dashboard</StyledNavLink></li>
                <li><StyledNavLink to="/screens/incomes">Incomes</StyledNavLink></li>
                <li><StyledNavLink to="/screens/expenses">Expenses</StyledNavLink></li>
                    <li>
                        <details>
                        <summary><img src={profile} style={{ width: '40px', height: '40px' }}></img></summary>
                            <ul className="dropdown-menu">
                                <li><a href="/screens/account">Account</a></li>
                                <li><a href="/screens/setting">Settings</a></li>
                                <li onClick={() => setActive(null)}>{signout} Sign Out</li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </NavStyled>
    );
};

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 100%;
    background: linear-gradient(to bottom right, lightgreen, lightblue);
    border: 3px solid #ffffff;
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    text-decoration: none;


    .menu {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-top: auto;

        li {
            cursor: pointer;
            transition: all 0.4s ease-in-out;
            color: rgba(34, 34, 96, 0.6);
            position: relative;
=
            &.active {
                color: rgba(34, 34, 96, 1) !important;

                &::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 4px;
                    height: 100%;
                    background: #222260;
                }
            }
        }
    }

    .dropdown-menu {
        position: absolute;
        background: linear-gradient(to bottom right, lightgreen, lightblue);
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 1;
        list-style-type: none;
        padding: 0;
        width: 10em;
        margin: 0;
        border-radius: 8px;
        right: 0; 
        a {
            text-decoration: none;
        }
        li {
            padding: 8px 12px;
            transition: background-color 0.3s;

            &:hover {
                background-color: #f0f0f0;
            }
        }
    }
    
    
`;
const StyledNavLink = styled(NavLink)`
    text-decoration: none;
`;

export default Navbar;