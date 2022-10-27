import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line unused-imports/no-unused-imports
import styles from './HospitalMap.module.scss';

export type MapGenerator = (mapOptions?: naver.maps.MapOptions) => naver.maps.Map;
type HospitalMapProps = {
  onLoad?: (mapGenerator: MapGenerator) => void;
};

export const HospitalMap: React.FC<HospitalMapProps> = props => {
  const { onLoad } = props;
  const mapElementRef = useRef(null);

  useEffect(() => {
    const NAVER_MAP_API = process.env.REACT_APP_NAVER_MAP_API;
    const NAVER_API_CLIENT = process.env.REACT_APP_NAVER_API_CLIENT;
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', `${NAVER_MAP_API}${NAVER_API_CLIENT}`);

    script.onload = () => {
      const mapGenerator = (mapOptions?: naver.maps.MapOptions) =>
        new naver.maps.Map('map', mapOptions ?? {});
      if (onLoad) onLoad(mapGenerator);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [mapElementRef, onLoad]);

  return <div id="map" className={styles.map} ref={mapElementRef} />;
};
