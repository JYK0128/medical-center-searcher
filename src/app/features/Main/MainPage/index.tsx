import React, { SyntheticEvent, useState } from 'react';
import { Page, PageProps } from 'app/components/Page';
import { Aside } from 'app/components/Division/Aside';
import { hospitalSearchApi } from 'app/data/api/hospitalAPI';
import { AppHeader } from 'app/features/Common/AppHeader';
import { MapGenerator, NaverMap } from 'app/features/Common/NaverMap';
import styles from './index.module.scss';
import { HospitalCard } from './HospitalCard';

import { HospitalSearch } from './HospitalSearch';

interface MainPageProps extends PageProps {}

export const MainPage: React.FC<MainPageProps> = ({ ...rest }) => {
  const [pageNo, setPageNo] = useState(1);
  const [hosNm, setHosNm] = useState('');
  // TODO: 검색조건 추가
  const { data, error, isLoading } = hospitalSearchApi.useGetHmcListQuery({
    pageNo,
    hmcNm: hosNm
  });

  const handleNextPage = () => setPageNo(pageNo + 1);
  const handlePreviousPage = () => setPageNo(pageNo - 1);

  // TODO: 검색조건 적용
  const handleHospitalSearch = (e: SyntheticEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
  };

  const onLoad = (mapGenerator: MapGenerator) => {
    const map = mapGenerator();
    if (data) {
      Object.entries(data.entities).map(([, entity]) => {
        if (!entity) return;

        const position = new naver.maps.LatLng(Number(entity.cxVl), Number(entity.cyVl));
        return new naver.maps.Marker({ position, map });
      });
    }
  };

  return (
    <Page {...rest} className={styles['page']}>
      <Page.Header>
        <AppHeader title="title" />
      </Page.Header>
      <Page.Main>
        <Aside onClick={handlePreviousPage} className={styles['prevButton']} />
        {/* 페이지 prev 버튼 */}
        <NaverMap onLoad={onLoad} />
        <HospitalSearch />
        {error && <div>error</div>}
        {isLoading && <div>loading</div>} {/* TODO: suspending */}
        {data &&
          Object.entries(data.entities).map(([, entity]) => (
            <HospitalCard key={entity?.hmcNo} {...entity} />
          ))}
        <Aside onClick={handleNextPage} className={styles['nextButton']} />
        {/* 페이지 next 버튼 */}
      </Page.Main>
      <Page.Footer />
    </Page>
  );
};

export default MainPage;
