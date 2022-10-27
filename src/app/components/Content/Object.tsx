import React, { ComponentPropsWithoutRef } from 'react';

/* Type for Molecules */
type ObjectContents = {
  Parameter: typeof Parameter;
  ExternalContent: typeof ExternalContent;
  InlineFrame: typeof InlineFrame;
};
type ObjectProps = ComponentPropsWithoutRef<'object'>;
type ParameterProps = ComponentPropsWithoutRef<'param'>;
type InlineFrameProps = ComponentPropsWithoutRef<'iframe'>;
type ExternalContentProps = ComponentPropsWithoutRef<'embed'>;

/* List of Molecules */
export const Object: React.FC<ObjectProps> & ObjectContents = ({ children, ...rest }) => {
  return <object {...rest}>{children}</object>;
};

export const Parameter: React.FC<ParameterProps> = ({ ...rest }) => {
  return <param {...rest} />;
};

export const InlineFrame: React.FC<InlineFrameProps> = ({ children, ...rest }) => {
  // eslint-disable-next-line jsx-a11y/iframe-has-title
  return <iframe {...rest}>{children}</iframe>;
};

export const ExternalContent: React.FC<ExternalContentProps> = ({ ...rest }) => {
  return <embed {...rest} />;
};

/* Setting for Molecules */
Object.Parameter = Parameter;
Object.ExternalContent = ExternalContent;
Object.InlineFrame = InlineFrame;
