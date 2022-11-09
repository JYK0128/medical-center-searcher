import React, { SyntheticEvent, useState } from 'react';
import { Page, PageProps } from 'app/components/Page';
import { Aside } from 'app/components/Division/Aside';
import { AppHeader } from 'app/features/Common/AppHeader';
import { MapGenerator, NaverMap } from 'app/features/Common/NaverMap';
import { useQuery } from '@tanstack/react-query';
import {
  HOSPITAL_SERVICE,
  fetchCheckupTypeList,
  fetchHospitalTypeList,
  fetchHospitals,
  fetchSiGunGuList,
  fetchSidoList
} from 'app/data/api/hospitalAPI';
import styles from './index.module.scss';
import { HospitalCard } from './HospitalCard';

import { HospitalSearch } from './HospitalSearch';

interface MainPageProps extends PageProps {}

export const MainPage: React.FC<MainPageProps> = ({ ...rest }) => {
  const [pageNo, setPageNo] = useState(1);
  const [hmcNm, setHmcNm] = useState('');
  const [siDoCd, setSiDoCd] = useState('');
  const [siDoCdTemp, setSiDoCdTemp] = useState('');
  const [siGunGuCd, setSiGunGuCd] = useState('');
  const [hmcRdatCd, setHospitalType] = useState('');
  const [hchType, setCheckupType] = useState('');

  /* query */
  const fetchHospitalsQuery = useQuery(
    ['fetchHospitals', pageNo, hmcNm, siDoCd, siGunGuCd, hmcRdatCd, hchType],
    () => fetchHospitals({ pageNo, hmcNm, siDoCd, siGunGuCd, hmcRdatCd, hchType })
  );
  const fetchSiDoQuery = useQuery(['fetchSido'], () => fetchSidoList());
  const fetchSiGunGuQuery = useQuery(
    ['fetchSiGunGu', siDoCdTemp],
    () => fetchSiGunGuList({ siDoCd: siDoCdTemp }),
    { enabled: !!siDoCdTemp }
  );
  const fetchHospitalTypeQuery = useQuery(['fetchHospitalType'], () => fetchHospitalTypeList());
  const fetchCheckupTypeQuery = useQuery(['fetchCheckupType'], () => fetchCheckupTypeList());

  /* handler */
  const handleNextPage = () => setPageNo(pageNo + 1);
  const handlePreviousPage = () => setPageNo(pageNo - 1);
  const handleHospitalSearch = (e: SyntheticEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const searchText = formData.get(HOSPITAL_SERVICE.PARAMS.SEARCH_ALL.HOSPITAL_NAME);
    const searchSiDo = formData.get(HOSPITAL_SERVICE.PARAMS.SEARCH_ALL.SIDO_CODE);
    const searchSiGunGu = formData.get(HOSPITAL_SERVICE.PARAMS.SEARCH_ALL.SIGUNGU_CODE);
    const searchHospitalType = formData.get(HOSPITAL_SERVICE.PARAMS.SEARCH_ALL.HOSPITAL_CODE);
    const searchCheckupType = formData.get(HOSPITAL_SERVICE.PARAMS.SEARCH_ALL.CHECKUP_CODE);

    if (typeof searchText === 'string') setHmcNm(searchText);
    if (typeof searchSiDo === 'string') setSiDoCd(searchSiDo);
    if (typeof searchSiGunGu === 'string') setSiGunGuCd(searchSiGunGu);
    if (typeof searchHospitalType === 'string') setHospitalType(searchHospitalType);
    if (typeof searchCheckupType === 'string') setCheckupType(searchCheckupType);
  };
  const handleOnLoad = (mapGenerator: MapGenerator) => {
    const map = mapGenerator({
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT
      }
    });
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

  /* render */
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
          hospitalTypeList={fetchHospitalTypeQuery.data}
          checkupTypeList={fetchCheckupTypeQuery.data}
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
