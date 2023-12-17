import styled from 'styled-components';

export const SliderContainer = styled.div`
  position: relative;
  button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;

    background: #f2f0ec;

    box-shadow: 1px 1px 7px 0px #dad4c870;
    @media screen and (min-width: 1440px) {
      width: 32px;
      height: 40px;
      border-radius: 0;
    }
  }

  & > button {
    color: #2d3f24;
  }

  .btn_left {
    left: 8px;
    @media screen and (min-width: 1440px) {
      left: 16px;
    }
  }
  .btn_right {
    right: 8px;
    @media screen and (min-width: 1440px) {
      right: 16px;
    }
  }

  img {
    object-fit: cover;
    @media screen and (max-width: 1439.99px) {
      height: 224px;
    }
  }
`;

export const ChevronIcon = styled.svg`
fill:#101010;
${({ left }) => (left ? `` : `transform: rotate(180deg)`)}} 
`;