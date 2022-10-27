import React from 'react';

type AppHeaderProps = {
  title: string;
};

export const AppHeader: React.FC<AppHeaderProps> = (props: AppHeaderProps) => {
  const { title } = props;
  return <div>{title}</div>;
};
