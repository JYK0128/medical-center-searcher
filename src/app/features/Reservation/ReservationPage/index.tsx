import { PageProps } from 'app/components/Page';
import React from 'react';

interface ReservationPageProps extends PageProps {
  hmcNm: string;
}

export const ReservationPage: React.FC<ReservationPageProps> = ({ hmcNm, ...rest }) => {
  return (
    <div {...rest}>
      <div>{hmcNm} 예약</div>
      <div>전화 - free</div>
      <div>채팅 - primium</div>
      <div>댓글 - common</div>
    </div>
  );
};
