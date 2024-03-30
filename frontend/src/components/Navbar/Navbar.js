import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
// import avatar from '../../img/avatar.png';
import { signout } from '../../utils/Icons';
// import { menuItems } from '../../utils/menuItems';
import logo from '../../img/logo.png';
import profile from '../../img/profile2.png';
import letters from '../../img/letters.png';

const Navbar = () => {
    const [active, setActive] = useState(null);

    return (
        <NavStyled>
            <div className="flex-1">
            <StyledNavLink to="/screens/dashboard" className="btn btn-ghost text-xl">
                <img src={logo} style={{ width: '40px', height: '40px' }} />
                <img src={letters} style={{ height: '30px' , paddingLeft: '10px'}} />
            </StyledNavLink>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                <li><StyledNavLink to="/screens/dashboard">Dashboard</StyledNavLink></li>
                <li><StyledNavLink to="/screens/incomes">Incomes</StyledNavLink></li>
                <li><StyledNavLink to="/screens/expenses">Expenses</StyledNavLink></li>
                <li><StyledNavLink to="/screens/stockPredictor">Stock Predictor</StyledNavLink></li>
                    <li>
                        <details>
                        <summary><img src={profile} style={{ width: '40px', height: '40px' }}></img></summary>
                            <ul className="dropdown-menu">
                                <li><a href="/screens/account">Account</a></li>
                                <li><a href="/screens/setting">Settings</a></li>
                                <li style={{color: 'red'}} onClick={() => setActive(null)}>{signout} Sign Out</li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </NavStyled>
    );
};

const NavStyled = styled.nav`
    padding: 1.5rem 1.5rem;
    width: 100%;
    background: white;
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
        color: black;
        font-size: 20px;
        li {
            cursor: pointer;
            transition: all 0.4s ease-in-out;
            color: linear-gradient(to bottom right, lightgreen, lightblue) !important;
            position: relative;
=
            &.active {
                color: linear-gradient(to bottom right, lightgreen, lightblue) !important;

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
        background: white;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 1;
        list-style-type: none;
        padding: 0;
        width: 10em;
        margin: 0;
        border-radius: 8px;
        color: green;
        
        right: 0; 
        a {
            text-decoration: none;
            color: green;
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
    background: linear-gradient(to bottom, darkgreen, #65d684, #65d684, #65d684, cyan);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: background 0.5s ease;

    &:hover {
        background: none;
        -webkit-text-fill-color: black;
    }
`;



export default Navbar;