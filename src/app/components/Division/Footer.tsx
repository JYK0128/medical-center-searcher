import React, { ComponentPropsWithoutRef } from 'react';

/* Type for Molecules */
type FooterProps = ComponentPropsWithoutRef<'footer'>;

/* List of Molecules */
export const Footer: React.FC<FooterProps> = ({ children, ...rest }) => {
  return <footer {...rest}>{children}</footer>;
};

/* Setting for Molecules */
