import { SyntheticEvent } from 'react';
import styled, { css } from 'styled-components';

const BaseInput = ({ onChange, ...props }: InputProps) => {
  return (
    <Input
      {...props}
      onChange={(e) => onChange && onChange(e, e.target.value)}
    />
  );
}

/* Interfaces */
interface InputProps {
  id?: string
  onChange?: (e: SyntheticEvent, value: string) => void | null
  focused?: string
  disabled?: boolean
}

/* Styles */
const Input = styled.input<{
  focused?: string
  disabled?: boolean
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

export default BaseInput;
