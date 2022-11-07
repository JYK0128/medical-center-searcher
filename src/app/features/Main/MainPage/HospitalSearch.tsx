import { Answer, Form, FormProps, Question } from 'app/components/Content/Form';
import { Title } from 'app/components/Content/Title';
import React from 'react';

type HospitalSearchProps = FormProps;

export const HospitalSearch: React.FC<HospitalSearchProps> = props => {
  return (
    <Form {...props}>
      <Question.Set>
        <Title>지역 선택*</Title>

        <Question htmlFor="sidoList">시/도 선택</Question>
        <Answer.Select id="sidoList" name="siDoCd" />
        <Question htmlFor="sigunguList">시/군/구 선택</Question>
        <Answer.Select id="sigunguList" name="siGunGuCd" />
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
