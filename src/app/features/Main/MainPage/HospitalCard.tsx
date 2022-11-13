import React, { SyntheticEvent } from 'react';
import { Card } from 'app/components/Content/Card';
import { Hint } from 'app/components/Content/Hint';
import { Subject } from 'app/components/Content/Text';
import { HospitalItemType } from 'app/data/api/hospitalAPI';
import { Button } from 'app/components/Content/Button';
import { Wrapper } from 'app/components/Wrapper';
import styles from './HospitalCard.module.scss';

type HospitalCardProps = Partial<
  HospitalItemType & {
    onClickDetail: React.ReactEventHandler<HTMLDivElement>;
    onClickReservation: React.ReactEventHandler<HTMLDivElement>;
  }
>;

export const HospitalCard: React.FC<HospitalCardProps> = props => {
  const {
    hmcNm,
    hmcTelNo,
    exmdrTelNo,
    exmdrFaxNo,
    ykindnm,
    grenChrgTypeCd,
    ichkChrgTypeCd,
    mchkChrgTypeCd,
    stmcaExmdChrgTypeCd,
    lvcaExmdChrgTypeCd,
    ccExmdChrgTypeCd,
    bcExmdChrgTypeCd,
    cvxcaExmdChrgTypeCd,
    onClickDetail,
    onClickReservation
  } = props ?? {};

  const isEnable = (value: string | undefined) =>
    value?.toString() === '1' ? 'enable' : undefined;

  const handleDetail = (e: SyntheticEvent<HTMLDivElement>) => {
    if (onClickDetail) {
      onClickDetail(e);
    }
  };

  const handleReservation = (e: SyntheticEvent<HTMLDivElement>) => {
    if (onClickReservation) {
      onClickReservation(e);
    }
  };

  return (
    <Card className={styles['main']}>
      <Card.Title className={styles['title']}>
        {hmcNm && <Subject.H1>{hmcNm}</Subject.H1>}
        {ykindnm && <Subject.H2>{ykindnm}</Subject.H2>}
      </Card.Title>
      <Card.Description className={styles['description']}>
        <Hint className={isEnable(grenChrgTypeCd)}>일반검진</Hint>
        <Hint className={isEnable(ichkChrgTypeCd)}>유아검진</Hint>
        <Hint className={isEnable(mchkChrgTypeCd)}>구강검진</Hint>
        <Hint className={isEnable(stmcaExmdChrgTypeCd)}>위암검진</Hint>
        <Hint className={isEnable(lvcaExmdChrgTypeCd)}>간암검진</Hint>
        <Hint className={isEnable(ccExmdChrgTypeCd)}>대장암검진</Hint>
        <Hint className={isEnable(bcExmdChrgTypeCd)}>유방암검진</Hint>
        <Hint className={isEnable(cvxcaExmdChrgTypeCd)}>자궁암검진</Hint>
      </Card.Description>
      <Card.Description className={styles['information']}>
        {hmcTelNo && (
          <div>
            <span>대표 전화: </span>
            <a href={`tel:${hmcTelNo}`}>{hmcTelNo}</a>
          </div>
        )}
        {exmdrTelNo && (
          <div>
            <span>검진실 전화: </span>
            <a href={`tel:${exmdrTelNo}`}>{exmdrTelNo}</a>
          </div>
        )}
        {exmdrFaxNo && (
          <div>
            <span>검진실 팩스: </span>
            <a href={`fax:${exmdrFaxNo}`}>{exmdrFaxNo}</a>
          </div>
        )}
        <Wrapper className={styles['button-wrapper']}>
          <Button onClick={handleDetail}>상세정보</Button>
          <Button onClick={handleReservation}>예약하기</Button>
        </Wrapper>
      </Card.Description>
    </Card>
  );
};
