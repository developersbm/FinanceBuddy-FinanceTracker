import React from 'react'
import styled from 'styled-components'

function Button({
    name,
    icon,
    onClick,
    bg,
    bPad,
    color,
    bRad,
    type = 'button',
    className,
    disabled,
}) {
    return (
        <ButtonStyled
            type={type}
            className={className}
            disabled={disabled}
            style={{
                background: bg,
                padding: bPad,
                borderRadius: bRad,
                color: color,
            }}
            onClick={onClick}
        >
            {icon}
            {name}
        </ButtonStyled>
    )
}

const ButtonStyled = styled.button`
    outline: none;
    border: none;
    font-family: inherit;
    font-size: inherit;
    display: flex;
    align-items: center;
    gap: .5rem;
    cursor: pointer;
    transition: all .4s ease-in-out;
`;


export default Button