import { SyntheticEvent } from 'react';
import styled, { css } from 'styled-components';
import { Property } from 'csstype'

const Input = styled.input<{
  focused?: string
}>`
  position: relative;
  width: 100%;
  font-size: 16px;
  color: #000;
  padding: 10px;
  border: 2px solid #00bcd4;
  border-radius: 2px;

  ${({ focused }) =>
  focused &&
  css`
    border-color: blue;
  `};
`;

interface InputProps {
  id?: string
  onChange?: (e: SyntheticEvent, value: string) => void | null
  focused?: string
}

const BaseInput = ({ onChange, ...props }: InputProps) => {
  return (
    <Input
      {...props}
      onChange={(e) => onChange && onChange(e, e.target.value)}
    />
  );
}
export default BaseInput;
