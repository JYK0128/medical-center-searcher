import { Title } from 'app/components/Content/Title';
import React from 'react';
import * as Icon from 'react-bootstrap-icons';

type AppHeaderProps = {
  title: string;
  userName?: string;
  userId?: string;
};

export const AppHeader: React.FC<AppHeaderProps> = (props: AppHeaderProps) => {
  const { title, userName, userId } = props;
  return (
    <Title>
      <Title.Main>{title}</Title.Main>
      <Title.Sub>
        {userId ? (
          <>
            <Icon.PersonCircle />
            {userName || '비회원'} 님
          </>
        ) : null}
      </Title.Sub>
    </Title>
  );
};
