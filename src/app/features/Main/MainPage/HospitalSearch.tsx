import { Answer, Form, FormProps, Question } from 'app/components/Content/Form';
import { Title } from 'app/components/Content/Title';
import {
  CheckupCodeType,
  HOSPITAL_SERVICE,
  HospitalCodeType,
  SiDoCodeType,
  SiGunGuCodeType
} from 'app/data/api/hospitalAPI';
import React from 'react';

type HospitalSearchProps = FormProps & {
  siDoList: SiDoCodeType[] | undefined;
  siGunGuList: SiGunGuCodeType[] | undefined;
  onSelectSido: React.ReactEventHandler<HTMLSelectElement>;
  onSelectSiGunGu?: React.ReactEventHandler<HTMLSelectElement>;

  hospitalTypeList: HospitalCodeType[] | undefined;
  checkupTypeList: CheckupCodeType[] | undefined;
};

export const HospitalSearch: React.FC<HospitalSearchProps> = props => {
  const {
    siDoList,
    siGunGuList,
    hospitalTypeList,
    checkupTypeList,
    onSelectSido,
    onSelectSiGunGu,
    ...rest
  } = props;

  // handler

  // rendering
  return (
    <Form {...rest}>
      <Question.Set>
        <Title>주소 검색</Title>

        <Question htmlFor="sidoList">시/도</Question>
        <Answer.Select
          id="sidoList"
          name={HOSPITAL_SERVICE.PARAMS.CODE_SIDO.SIDO_CODE}
          onChange={onSelectSido}
        >
          <Answer.Select.Option value="">시/도 선택</Answer.Select.Option>
          {siDoList?.map(sido => (
            <Answer.Select.Option key={sido.siDoCd} value={sido.siDoCd}>
              {sido.siDoNm}
            </Answer.Select.Option>
          ))}
        </Answer.Select>

        <Question htmlFor="sigunguList">시/군/구</Question>
        <Answer.Select
          id="sigunguList"
          name={HOSPITAL_SERVICE.PARAMS.CODE_SIGUNGU.SIGUNGU_CODE}
          onSelect={onSelectSiGunGu}
        >
          <Answer.Select.Option value="">시/군/구 선택</Answer.Select.Option>
          {siGunGuList?.map(siGunGu => (
            <Answer.Select.Option key={siGunGu.siGunGuCd} value={siGunGu.siGunGuCd}>
              {siGunGu.siGunGuNm}
            </Answer.Select.Option>
          ))}
        </Answer.Select>

        <Question htmlFor="address">상세주소</Question>
        <Answer.Input
          type="search"
          id="address"
          name={HOSPITAL_SERVICE.PARAMS.SEARCH_ALL.HOSPITAL_ADDRESS}
          placeholder="주소 입력"
        />
      </Question.Set>

      <Question.Set>
        <Title>병원명 검색</Title>

        <Question htmlFor="hosNmSearch">병원명</Question>
        <Answer.Input
          type="search"
          id="hosNmSearch"
          name={HOSPITAL_SERVICE.PARAMS.SEARCH_ALL.HOSPITAL_NAME}
          placeholder="병원명 입력"
        />
      </Question.Set>

      <Question.Set>
        <Title>상세 검색</Title>

        <Question>의료기관</Question>
        <Answer.Select
          id="hospitalTypeList"
          name={HOSPITAL_SERVICE.PARAMS.SEARCH_ALL.HOSPITAL_CODE}
        >
          <Answer.Select.Option value="">병원규모</Answer.Select.Option>
          {hospitalTypeList?.map(hospitalType => (
            <Answer.Select.Option key={hospitalType.detailCode} value={hospitalType.detailCode}>
              {hospitalType.detailCodeDesc}
            </Answer.Select.Option>
          ))}
        </Answer.Select>

        <Question>검진종류</Question>
        <Answer.Select id="checkuTypeList" name={HOSPITAL_SERVICE.PARAMS.SEARCH_ALL.CHECKUP_CODE}>
          <Answer.Select.Option value="">검사종류</Answer.Select.Option>
          {checkupTypeList?.map(checkupType => (
            <Answer.Select.Option key={checkupType.detailCode} value={checkupType.detailCode}>
              {checkupType.detailCodeDesc}
            </Answer.Select.Option>
          ))}
        </Answer.Select>
      </Question.Set>

      <Form.Submit>검색</Form.Submit>
    </Form>
  );
};
