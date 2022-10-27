import React, { ComponentPropsWithoutRef } from 'react';

/* Type for Molecules */
type TitleContents = {
  Main: typeof Main;
  Sub: typeof Sub;
};
export type TitleProps = ComponentPropsWithoutRef<'div'>;
export type MainTitleProps = ComponentPropsWithoutRef<'div'>;
export type SubTitleProps = ComponentPropsWithoutRef<'div'>;

/* List of Molecules */
export const Title: React.FC<TitleProps> & TitleContents = ({ children, ...rest }) => {
  return <div {...rest}>{children}</div>;
};
const Main: React.FC<MainTitleProps> = ({ children, ...rest }) => {
  return <div {...rest}>{children}</div>;
};
const Sub: React.FC<SubTitleProps> = ({ children, ...rest }) => {
  return <div {...rest}>{children}</div>;
};

/* Setting for Molecules */
Title.Main = Main;
Title.Sub = Sub;
