import React, { ComponentPropsWithoutRef } from 'react';

/* Type for Molecules */
export type WrapperProps = ComponentPropsWithoutRef<'div'>;

/* List of Molecules */
export const Wrapper: React.FC<WrapperProps> = ({ children, ...rest }) => {
  return <div {...rest}>{children}</div>;
};

/* Setting for Molecules */
