import React, { ComponentPropsWithoutRef } from 'react';
import { Figure } from './Figure';
import { Title } from './Title';

/* Type for Molecules */
type CardContents = {
  Title: typeof Title;
  Figure: typeof Figure;
  Description: typeof Description;
};
type CardProps = ComponentPropsWithoutRef<'div'>;
type DescriptionProps = ComponentPropsWithoutRef<'div'>;

/* List of Molecules */
export const Card: React.FC<CardProps> & CardContents = ({ children, ...rest }) => {
  return <div {...rest}>{children}</div>;
};
const Description: React.FC<DescriptionProps> = ({ children, ...rest }) => {
  return <div {...rest}>{children}</div>;
};

/* Setting for Molecules */
Card.Title = Title;
Card.Figure = Figure;
Card.Description = Description;
