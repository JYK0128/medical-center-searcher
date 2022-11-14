import React, { ComponentPropsWithoutRef, useEffect, useRef } from 'react';

export type MapGenerator = (mapOptions?: naver.maps.MapOptions) => naver.maps.Map;

type NaverMapProps = {
  onLoad: (mapGenerator: MapGenerator) => void;
} & Omit<ComponentPropsWithoutRef<'div'>, 'onLoad'>;

export const NaverMap: React.FC<NaverMapProps> = props => {
  const { onLoad, id: componentId, ...rest } = props;
  const mapElementRef = useRef(null);
  const id = componentId ?? 'map';

  useEffect(() => {
    const NAVER_MAP_API = process.env.REACT_APP_NAVER_MAP_API;
    const NAVER_API_CLIENT = process.env.REACT_APP_NAVER_API_CLIENT;

    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', `${NAVER_MAP_API}${NAVER_API_CLIENT}`);

    script.onload = () => {
      const mapGenerator = (mapOptions?: naver.maps.MapOptions) =>
        new naver.maps.Map(id, mapOptions ?? {});
      onLoad(mapGenerator);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [id, mapElementRef, onLoad]);

  return <div id={id} ref={mapElementRef} {...rest} />;
};
