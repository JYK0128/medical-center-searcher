import React, { SyntheticEvent, useState } from 'react';
import { Page, PageProps } from 'app/components/Page';
import { Aside } from 'app/components/Division/Aside';
import { AppHeader } from 'app/features/Common/AppHeader';
import { MapGenerator, NaverMap } from 'app/features/Common/NaverMap';
import { useQuery } from '@tanstack/react-query';
import { fetchHospitals } from 'app/data/api/hospitalAPI';
import styles from './index.module.scss';
import { HospitalCard } from './HospitalCard';

import { HospitalSearch } from './HospitalSearch';

interface MainPageProps extends PageProps {}

export const MainPage: React.FC<MainPageProps> = ({ ...rest }) => {
  const [pageNo, setPageNo] = useState(1);
  const [hmcNm, setHmcNm] = useState('');

  const { isLoading, data, isError } = useQuery(['searchHospitals', pageNo, hmcNm], () =>
    fetchHospitals({ pageNo, hmcNm })
  );

  const handleNextPage = () => setPageNo(pageNo + 1);
  const handlePreviousPage = () => setPageNo(pageNo - 1);
  const handleHospitalSearch = (e: SyntheticEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const name = formData.get('hmcNm');

    if (typeof name === 'string') {
      setHmcNm(name);
    }
  };

  const onLoad = (mapGenerator: MapGenerator) => {
    const map = mapGenerator();
    if (data) {
      data.map(item => {
        if (!item) return;

        const position = new naver.maps.LatLng(Number(item.cxVl), Number(item.cyVl));
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
        <Aside onClick={handlePreviousPage} className={styles['prevButton']}>
          prev
        </Aside>
        <NaverMap onLoad={onLoad} style={{ width: '100%', height: '300px' }} />
        <HospitalSearch onSubmit={handleHospitalSearch} />
        {isError && <div>error</div>}
        {isLoading && <div>loading</div>}
        {data && data.map(item => <HospitalCard key={item?.hmcNo} {...item} />)}
        <Aside onClick={handleNextPage} className={styles['nextButton']}>
          next
        </Aside>
      </Page.Main>
      <Page.Footer />
    </Page>
  );
};

export default MainPage;
