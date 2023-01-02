import styled from 'styled-components';

export const ImageList = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: ${p => p.theme.space[4]}px;
  margin-top: ${p => p.theme.space[0]};
  margin-bottom: ${p => p.theme.space[0]};
  padding: ${p => p.theme.space[0]};
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;
