import React, { ComponentPropsWithoutRef } from 'react';

/* Type for Molecules */
type MainProps = ComponentPropsWithoutRef<'main'>;

/* List of Molecules */
export const Main: React.FC<MainProps> = ({ children, ...rest }) => {
  return <main {...rest}>{children}</main>;
};

/* Setting for Molecules */
