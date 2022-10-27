import React, { ComponentPropsWithoutRef } from 'react';

/* Type for Molecules */
export type AnimeProps = ComponentPropsWithoutRef<'div'>;

/** List of Molecules */
export const Anime: React.FC<AnimeProps> = ({ children, ...rest }) => {
  return <div {...rest}>{children}</div>;
};

/* Setting for Molecules */
