import React, { ComponentPropsWithoutRef } from 'react';

/* Type for Molecules */
type AsideProps = ComponentPropsWithoutRef<'aside'>;

/* List of Molecules */
export const Aside: React.FC<AsideProps> = ({ children, ...rest }) => {
  return <aside {...rest}>{children}</aside>;
};

/* Setting for Molecules */
