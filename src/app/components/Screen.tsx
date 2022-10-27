import React, { ReactNode, useEffect } from 'react';
import { Helmet, HelmetProps } from 'react-helmet-async';

/* Type for Molecules */
type ScreenProps = HelmetProps & { children: ReactNode };

/* List of Molecules */
export const Screen: React.FC<ScreenProps> = ({ children, ...rest }) => {
  useEffect(() => {
    console.log('Screen');
  }, []);

  return (
    <>
      <Helmet {...rest} />
      {children}
    </>
  );
};

/* Setting for Molecules */
