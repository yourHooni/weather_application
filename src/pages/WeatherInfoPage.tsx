
import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

/* Services */
import { getWeatherDataWithApi } from 'services/weather';

/* Components */
import BaseContainer from 'components/BaseContainer';
import SearchFragment from 'components/SearchFragment';

/* Interfaces */
import { CityListProps, CityProps } from 'interfaces/city';

/* Assets */
import CityListJson from 'assets/constants/city.list.json';

const WeatherInfoPage = () => {
  const { cityID } = useParams();

  /* Stores */
  const [cityInfo, setCityInfo] = useState<CityInfoProps>();

  /* UseEffects */
  useEffect(() => {
    const fetchWeatherInfo = async () => {
      const cityList = CityListJson as unknown as CityListProps;
      let _cityInfo = cityList.find((_city: CityProps) => _city['id'].toString() === cityID);
      if (!_cityInfo) return;

      const result = await getWeatherDataWithApi(cityID as string);
      _cityInfo = {..._cityInfo, weather: result} as CityInfoProps;
      setCityInfo(_cityInfo);
    }

    fetchWeatherInfo();
  }, [cityID]);
  
  return (
    <Fragment>
      <SearchFragment />
      <WeatherFragement>
        {
          cityInfo ? (
            <Fragment>
              <h2>{cityInfo['name']}</h2>
              <WeatherInfo>
              {
                cityInfo?.weather?.weather ? (
                  cityInfo?.weather?.weather.length > 0 && (
                    <div>
                      <h3>날씨</h3>
                      <WeatherIcon alt={cityInfo?.weather?.weather[0]?.icon} src={`http://openweathermap.org/img/w/${cityInfo?.weather?.weather[0]?.icon}.png`} />
                      <h5>{cityInfo?.weather?.weather[0]?.description}</h5>
                      {
                        cityInfo?.weather?.main && (
                          <h5>{Math.floor(cityInfo?.weather?.main?.temp as number).toString()} &#8457;</h5>
                        )
                      }
                    </div>
                  )
                ) : (
                  <div>날씨정보를 찾을 수 없습니다.</div>
                )
              }
              </WeatherInfo>
            </Fragment>
          ) : (
            <div>존재하지 않는 도시정보입니다.</div>
          )
        }
      </WeatherFragement>
    </Fragment>
  )
}

/* Interfaces */
interface CityInfoProps extends CityProps {
  weather?: {
    weather: Array<{ description: string, icon: string }>
    main?: {
      temp?: number | string
    }
  }
  weatherDesc?: string
}

/* Styles */
const WeatherFragement = styled(BaseContainer)`
  flex: 2;
  margin-top: 170px;
  text-align: center;
}
`;
const WeatherInfo = styled.div`
  padding: 20px;
`;
const WeatherIcon = styled.img`
  width: 100px;
`;

export default WeatherInfoPage;