
import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

/* Services */
import { getWeatherDataWithApi } from 'services/weather';

/* Components */
import BaseInput from 'components/BaseInput';
import BaseContainer from 'components/BaseContainer';
import SearchFragment from 'components/SearchFragment';

/* Interfaces */
import { CityListProps, CityProps } from 'interfaces/city';

/* Assets */
import CityListJson from 'assets/constants/city.list.json';

interface CityInfoProps extends CityProps {
  weather?: {
    weather: Array<{ description: string }>
  }
  weatherDesc?: string
}

const WeatherInfo = styled.div`
  flex: 2;
  padding: 20px;
`;

const WeatherInfoPage = () => {
  const { cityID } = useParams();

  /* Stores */
  const [cityInfo, setCityInfo] = useState<CityInfoProps>();

  useEffect(() => {
    const fetchWeatherInfo = async () => {
      const cityList = CityListJson as unknown as CityListProps;
      let _cityInfo = cityList.find((_city: CityProps) => _city['id'].toString() === cityID);
      const result = await getWeatherDataWithApi(cityID as string);
      _cityInfo = {..._cityInfo, weather: result} as CityInfoProps;
      setCityInfo(_cityInfo);
    }

    fetchWeatherInfo();
  }, [cityID]);
  
  return (
    <Fragment>
      <SearchFragment />
      <WeatherInfo>
        {
          cityInfo && (
            <Fragment>
              <div>
                <h3>도시명</h3>
                <h5>{cityInfo['name']}</h5>
              </div>
              {
                cityInfo?.weather?.weather && (
                  cityInfo?.weather?.weather.length > 0 && (
                    <div>
                      <h3>날씨</h3>
                      <h5>{cityInfo?.weather?.weather[0]?.description}</h5>
                    </div>
                  )
                )
              }
            </Fragment>
          )
        }
      </WeatherInfo>
    </Fragment>
  )
}

export default WeatherInfoPage;