import styled from 'styled-components';

export const SectionReviews = styled.section`
  padding-top: 8px;
  width:100%;
  // display: flex;
  // align-items: center;
  // gap: 32px;

  p:first-child {
    margin-bottom: 12px;
    font-weight: 700;
  font-size: 20px;
  line-height: calc(27 / 20);  

    @media screen and (min-width: 834px) {    
    font-size: 24px;
    line-height: calc(31 / 24);
    }
  }

  label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  input[type='range'] {
    appearance: none;
    width: 136px;
    height: 24px;
  }

  input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
`;

export const Form = styled.form`
  width: 100%;

  & > div:first-of-type {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    label {
      align-items: center;
      @media screen and (min-width: 834px) {
        align-items: start;
      }
    }
    @media screen and (min-width: 834px) {
      align-items: start;
    }
  }

  ul {
    position: absolute;
    bottom: 0;
    height: 24px;
    display: flex;
    gap: 4px;
  }

  li:first-child {
    position: absolute;
    overflow: hidden;
    width: 12px;
  }

  button {
    @media screen and (min-width: 834px) {
      width: 231px;
    }
  }
`;

export const Star = styled.svg`
  width: 24px;
  height: 24px;
  stroke: #2d3f24;
`;

export const TextAreaLabel = styled.label`
  width: 100%;

  textarea {
    padding: 24px;
    height: 213px;
    font-family: inherit;
    font-size: 18px;
    line-height: calc(25 / 18);
    color: #101010;
    resize: none;
  }
`;

export const FlexContainer = styled.div`
  margin: 40px 0;
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  column-gap: 32px;
  row-gap: 24px;

  @media screen and (min-width: 834px) {
    margin: 40px 0 24px;
    flex-direction: row;
    flex-wrap: wrap;
  }
  @media screen and (min-width: 1440px) {
    margin: 40px 0 27px;
  }

  label {
    gap: 12px;
    min-width: 100%;
    @media screen and (min-width: 1440px) {
      min-width: 48%;
    }
  }

  input,
  textarea {
    width: 100%;
    min-height: 44px;
    border: 0.5px solid #101010;
  }

  input {
    text-indent: 24px;
    color: #101010;
  }
`;

export const ReviewList = styled.ul`
  margin-top: 56px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: left;

  @media screen and (min-width: 834px) {
    gap: 24px;
  }

  & article {
    padding-bottom: 24px;
    display: grid;
    grid-template-columns: 15px 80px 1fr 15px;
    grid-template-rows: auto auto auto auto;
    border: 1px solid #101010;
    @media screen and (min-width: 834px) {
      grid-template-columns: 12px 80px 1fr 1fr 12px;
      grid-template-rows: auto auto auto;
    }

    & > img {
      grid-column: 2;
      grid-row: 1 / span 2;
      align-self: center;
    }
    & > ul {
      margin-left: 16px;
      padding-bottom: 22px;
      display: flex;
      grid-column: 3;
      grid-row: 2;
    }
    & > h4 {
      margin-left: 16px;
      padding: 22px 0 12px;
      grid-column: 3;
      grid-row: 1;
      font-weight: 700;
      font-size: 18px;
      line-height: calc(23 / 18);
    }
    & > p:last-child {
      padding: 24px 16px 0;
      grid-column: 1 / spam 4;
      grid-row: 4;
      font-weight: 500;
      border-top: 2px solid #101010;
      @media screen and (min-width: 834px) {
        grid-column: 1 / spam 5;
        grid-row: 3;
      }
    }
  }
`;
export const Date = styled.p`
  margin-bottom: 12px;

  grid-column: 2 / spam 2;
  grid-row: 3;

  font-size: 16px;
  line-height: calc(23 / 16);
  color: #d9d9d9;
  text-align: center;

  @media screen and (min-width: 834px) {
    margin: 0;
    grid-column: 4;
    grid-row: 1 / span 2;
    text-align: right;
    align-self: center;
  }
`;
