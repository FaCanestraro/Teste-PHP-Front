import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    margin: 5px;
    justify-content: space-evenly;
`;

export const BackgroundLeftColor = styled.div`
    background: var(--color-blue);
    height: 100vh;
`;

export const BackgroundRightColor = styled.div`
    background: var(--color-yellow);
    height: 100vh;
`;

export const Form = styled.form`
    position: absolute;
    right: 18%;
    top: 7%;
    display: flex;
    flex-direction: column;
    background: white;
    padding: 4rem 3rem;
    border-radius: 0.5rem;
    img {
        
    }
    h2 {
        margin: 3rem 0 3rem 0;
        text-align: center;
    }
    button {
        align-self: center;
        font-size: 1rem;
        cursor: pointer;
        border: none;
        border-radius: 0.4rem;
        background: #fb1;
        color: #764701;
        min-width: 8rem;
        padding: 0.8rem 1.2rem;
        box-sizing: border-box;
        transition: .1s;
        &:hover,
        &:focus {
            outline: none;
            box-shadow: 0 0 0 3px #fea, 0 0 0 4px #fb1;
        }
        &:disabled {
            opacity: 0.5;
            cursor: wait;
        }
    }
`;

export const Space = styled.div`
    display: flex;
    justify-content: space-between;
`;