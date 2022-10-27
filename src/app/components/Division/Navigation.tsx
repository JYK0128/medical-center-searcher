import React, { ComponentPropsWithoutRef } from 'react';
import { List } from '../Content/List';

/* Type for Molecules */
type NavigationContents = { List: typeof List };
type NavigationProps = ComponentPropsWithoutRef<'nav'>;

/* List of Molecules */
export const Navigation: React.FC<NavigationProps> & NavigationContents = ({
  children,
  ...rest
}) => {
  return <nav {...rest}>{children}</nav>;
};

/* Setting for Molecules */
Navigation.List = List;
