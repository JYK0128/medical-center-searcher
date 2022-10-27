import React, { ComponentPropsWithoutRef } from 'react';

/* Type for Molecules */
type HintContents = {
  Image: typeof Image;
  Text: typeof Text;
};
type HintProps = ComponentPropsWithoutRef<'div'>;
type ImageProps = ComponentPropsWithoutRef<'img'>;
type TextProps = ComponentPropsWithoutRef<'div'>;

/* List of Molecules */
export const Hint: React.FC<HintProps> & HintContents = ({ children, ...rest }) => {
  return <div {...rest}>{children}</div>;
};
const Image: React.FC<ImageProps> = ({ alt, ...rest }) => {
  return <img alt={alt} {...rest} />;
};
const Text: React.FC<TextProps> = ({ children, ...rest }) => {
  return <div {...rest}>{children}</div>;
};

/* Setting for Molecules */
Hint.Image = Image;
Hint.Text = Text;
