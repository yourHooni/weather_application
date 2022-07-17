
import React, { useState, useEffect, useRef, PropsWithChildren, SyntheticEvent, Fragment } from 'react';
import { Link, Route, Routes, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

/* Pages */
import WeatherInfoPage from 'pages/WeatherInfoPage';

/* Components */
import BaseContainer from 'components/BaseContainer';
import SearchFragment from 'components/SearchFragment';

const Title = styled.h1`
  margin-bottom: 30px;
`;

function PageLayout() {
  let [searchParams, setSearchParams] = useSearchParams();
  let city = searchParams.get("city");

  return (
    <BaseContainer
      flex
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      padding={'20px'}
    >
      <Title> Search Weather Data </Title>
      <SearchFragment />
      {
        city && (
          <WeatherInfoPage />
        )
      }
    </BaseContainer>
  );
}
export default PageLayout;