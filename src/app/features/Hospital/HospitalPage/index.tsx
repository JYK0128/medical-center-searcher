import { useQuery } from '@tanstack/react-query';
import { Table } from 'app/components/Content/Table';
import { PageProps } from 'app/components/Page';
import { fetchHospital } from 'app/data/api/hospitalAPI';
import { MapGenerator, NaverMap } from 'app/features/Common/NaverMap';
import React from 'react';

interface HospitalPageProps extends PageProps {
  hmcNm: string;
}

export const HospitalPage: React.FC<HospitalPageProps> = ({ hmcNm }) => {
  const { data } = useQuery(['fetchHospital', hmcNm], () => fetchHospital({ hmcNm }));

  const {
    bcExmdChrgTypeCd,
    ccExmdChrgTypeCd,
    cvxcaExmdChrgTypeCd,
    exmdrFaxNo,
    exmdrTelNo,
    grenChrgTypeCd,
    hmcTelNo,
    ichkChrgTypeCd,
    locAddr,
    locPostNo,
    cxVl,
    cyVl,
    lvcaExmdChrgTypeCd,
    mchkChrgTypeCd,
    stmcaExmdChrgTypeCd,
    ykindnm
  } = data ?? {};

  const handleNaverMap = (mapGenerator: MapGenerator) => {
    const map = mapGenerator({
      center: new naver.maps.LatLng(Number(cxVl), Number(cyVl)),
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT
      }
    });

    const position = new naver.maps.LatLng(Number(cxVl), Number(cyVl));
    return new naver.maps.Marker({ position, map });
  };

  return (
    <>
      <NaverMap style={{ width: '100%', height: '300px' }} onLoad={handleNaverMap} />
      <Table>
        <Table.Row>
          <Table.Row.Header>타입</Table.Row.Header>
          <Table.Data>{ykindnm}</Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Row.Header>이름</Table.Row.Header>
          <Table.Data>{hmcNm}</Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Row.Header>주소</Table.Row.Header>
          <Table.Data>{locAddr}</Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Row.Header>우편번호</Table.Row.Header>
          <Table.Data>{locPostNo}</Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Row.Header>병원 대표번호</Table.Row.Header>
          <Table.Data>{hmcTelNo}</Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Row.Header>건진센터 전화번호</Table.Row.Header>
          <Table.Data>{exmdrTelNo}</Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Row.Header>건진센터 팩스번호</Table.Row.Header>
          <Table.Data>{exmdrFaxNo}</Table.Data>
        </Table.Row>
      </Table>
      <Table>
        <Table.Row>
          <Table.Row.Header>일반검진</Table.Row.Header>
          <Table.Data>{grenChrgTypeCd ? '유' : '무'}</Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Row.Header>구강검진</Table.Row.Header>
          <Table.Data>{mchkChrgTypeCd ? '유' : '무'}</Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Row.Header>영유아검진</Table.Row.Header>
          <Table.Data>{ichkChrgTypeCd ? '유' : '무'}</Table.Data>
        </Table.Row>
      </Table>
      <Table>
        <Table.Row>
          <Table.Row.Header>위암</Table.Row.Header>
          <Table.Data>{stmcaExmdChrgTypeCd ? '유' : '무'}</Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Row.Header>대장암</Table.Row.Header>
          <Table.Data>{ccExmdChrgTypeCd ? '유' : '무'}</Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Row.Header>간암</Table.Row.Header>
          <Table.Data>{lvcaExmdChrgTypeCd ? '유' : '무'}</Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Row.Header>유방암</Table.Row.Header>
          <Table.Data>{bcExmdChrgTypeCd ? '유' : '무'}</Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Row.Header>자궁암</Table.Row.Header>
          <Table.Data>{cvxcaExmdChrgTypeCd ? '유' : '무'}</Table.Data>
        </Table.Row>
      </Table>
    </>
  );
};
