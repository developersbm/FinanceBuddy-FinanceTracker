import React, { useState } from 'react';
import styled from 'styled-components';
// import avatar from '../../img/avatar.png';
// import { signout } from '../../utils/Icons';
// import { menuItems } from '../../utils/menuItems';

const Navbar = () => {
    const [active, setActive] = useState(null);

    return (
        <NavStyled>
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">LOGO</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><a href="/screens/dashboard">Dashboard</a></li>
                    <li><a href="/">View Transactions</a></li>
                    <li><a href="/screens/incomes">Incomes</a></li>
                    <li><a href="/">Expenses</a></li>
                    <li>
                        <details>
                            <summary>Account</summary>
                            <ul className="dropdown-menu">
                                <li><a href="/">Link 1</a></li>
                                <li><a href="/">Link 2</a></li>
                                <li><a href="/">Link 3</a></li>
                                <li onClick={() => setActive(null)}>{/* Add signout logic here */} Sign Out</li>
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
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    justify-content: space-between;
    gap: 2rem;

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
                    border-radius: 0 10px 10px 0;
                }
            }
        }
    }

    .dropdown-menu {
        position: absolute;
        background-color: #ffffff;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 1;
        list-style-type: none;
        padding: 0;
        margin: 0;
        border-radius: 8px;

        li {
            padding: 8px 12px;
            transition: background-color 0.3s;

            &:hover {
                background-color: #f0f0f0;
            }
        }
    }
`;

export default Navbar;
