import { Answer, Form, FormProps, Question } from 'app/components/Content/Form';
import { Title } from 'app/components/Content/Title';
import { HOSPITAL_SERVICE, SiDoCodeType, SiGunGuCodeType } from 'app/data/api/hospitalAPI';
import React, { SyntheticEvent } from 'react';

type HospitalSearchProps = FormProps & {
  siDoList: SiDoCodeType[] | undefined;
  siGunGuList: SiGunGuCodeType[] | undefined;
  onSelectSido: (e: SyntheticEvent<HTMLSelectElement>) => void;
  onSelectSiGunGu?: (e: SyntheticEvent<HTMLSelectElement>) => void;
};

export const HospitalSearch: React.FC<HospitalSearchProps> = props => {
  const { siDoList, siGunGuList, onSelectSido, onSelectSiGunGu, ...rest } = props;

  // handler
  const handleSido = (e: SyntheticEvent<HTMLSelectElement>) => {
    onSelectSido(e);
  };
  const handleSiGunGu = (e: SyntheticEvent<HTMLSelectElement>) => {
    if (onSelectSiGunGu) {
      onSelectSiGunGu(e);
    }
  };

  // rendering
  return (
    <Form {...rest}>
      <Question.Set>
        <Title>지역 선택*</Title>

        <Question htmlFor="sidoList">시/도 선택</Question>
        <Answer.Select
          id="sidoList"
          name={HOSPITAL_SERVICE.PARAMS.CODE_SIDO.SIDO_CODE}
          onChange={handleSido}
        >
          <Answer.Select.Option value="">시/도</Answer.Select.Option>
          {siDoList?.map(sido => (
            <Answer.Select.Option key={sido.siDoCd} value={sido.siDoCd}>
              {sido.siDoNm}
            </Answer.Select.Option>
          ))}
        </Answer.Select>
        <Question htmlFor="sigunguList">시/군/구 선택</Question>
        <Answer.Select
          id="sigunguList"
          name={HOSPITAL_SERVICE.PARAMS.CODE_SIGUNGU.SIGUNGU_CODE}
          onSelect={handleSiGunGu}
        >
          <Answer.Select.Option value="">시/군/구</Answer.Select.Option>
          {siGunGuList?.map(siGunGu => (
            <Answer.Select.Option key={siGunGu.siGunGuCd} value={siGunGu.siGunGuCd}>
              {siGunGu.siGunGuNm}
            </Answer.Select.Option>
          ))}
        </Answer.Select>
      </Question.Set>

      <Question.Set>
        <Title>기본 검색</Title>

        <Question htmlFor="hosNmSearch">병원명</Question>
        <Answer.Input type="search" id="hosNmSearch" name="hmcNm" placeholder="병원명 입력" />
      </Question.Set>

      <Question.Set>
        <Title>상세 검색</Title>

        <Title.Sub>의료기관</Title.Sub>
        <Answer>
          <Answer.CheckBox name="hi">test1</Answer.CheckBox>
        </Answer>

        <Title.Sub>검진종류</Title.Sub>
        <Answer>
          <Answer.CheckBox name="hi">test2</Answer.CheckBox>
        </Answer>
      </Question.Set>

      <Form.Submit>검색</Form.Submit>
    </Form>
  );
};
