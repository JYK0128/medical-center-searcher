import React, { useState } from 'react';
import { Page, PageProps } from 'app/components/Page';
import { Aside } from 'app/components/Division/Aside';
import { hospitalSearchApi } from 'app/data/api/hospitalAPI';
import { AppHeader } from 'app/features/Common/AppHeader';
import styles from './index.module.scss';
import { HospitalCard } from './HospitalCard';
import { HospitalMap, MapGenerator } from './HospitalMap';
import { HospitalSearch } from './HospitalSearch';

interface MainPageProps extends PageProps {}

export const MainPage: React.FC<MainPageProps> = ({ ...rest }) => {
  const [pageNo, setPageNo] = useState(1);
  const { data, error, isLoading } = hospitalSearchApi.useGetHmcListQuery({ pageNo });

  const handleNextPage = () => setPageNo(pageNo + 1);
  const handlePreviousPage = () => setPageNo(pageNo - 1);

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
        <HospitalMap onLoad={onLoad} />
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
