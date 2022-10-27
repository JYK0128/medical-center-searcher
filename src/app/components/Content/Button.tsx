import React, { ComponentPropsWithoutRef } from 'react';
import { Figure } from './Figure';
import { Title } from './Title';

/* Type for Molecules */
type ButtonContents = {
  Icon: typeof Figure.Image;
  Text: typeof Title;
};
export type ButtonProps = ComponentPropsWithoutRef<'div'>;

/* List of Molecules */
export const Button: React.FC<ButtonProps> & ButtonContents = ({ children, ...rest }) => {
  return <div {...rest}>{children}</div>;
};

/* Setting for Molecules */
Button.Text = Title;
Button.Icon = Figure.Image;
