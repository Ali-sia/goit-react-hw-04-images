import styled from 'styled-components';

export const ButtonLoadMore = styled.button`
  padding: ${p => p.theme.space[3]}px ${p => p.theme.space[4]}px;
  border-radius: ${p => p.theme.radii.xs};
  background-color: ${p => p.theme.colors.header};
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  display: inline-block;
  color: ${p => p.theme.colors.white};
  border: ${p => p.theme.space[0]};
  text-decoration: none;
  cursor: pointer;
  font-family: inherit;
  font-size: ${p => p.theme.space[1] * 9}px;
  line-height: ${p => p.theme.space[3] * 3}px;
  font-style: normal;
  font-weight: ${p => p.theme.fontWeights.normalM};
  min-width: 180px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  :hover,
  :focus {
    background-color: ${p => p.theme.colors.loadMore};
  }
`;
