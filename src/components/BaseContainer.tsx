import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { Property } from 'csstype'

export type FlexBoxProps = PropsWithChildren<{
  flex?: boolean
  flexDirection?: Property.FlexDirection
  flexGrow?: Property.FlexGrow
  flexShrink?: Property.FlexShrink
  flexBasis?: Property.FlexBasis
  justifyContent?: Property.JustifyContent
  alignItems?: Property.AlignItems
}>

export interface ContainerProps extends FlexBoxProps {
  id?: string
  width?: Property.Width
  height?: Property.Height
  maxHeight?: Property.Height
  padding?: Property.Padding
}

const BaseContainer = styled.div<ContainerProps>`
  display: ${({ flex }) => flex ? 'flex' : undefined};
  flex-direction: ${({ flexDirection }) => flexDirection};
  flex-grow: ${({ flexGrow }) => flexGrow};
  flex-shrink: ${({ flexShrink }) => flexShrink};
  flex-basis: ${({ flexBasis }) => flexBasis};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '100%'};
  max-height: ${({ maxHeight }) => maxHeight || '100%'};
  padding: ${({ padding }) => padding || undefined};
`;

export default BaseContainer;
