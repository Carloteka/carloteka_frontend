import styled from 'styled-components';

export const SectionAdditionalInfo = styled.section`
  padding-top: 8px;
  min-height: 211px;
  display: flex;
  justify-content: space-between;

  color: #000;

  & > table {
    width: 100%;
    min-height: 136px;

    text-align: left;

    border-collapse: separate;
    border-spacing: 0 0px;

    @media screen and (min-width: 1440px) {
      width: 640px;
    }
  }

  & > table > tbody {
    vertical-align: top;
  }

  & > table td:first-child {
    width: auto;
    @media screen and (min-width: 1440px) {
      width: 336px;
    }
  }

  & > table td:last-child {
    text-align: right;
  }

  & > details {
    display: none;

    @media screen and (min-width: 1440px) {
      padding: 32px;
      height: clamp(95px, 95px, 211px);
      background-color: #dad4c8;
    }
  }

  & > details table {
    margin-top: 16px;
    width: 575px;
    height: 93px;
  }

  details > summary {
    width: 575px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    list-style: none;
    cursor: pointer;
  }
  details > summary::-webkit-details-marker {
    display: none;
  }

  details[open] {
    height: 211px;

    svg {
      transform: rotate(0deg);
    }
  }

  svg {
    padding: 7px 2px;
    transform: rotate(180deg);
  }
`;