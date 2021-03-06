import styled from 'styled-components';

const CenterWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
`;

const ItemTextWrapper = styled.div`
  padding-right: ${(props) => (props.paddingRight ? props.paddingRight : '16px')};
  width: 100%;
`;

export {
  CenterWrapper,
  ItemTextWrapper,
};
