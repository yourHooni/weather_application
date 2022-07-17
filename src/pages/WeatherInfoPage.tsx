
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
    weather: Array<{ description: string, icon: string }>
    main?: {
      temp?: number | string
    }
  }
  weatherDesc?: string
}

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
      <WeatherFragement>
        {
          cityInfo && (
            <Fragment>
              <h2>{cityInfo['name']}</h2>
              <WeatherInfo>
              {
                cityInfo?.weather?.weather && (
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
                )
              }
              </WeatherInfo>
            </Fragment>
          )
        }
      </WeatherFragement>
    </Fragment>
  )
}

export default WeatherInfoPage;