import styled from "styled-components";


export const StyledSubmitButton = styled.button`
    display: block;
    width: 100%;
    border: ${props => `2px solid ${props.theme.light.main}`};
    color: ${props => props.theme.light.main};
    background-color: transparent;
    padding: 10px;
    border-radius: 8px;
    font-weight: bold;
    font-size: 16px;
    margin-top: 40px;
    cursor: pointer;
    transition : 0.5s;

    &:not(:disabled):hover{
        background-color: ${props => props.theme.light.main};
        color: #fff;
    }

    &:disabled{
        cursor: default;
        opacity: 0.4
    }
`