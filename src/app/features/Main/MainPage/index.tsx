import React, { SyntheticEvent, useState } from 'react';
import { Page, PageProps } from 'app/components/Page';
import { Aside } from 'app/components/Division/Aside';
import { AppHeader } from 'app/features/Common/AppHeader';
import { MapGenerator, NaverMap } from 'app/features/Common/NaverMap';
import { useQuery } from '@tanstack/react-query';
import { fetchHospitals, fetchSiGunGuList, fetchSidoList } from 'app/data/api/hospitalAPI';
import styles from './index.module.scss';
import { HospitalCard } from './HospitalCard';

import { HospitalSearch } from './HospitalSearch';
import { HOSPITAL_SERVICE } from '../../../data/api/hospitalAPI';

interface MainPageProps extends PageProps {}

export const MainPage: React.FC<MainPageProps> = ({ ...rest }) => {
  const [pageNo, setPageNo] = useState(1);
  const [hmcNm, setHmcNm] = useState('');
  const [siDoCd, setSiDoCd] = useState('');
  const [siDoCdTemp, setSiDoCdTemp] = useState('');
  const [siGunGuCd, setSiGunGuCd] = useState('');

  const fetchHospitalsQuery = useQuery(['fetchHospitals', pageNo, hmcNm, siDoCd, siGunGuCd], () =>
    fetchHospitals({ pageNo, hmcNm, siDoCd, siGunGuCd })
  );
  const fetchSiDoQuery = useQuery(['fetchSido'], () => fetchSidoList());
  const fetchSiGunGuQuery = useQuery(
    ['fetchSiGunGu', siDoCdTemp],
    () => fetchSiGunGuList({ siDoCd: siDoCdTemp }),
    {
      enabled: !!siDoCdTemp
    }
  );

  // handler
  const handleNextPage = () => setPageNo(pageNo + 1);
  const handlePreviousPage = () => setPageNo(pageNo - 1);
  const handleHospitalSearch = (e: SyntheticEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const searchText = formData.get(HOSPITAL_SERVICE.PARAMS.SEARCH_ALL.HOSPITAL_NAME);
    const searchSiDo = formData.get(HOSPITAL_SERVICE.PARAMS.SEARCH_ALL.SIDO_CODE);
    const searchSiGunGu = formData.get(HOSPITAL_SERVICE.PARAMS.SEARCH_ALL.SIGUNGU_CODE);

    if (typeof searchText === 'string') setHmcNm(searchText);
    if (typeof searchSiDo === 'string') setSiDoCd(searchSiDo);
    if (typeof searchSiGunGu === 'string') setSiGunGuCd(searchSiGunGu);
  };
  const handleOnLoad = (mapGenerator: MapGenerator) => {
    const map = mapGenerator();
    if (fetchHospitalsQuery.data) {
      fetchHospitalsQuery.data.map(item => {
        if (!item) return;

        const position = new naver.maps.LatLng(Number(item.cxVl), Number(item.cyVl));
        return new naver.maps.Marker({ position, map });
      });
    }
  };
  const handleSidoList = (e: SyntheticEvent<HTMLSelectElement>) => {
    setSiDoCdTemp(e.currentTarget.value);
  };

  // render
  return (
    <Page {...rest} className={styles['page']}>
      <Page.Header>
        <AppHeader title="title" />
      </Page.Header>
      <Page.Main>
        <Aside onClick={handlePreviousPage} className={styles['prevButton']}>
          prev
        </Aside>
        <NaverMap onLoad={handleOnLoad} style={{ width: '100%', height: '300px' }} />
        <HospitalSearch
          onSubmit={handleHospitalSearch}
          onSelectSido={handleSidoList}
          siDoList={fetchSiDoQuery.data}
          siGunGuList={fetchSiGunGuQuery.data}
        />
        {fetchHospitalsQuery.isError && <div>error</div>}
        {fetchHospitalsQuery.isLoading && <div>loading</div>}
        {fetchHospitalsQuery.data &&
          fetchHospitalsQuery.data.map(item => <HospitalCard key={item.hmcNo} {...item} />)}
        <Aside onClick={handleNextPage} className={styles['nextButton']}>
          next
        </Aside>
      </Page.Main>
      <Page.Footer />
    </Page>
  );
};

export default MainPage;
