import React, { ComponentPropsWithoutRef } from 'react';

/* Type for Molecules */
type HeaderProps = ComponentPropsWithoutRef<'header'>;

/* List of Molecules */
export const Header: React.FC<HeaderProps> = ({ children, ...rest }) => {
  return <header {...rest}>{children}</header>;
};

/* Setting for Molecules */
