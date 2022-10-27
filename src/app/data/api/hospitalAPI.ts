import { EntityState, createEntityAdapter } from '@reduxjs/toolkit';
import { FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import qs from 'qs';
import { REHYDRATE } from 'redux-persist';
import xml2js from 'xml2js';

/** 서비스 정보 */
const HOSPITAL_SEARCH_SERVICE = {
  METADATA: {
    REDUCER_PATH: 'hospitals/search',
    API_PATH: `http://openapi1.nhis.or.kr/openapi/service/rest/HmcSearchService`,
    API_KEY: process.env.REACT_APP_OPEN_DATA_API_KEY
  },
  HOSPITAL_SEARCH: {
    SEARCH_BY_REGION: 'getRegnHmcList',
    SEARCH_BY_TYPE: 'getHchkTypesHmcList',
    SEARCH_BY_Holiday: 'getHolidaysHmcList',
    SEARCH_ALL: 'getHmcList'
  },
  HOSPITAL_INFO: {
    BASIC_INFO: 'getHmcBasicInfoDetail',
    APPOINTMENT_INFO: 'getHchkItemResveInfoDetail',
    TRANSPORTATION_INFO: 'getHmcTransInfoDetail',
    WORKING_HOUR_INFO: 'getWorkHourInfoDetail',
    HOLIDAY_INFO: 'getHolidaysHchkInfoDetail'
  },
  CODE_INFO: {
    SI_DO_CODE: 'getSiDoList',
    GUN_GU_CODE: 'getSiGunGuList',
    HOSPITAL_TYPE_CODE: 'getMedicInstList',
    HOSPITAL_CHECKUP_TYPE_CODE: 'getHchTypeList'
  }
} as const;

const RESPONSE_RESULT_CODE = {
  NORMAL_CODE: '00',
  APPLICATION_ERROR: '01',
  DB_ERROR: '02',
  NODATA_ERROR: '03',
  HTTP_ERROR: '04',
  SERVICETIMEOUT_ERROR: '05',
  INVALID_REQUEST_PARAMETER_ERROR: '10',
  NO_MANDATORY_REQUEST_PARAMETERS_ERROR: '11',
  NO_OPENAPI_SERVICE_ERROR: '12',
  SERVICE_ACCESS_DENIED_ERROR: '20',
  TEMPORARILY_DISABLE_THE_SERVICEKEY_ERROR: '21',
  LIMITED_NUMBER_OF_SERVICE_REQUESTS_EXCEEDS_ERROR: '22',
  SERVICE_KEY_IS_NOT_REGISTERED_ERROR: '30',
  DEADLINE_HAS_EXPIRED_ERROR: '31',
  UNREGISTERED_IP_ERROR: '32',
  UNSIGNED_CALL_ERROR: '33',
  UNKNOWN_ERROR: '99'
} as const;

const RESPONSE_HOSPITAL_SEARCH_ITEM = {
  HOSPITAL_NAME: 'hmcNm',
  HOSPITAL_TYPE: 'ykindnm',
  HOSPITAL_NO: 'hmcNo',
  HOSPITAL_TEL_NUMBER: 'hmcTelNo',

  CHECKUP_CENTER_FAX_NUMBER: 'exmdrFaxNo',
  CHECKUP_CENTER_TEL_NUMBER: 'exmdrTelNo',

  HOSPITAL_SIDO_CODE: 'siDoCd',
  HOSPITAL_GUNGU_CODE: 'siGunGuCd',
  HOSPITAL_ADDRESS: 'locAddr',
  HOSPITAL_POST_NUMBER: 'locPostNo',

  HOSPITAL_COORDS_X: 'cxVl',
  HOSPITAL_COORDS_Y: 'cyVl',

  HAS_NORMAL_CHECKUP: 'grenChrgTypeCd',
  HAS_INFANT_CHECKUP: 'ichkChrgTypeCd',
  HAS_DENTAL_CHECKUP: 'mchkChrgTypeCd',

  HAS_STOMACH_CANCER: 'stmcaExmdChrgTypeCd',
  HAS_LIVER_CANCER: 'lvcaExmdChrgTypeCd',
  HAS_COLORECTAL_CANCER: 'ccExmdChrgTypeCd',
  HAS_BREAST_CANCER: 'bcExmdChrgTypeCd',
  HAS_CERVICAL_CANCER: 'cvxcaExmdChrgTypeCd'
} as const;

/** 병원검색 요청 */
type HospitalSearchRequest = {
  hmcNm: string;
  siDoCd: number;
  siGunGuCd: number;
  locAddr: number;
  hmcFdatCd: number;
  hchType: number;
};
type PagingRequest = {
  numOfRows: number;
  pageNo: number;
};

/** 병원검색 응답 */
type HospitalSearchInfoResponse = {
  header: ResultInfoResponse;
  body: {
    items: { item: [HospitalSearchInfoItem] };
  } & PagingResponse;
};
export type HospitalSearchInfoItem = Record<
  typeof RESPONSE_HOSPITAL_SEARCH_ITEM[keyof typeof RESPONSE_HOSPITAL_SEARCH_ITEM],
  string
>;
type PagingResponse = {
  numOfRows: string;
  pageNo: string;
  totalCount: string;
};
type ResultInfoResponse = {
  resultCode: string;
  resultMsg: string;
};

/** state */
export const hospitalsAdapter = createEntityAdapter<HospitalSearchInfoItem>({
  selectId: item => item.hmcNo,
  sortComparer: (a, b) => a.hmcNo.localeCompare(b.hmcNo)
});

/** api */
export const hospitalSearchApi = createApi({
  reducerPath: HOSPITAL_SEARCH_SERVICE.METADATA.REDUCER_PATH,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ['Hospital'],
  baseQuery: fetchBaseQuery({
    baseUrl: HOSPITAL_SEARCH_SERVICE.METADATA.API_PATH,
    paramsSerializer: params => {
      return qs.stringify({
        ServiceKey: HOSPITAL_SEARCH_SERVICE.METADATA.API_KEY,
        ...params
      });
    }
  }),
  endpoints: builder => ({
    getHmcList: builder.query<
      EntityState<HospitalSearchInfoItem>,
      Partial<PagingRequest & HospitalSearchRequest> | void
    >({
      query: request =>
        ({
          url: HOSPITAL_SEARCH_SERVICE.HOSPITAL_SEARCH.SEARCH_ALL,
          params: { ...request },
          responseHandler: response => {
            return response
              .text()
              .then(xml => xml2js.parseStringPromise(xml, { explicitArray: false }));
          },
          validateStatus: (_, result) => {
            return result.response.header.resultCode === RESPONSE_RESULT_CODE.NORMAL_CODE;
          }
        } as FetchArgs),
      transformResponse: ({ response }: { response: HospitalSearchInfoResponse }) => {
        return hospitalsAdapter.setAll(
          hospitalsAdapter.getInitialState(),
          response.body.items.item
        );
      },
      providesTags: result => {
        return result
          ? [
              { type: 'Hospital', id: 'LIST' },
              ...result.ids.map(id => ({ type: 'Hospital' as const, id }))
            ]
          : [{ type: 'Hospital', id: 'LIST' }];
      }
    })
  })
});
