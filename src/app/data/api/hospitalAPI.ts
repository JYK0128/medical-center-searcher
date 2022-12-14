import axios from 'axios';
import qs from 'qs';
/* TODO: https://www.nhis.or.kr/nhis/healthin/retrieveExmdAdminSearch.do */
/* TODO: https://www.nhis.or.kr/nhis/healthin/retrieveExmdAdminVltInfo.do */
/* 서비스 정보 - OPEN API */
const OPEN_API_RESULT_CODE = {
  NORMAL_CODE: '00',
  APPLICATION_ERROR: '01',
  DB_ERROR: '02',
  NODATA_ERROR: '03',
  HTTP_ERROR: '04',
  SERVICE_TIMEOUT_ERROR: '05',
  INVALID_REQUEST_PARAMETER_ERROR: '10',
  NO_MANDATORY_REQUEST_PARAMETERS_ERROR: '11',
  NO_OPEN_API_SERVICE_ERROR: '12',
  SERVICE_ACCESS_DENIED_ERROR: '20',
  TEMPORARILY_DISABLE_THE_SERVICE_KEY_ERROR: '21',
  LIMITED_NUMBER_OF_SERVICE_REQUESTS_EXCEEDS_ERROR: '22',
  SERVICE_KEY_IS_NOT_REGISTERED_ERROR: '30',
  DEADLINE_HAS_EXPIRED_ERROR: '31',
  UNREGISTERED_IP_ERROR: '32',
  UNSIGNED_CALL_ERROR: '33',
  UNKNOWN_ERROR: '99'
} as const;

/* 서비스 정보 - 파라미터 */
const HOSPITAL_SEARCH_CHECKUP_PARAMS = { CHECKUP_CODE: 'hchType' } as const;
const HOSPITAL_SEARCH_NAME_WITH_REGION_PARAMS = {
  HOSPITAL_NAME: 'hmcNm',
  SIDO_CODE: 'siDoCd',
  SIGUNGU_CODE: 'siGunGuCd'
} as const;
const HOSPITAL_SEARCH_ALL_PARAMS = {
  ...HOSPITAL_SEARCH_CHECKUP_PARAMS,
  ...HOSPITAL_SEARCH_NAME_WITH_REGION_PARAMS,
  HOSPITAL_ADDRESS: 'locAddr',
  CHECKUP_CODE: 'hchType',
  HOSPITAL_CODE: 'hmcRdatCd'
} as const;

const HOSPITAL_INFO_PARAMS = { HOSPITAL_ID: 'ykiho' } as const;

const CODE_SIDO_PARAMS = { SIDO_CODE: 'siDoCd', SIDO_NAME: 'siDoNm' } as const;
const CODE_SIGUNGU_PARAMS = {
  SIDO_CODE: 'siDoCd',
  SIGUNGU_CODE: 'siGunGuCd',
  SIGUNGU_NAME: 'siGunGuNm'
} as const;
const CODE_CHECKUP_PARAMS = { CHECKUP_CODE: 'detailCd' } as const;
const CODE_HOSPITAL_PARAMS = { HOSPITAL_CODE: 'detailCd' } as const;

/* 서비스 정보 - 아이템 */
const HOSPITAL_ITEM = {
  HOSPITAL_ID: 'hmcNo',

  HOSPITAL_NAME: 'hmcNm',
  HOSPITAL_TYPE: 'ykindnm',
  HOSPITAL_TEL_NUMBER: 'hmcTelNo',

  CHECKUP_CENTER_FAX_NUMBER: 'exmdrFaxNo',
  CHECKUP_CENTER_TEL_NUMBER: 'exmdrTelNo',

  HOSPITAL_SIDO_CODE: 'siDoCd',
  HOSPITAL_SIGUNGU_CODE: 'siGunGuCd',
  HOSPITAL_ADDRESS: 'locAddr',
  HOSPITAL_POST_NUMBER: 'locPostNo',

  HOSPITAL_COORDS_X: 'cxVl',
  HOSPITAL_COORDS_Y: 'cyVl',

  HAS_CHECKUP_NORMAL: 'grenChrgTypeCd',
  HAS_CHECKUP_INFANT: 'ichkChrgTypeCd',
  HAS_CHECKUP_DENTAL: 'mchkChrgTypeCd',

  HAS_CANCER_STOMACH: 'stmcaExmdChrgTypeCd',
  HAS_CANCER_LIVER: 'lvcaExmdChrgTypeCd',
  HAS_CANCER_COLORECTAL: 'ccExmdChrgTypeCd',
  HAS_CANCER_BREAST: 'bcExmdChrgTypeCd',
  HAS_CANCER_CERVICAL: 'cvxcaExmdChrgTypeCd'
} as const;

const HOSPITAL_BASIC_ITEM = {
  HOSPITAL_ID: 'gjca01Ykiho',

  HOSPITAL_NAME: 'gjca01YoyangNm',
  HOSPITAL_ADDRESS: 'gjca01Addr',
  HOSPITAL_POST_CODE: 'gjca01PostNo',
  HOSPITAL_TEL_NUMBER: 'gjca01TelNo',
  HOSPITAL_REPRESENTATIVE_NAME: 'gjca01ReprNm'
} as const;

const HOSPITAL_RESERVATION_ITEM = {
  HOSPITAL_ID: 'hmcNo',

  CANCER_STOMACH_LAST_DATE: 'stmcaRsvtMagamDt',
  CANCER_LIVER_LAST_DATE: 'lvcaRsvtMagamDt',
  CANCER_COLORECTAL_LAST_DATE: 'ccRsvtMagamDt',
  CANCER_BREAST_LAST_DATE: 'bcRsvtMagamDt',
  CANCER_CERVICAL_LAST_DATE: 'ucRsvtMagamDt',

  INFANT_RESERVE_ALWAYS: 'youngResAlwaysYn',
  INFANT_RESERVE_REQUIRED: 'youngResRequYn',

  INFANT_RESERVE_ALL: 'youngResAllYn',
  INFANT_RESERVE_MONDAY: 'youngResMonYn',
  INFANT_RESERVE_TUESDAY: 'youngResTueYn',
  INFANT_RESERVE_WEDNESDAY: 'youngResWedYn',
  INFANT_RESERVE_THURSDAY: 'youngResThuYn',
  INFANT_RESERVE_FRIDAY: 'youngResFriYn',
  INFANT_RESERVE_SATURDAY: 'youngResSatYn',
  INFANT_RESERVE_SUNDAY: 'youngResSunYn',

  INFANT_RESERVE_TIME_ALL: 'youngResAlldayYn',
  INFANT_RESERVE_TIME_AM: 'youngResAmYn',
  INFANT_RESERVE_TIME_PM: 'youngResPmYn',
  INFANT_RESERVE_TIME_EXTRA: 'youngResEtcYn'
} as const;

const HOSPITAL_TRANSPORTATION_ITEM = {
  HOSPITAL_ID: 'ykiho',
  UPDATE_DATE: 'chgDttm',

  BUILDING_NAME: 'gunmulNm',
  BUILDING_FLOOR: 'gunmulFl',
  BUILDING_HO: 'gunmulHo',
  BUILDING_EXTRA_INFO: 'gunmulEtcInfo',

  PUBLIC_AREA_NAME: 'pubGunmulNm',
  PUBLIC_AREA_DIRECTION: 'pubGunmulYoyangDrt',
  PUBLIC_AREA_DISTANCE: 'pubGunmulYoyangDstc',
  PUBLIC_AREA_EXTRA_INFO: 'pubGunmulYoyangEtcInfo',

  TOWN_BUS_LIST: 'vllgBusRouteInfo',
  TOWN_BUS_LOCATION: 'vllgBusGoffJijumNm',
  TOWN_BUS_DIRECTION: 'vllgBusYoyangDrt',
  TOWN_BUS_DISTANCE: 'vllgBusYoyangDstc',
  TOWN_BUS_EXTRA_INFO: 'vllgBusEtcInfo',

  CITY_BUS_LIST: 'inctBusRouteInfo',
  CITY_BUS_LOCATION: 'inctBusGoffJijumNm',
  CITY_BUS_DIRECTION: 'inctBusYoyangDrt',
  CITY_BUS_DISTANCE: 'inctBusYoyangDstc',
  CITY_BUS_EXTRA_INFO: 'inctBusEtcInfo',

  INTRA_BUS_LIST: 'otctBusRouteInfo',
  INTRA_BUS_LOCATION: 'otctBusGoffJijumNm',
  INTRA_BUS_DIRECTION: 'otctBusYoyangDrt',
  INTRA_BUS_DISTANCE: 'otctBusYoyangDstc',
  INTRA_BUS_EXTRA_INFO: 'otctBusEtcInfo',

  AIRPORT_BUS_LIST: 'arptBusRouteInfo',
  AIRPORT_BUS_LOCATION: 'arptBusGoffJijumNm',
  AIRPORT_BUS_DIRECTION: 'arptBusYoyangDrt',
  AIRPORT_BUS_DISTANCE: 'arptBusYoyangDstc',
  AIRPORT_BUS_EXTRA_INFO: 'arptBusEtcInfo',

  SUBWAY_LIST: 'sbwyRouteInfo',
  SUBWAY_LOCATION: 'sbwyGoffJijumNm',
  SUBWAY_DIRECTION: 'sbwyYoyangDrt',
  SUBWAY_DISTANCE: 'sbwyYoyangDstc',
  SUBWAY_EXTRA_INFO: 'sbwyYoyangEtcInfo'
} as const;

const HOSPITAL_WORKHOUR_ITEM = {
  HOSPITAL_ID: 'ykiho',

  TEL_URL: 'telNoGuidUrl',
  CARE_URL: 'mcrtmGuidUrlExs',
  RESERVE_URL: 'mcrtmGuidUrl',

  HOSPITAL_TEL_NUMBER: 'telNo1',
  CHECKUP_CENTER_TEL_NUMBER: 'telNo2',
  RESERVATION_TEL_NUMBER: 'mcareRsvtTelNo1',

  IS_RESERVE_SERVICE: 'mcareRsvtYn',
  IS_PARKING_SERVICE: 'pkglotRunYn',
  IS_EMERGENCY_SERVICE: 'wekEmgrmRunYn',
  IS_LUNCH_CARE_SERVICE: 'luntmMcareYn',

  IS_IRRIGAR_CLOSED: 'irrgSusmdtExs',
  IS_HOLIDAY_CLOSED: 'hldAllSusmdtYn',

  WEEK_MONDAY: 'wkdaySusmdtYn1',
  WEEK_TUESDAY: 'wkdaySusmdtYn2',
  WEEK_WEDNESDAY: 'wkdaySusmdtYn3',
  WEEK_THURSDAY: 'wkdaySusmdtYn4',
  WEEK_FRIDAY: 'wkdaySusmdtYn5',

  WEEKDAY_CARE_START: 'wkdayMcareFrTm',
  WEEKDAY_CARE_END: 'wkdayMcareToTm',
  WEEKDAY_RESERVE_START: 'wkdayMcareFrTm',
  WEEKDAY_ESERVE_END: 'wkdayMcareToTm',
  WEEKDAY_LEANCH_START: 'wkdayMcareFrTm',
  WEEKDAY_LEANCH_END: 'wkdayMcareToTm',

  SATURDAY_FIRST_WEEK: 'satSusmdtYn1',
  SATURDAY_SECOND_WEEK: 'satSusmdtYn2',
  SATURDAY_THIRD_WEEK: 'satSusmdtYn3',
  SATURDAY_FORTH_WEEK: 'satSusmdtYn4',
  SATURDAY_FIFTH_WEEK: 'satSusmdtYn5',

  SATURDAY_CARE_START: 'wkdayMcareFrTm',
  SATURDAY_CARE_END: 'wkdayMcareToTm',
  SATURDAY_RESERVE_START: 'wkdayMcareFrTm',
  SATURDAY_ESERVE_END: 'wkdayMcareToTm',
  SATURDAY_LEANCH_START: 'wkdayMcareFrTm',
  SATURDAY_LEANCH_END: 'wkdayMcareToTm',

  SUNDAY_FIRST_WEEK: 'satSusmdtYn1',
  SUNDAY_SECOND_WEEK: 'satSusmdtYn2',
  SUNDAY_THIRD_WEEK: 'satSusmdtYn3',
  SUNDAY_FORTH_WEEK: 'satSusmdtYn4',
  SUNDAY_FIFTH_WEEK: 'satSusmdtYn5',

  SUNDAY_CARE_START: 'wkdayMcareFrTm',
  SUNDAY_CARE_END: 'wkdayMcareToTm',
  SUNDAY_RESERVE_START: 'wkdayMcareFrTm',
  SUNDAY_ESERVE_END: 'wkdayMcareToTm',
  SUNDAY_LEANCH_START: 'wkdayMcareFrTm',
  SUNDAY_LEANCH_END: 'wkdayMcareToTm',

  PARKING_AMOUNT: 'pkgPsblCnt',
  PARKING_IS_RUN: 'pkglotRunYn',
  PARKING_IS_CHARGING: 'pkgCostBrdnYn',
  PARKING_EXTRA_INFO: 'pkgEtcComt'
} as const;

const HOSPITAL_HOLIDAY_ITEM = {
  NORMAL_CHECKUP_FIRST_WEEK: 'ilban_1',
  NORMAL_CHECKUP_SECOND_WEEK: 'ilban_2',
  NORMAL_CHECKUP_THIRD_WEEK: 'ilban_3',
  NORMAL_CHECKUP_FORTH_WEEK: 'ilban_4',
  NORMAL_CHECKUP_FIFTH_WEEK: 'ilban_5',

  INFANT_CHECKUP_FIRST_WEEK: 'young_1',
  INFANT_CHECKUP_SECOND_WEEK: 'young_2',
  INFANT_CHECKUP_THIRD_WEEK: 'young_3',
  INFANT_CHECKUP_FORTH_WEEK: 'young_4',
  INFANT_CHECKUP_FIFTH_WEEK: 'young_5',

  DENTAL_CHECKUP_FIRST_WEEK: 'gugang_1',
  DENTAL_CHECKUP_SECOND_WEEK: 'gugang_2',
  DENTAL_CHECKUP_THIRD_WEEK: 'gugang_3',
  DENTAL_CHECKUP_FORTH_WEEK: 'gugang_4',
  DENTAL_CHECKUP_FIFTH_WEEK: 'gugang_5',

  STOMACH_CANCER_FIRST_WEEK: 'wi_1',
  STOMACH_CANCER_SECOND_WEEK: 'wi_2',
  STOMACH_CANCER_THIRD_WEEK: 'wi_3',
  STOMACH_CANCER_FORTH_WEEK: 'wi_4',
  STOMACH_CANCER_FIFTH_WEEK: 'wi_5',

  LIVER_CANCER_FIRST_WEEK: 'gan_1',
  LIVER_CANCER_SECOND_WEEK: 'gan_2',
  LIVER_CANCER_THIRD_WEEK: 'gan_3',
  LIVER_CANCER_FORTH_WEEK: 'gan_4',
  LIVER_CANCER_FIFTH_WEEK: 'gan_5',

  COLORECTAL_CANCER_FIRST_WEEK: 'dae_1',
  COLORECTAL_CANCER_SECOND_WEEK: 'dae_2',
  COLORECTAL_CANCER_THIRD_WEEK: 'dae_3',
  COLORECTAL_CANCER_FORTH_WEEK: 'dae_4',
  COLORECTAL_CANCER_FIFTH_WEEK: 'dae_5',

  BREAST_CANCER_FIRST_WEEK: 'you_1',
  BREAST_CANCER_SECOND_WEEK: 'you_2',
  BREAST_CANCER_THIRD_WEEK: 'you_3',
  BREAST_CANCER_FORTH_WEEK: 'you_4',
  BREAST_CANCER_FIFTH_WEEK: 'you_5',

  CERVICAL_CANCER_FIRST_WEEK: 'jagung_1',
  CERVICAL_CANCER_SECOND_WEEK: 'jagung_2',
  CERVICAL_CANCER_THIRD_WEEK: 'jagung_3',
  CERVICAL_CANCER_FORTH_WEEK: 'jagung_4',
  CERVICAL_CANCER_FIFTH_WEEK: 'jagung_5'
} as const;

/* 서비스 정보 - 코드 */
const CODE_SIDO_ITEM = { CODE: 'siDoCd', NAME: 'siDoNm' } as const;
const CODE_SI_GUNGU_ITEM = {
  SIDO_CODE: 'siDoCd',
  SI_GUNGU_CODE: 'siGunGuCd',
  SI_GUNGU_NAME: 'siGunGuNm'
} as const;
const CODE_DEFAULT_TYPE_ITEM = { CODE: 'detailCode', NAME: 'detailCodeDesc' } as const;

/* 서비스 */
export const HOSPITAL_SERVICE = {
  METADATA: {
    NAME: 'hospital',
    KEY: process.env.REACT_APP_OPEN_DATA_API_KEY,
    PATH: `http://openapi1.nhis.or.kr/openapi/service/rest`
  },
  SERVICE: {
    SEARCH_ALL: 'HmcSearchService/getHmcList',
    SEARCH_REGION: 'HmcSearchService/getRegnHmcList',
    SEARCH_CHECKUP: 'HmcSearchService/getHchkTypesHmcList',
    SEARCH_HOLIDAY: 'HmcSearchService/getHolidaysHmcList',

    INFO_BASIC: 'HmcSpecificInfoService/getHmcBasicInfoDetail',
    INFO_RESERVATION: 'HmcSpecificInfoService/getHchkItemResveInfoDetail',
    INFO_TRANSPORTATION: 'HmcSpecificInfoService/getHmcTransInfoDetail',
    INFO_WORKHOUR: 'HmcSpecificInfoService/getWorkHourInfoDetail',
    INFO_HOLIDAY: 'HmcSpecificInfoService/getHolidaysHchkInfoDetail',

    CODE_SIDO_LIST: 'CodeService/getSiDoList',
    CODE_SIGUNGU_LIST: 'CodeService/getSiGunGuList',
    CODE_CHECKUP_LIST: 'CodeService/getHchTypeList',
    CODE_HOSPITAL_LIST: 'CodeService/getMedicInstList'
  },
  PARAMS: {
    SEARCH_ALL: HOSPITAL_SEARCH_ALL_PARAMS,
    SEARCH_CHECKUP: HOSPITAL_SEARCH_CHECKUP_PARAMS,
    SEARCH_REGION: HOSPITAL_SEARCH_NAME_WITH_REGION_PARAMS,
    SEARCH_HOLIDAY: HOSPITAL_SEARCH_NAME_WITH_REGION_PARAMS,

    INFO_BASIC: HOSPITAL_INFO_PARAMS,
    INFO_RESERVATION: HOSPITAL_INFO_PARAMS,
    INFO_TRANSPORTATION: HOSPITAL_INFO_PARAMS,
    INFO_WORKHOUR: HOSPITAL_INFO_PARAMS,
    INFO_HOLIDAY: HOSPITAL_INFO_PARAMS,

    CODE_SIDO: CODE_SIDO_PARAMS,
    CODE_SIGUNGU: CODE_SIGUNGU_PARAMS,
    CODE_CHECKUP_LIST: CODE_CHECKUP_PARAMS,
    CODE_HOSPITAL_Type: CODE_HOSPITAL_PARAMS
  },
  ITEM: {
    SEARCH_ALL: HOSPITAL_ITEM,
    SEARCH_REGION: HOSPITAL_ITEM,
    SEARCH_CHECKUP: HOSPITAL_ITEM,
    SEARCH_HOLIDAY: HOSPITAL_ITEM,

    INFO_BASIC: HOSPITAL_BASIC_ITEM,
    INFO_RESERVATION: HOSPITAL_RESERVATION_ITEM,
    INFO_TRANSPORTATION: HOSPITAL_TRANSPORTATION_ITEM,
    INFO_WORKHOUR: HOSPITAL_WORKHOUR_ITEM,
    INFO_HOLIDAY: HOSPITAL_HOLIDAY_ITEM,

    CODE_SIDO_LIST: CODE_SIDO_ITEM,
    CODE_SI_GUNGU_LIST: CODE_SI_GUNGU_ITEM,
    CODE_CHECKUP_LIST: CODE_DEFAULT_TYPE_ITEM,
    CODE_HOSPITAL_LIST: CODE_DEFAULT_TYPE_ITEM
  }
} as const;

/** 타입정보 - 요청 */
type HospitalSearchRequestType = Record<
  typeof HOSPITAL_SEARCH_ALL_PARAMS[keyof typeof HOSPITAL_SEARCH_ALL_PARAMS],
  string
>;
type PagingRequestType = {
  numOfRows: number;
  pageNo: number;
};
type SiGunGuRequestType = Pick<SiGunGuCodeType, 'siDoCd'>;

/** 타입정보 - 응답 */
type PagingResponseType = PagingRequestType & {
  totalCount: number;
};
type PaginationResponse<T> = {
  result: T;
  page: PagingResponseType;
};

export type HospitalItemType = Record<typeof HOSPITAL_ITEM[keyof typeof HOSPITAL_ITEM], string>;
export type SiDoCodeType = Record<typeof CODE_SIDO_ITEM[keyof typeof CODE_SIDO_ITEM], string>;
export type SiGunGuCodeType = Record<
  typeof CODE_SI_GUNGU_ITEM[keyof typeof CODE_SI_GUNGU_ITEM],
  string
>;
export type HospitalCodeType = Record<
  typeof CODE_DEFAULT_TYPE_ITEM[keyof typeof CODE_DEFAULT_TYPE_ITEM],
  string
>;
export type CheckupCodeType = Record<
  typeof CODE_DEFAULT_TYPE_ITEM[keyof typeof CODE_DEFAULT_TYPE_ITEM],
  string
>;

/* api */
export const hospitalApi = axios.create({
  method: 'GET',
  baseURL: HOSPITAL_SERVICE.METADATA.PATH,
  timeout: 4000,
  paramsSerializer: {
    serialize: params => {
      return qs.stringify({
        serviceKey: `${HOSPITAL_SERVICE.METADATA.KEY}`,
        ...params
      });
    }
  },

  // xmlResponse transition
  responseType: 'json',
  // json transition option
  transitional: {
    silentJSONParsing: false,
    forcedJSONParsing: false,
    clarifyTimeoutError: true
  },
  // xmlResponse -> axiosResponse
  transformResponse: [data => JSON.parse(data)]
});

// axiosResponse interceptors
hospitalApi.interceptors.response.use(
  response => {
    if (response.headers['content-type']?.includes('text/xml')) {
      return Promise.reject(new Error('no json transition'));
    }
    if (response.data.response.header.resultCode !== OPEN_API_RESULT_CODE['NORMAL_CODE']) {
      return Promise.reject(new Error(response.data.response.header.CodeResult));
    }
    if (!response.data.response.body.items) {
      return Promise.reject(new Error('no items'));
    }

    if (Array.isArray(response.data.response.body.items.item)) {
      response.data = {
        result: response.data.response.body.items.item,
        page: {
          numOfRows: response.data.response.body.numOfRows,
          pageNo: response.data.response.body.pageNo,
          totalCount: response.data.response.body.totalCount
        }
      };
    } else {
      response.data = {
        result: [response.data.response.body.items.item],
        page: {
          numOfRows: response.data.response.body.numOfRows,
          pageNo: response.data.response.body.pageNo,
          totalCount: response.data.response.body.totalCount
        }
      };
    }
    return response;
  },
  error => Promise.reject(error)
);

// axios for react query
export const fetchHospital = (
  params: Pick<HospitalSearchRequestType, 'hmcNm'>
): Promise<HospitalItemType> => {
  if (!params.hmcNm) {
    throw new Error('no search hmcNm');
  }
  return hospitalApi.get(HOSPITAL_SERVICE.SERVICE.SEARCH_ALL, { params }).then(res => {
    if (Array.isArray(res.data.result) && res.data.result.length !== 1) {
      throw new Error('no result or more result');
    }
    return res.data.result[0];
  });
};

export const fetchHospitals = (
  params?: Partial<HospitalSearchRequestType & PagingRequestType>
): Promise<PaginationResponse<HospitalItemType[]>> => {
  if (params) {
    params = Object.fromEntries(Object.entries(params).filter(([, val]) => val !== ''));
  }
  return hospitalApi.get(HOSPITAL_SERVICE.SERVICE.SEARCH_ALL, { params }).then(res => res.data);
};
export const fetchSidoList = (): Promise<SiDoCodeType[]> => {
  return hospitalApi
    .get(HOSPITAL_SERVICE.SERVICE.CODE_SIDO_LIST, {
      params: { numOfRows: 500 }
    })
    .then(res => res.data.result);
};
export const fetchSiGunGuList = (params: SiGunGuRequestType): Promise<SiGunGuCodeType[]> => {
  return hospitalApi
    .get(HOSPITAL_SERVICE.SERVICE.CODE_SIGUNGU_LIST, {
      params: { ...params, numOfRows: 500 }
    })
    .then(res => res.data.result);
};
export const fetchHospitalTypeList = (): Promise<HospitalCodeType[]> => {
  return hospitalApi
    .get(HOSPITAL_SERVICE.SERVICE.CODE_HOSPITAL_LIST, {
      params: { numOfRows: 500 }
    })
    .then(res => res.data.result);
};
export const fetchCheckupTypeList = (): Promise<CheckupCodeType[]> => {
  return hospitalApi
    .get(HOSPITAL_SERVICE.SERVICE.CODE_CHECKUP_LIST, {
      params: { numOfRows: 500 }
    })
    .then(res => res.data.result);
};
