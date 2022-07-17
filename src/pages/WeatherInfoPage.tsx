
import React, { useState, useEffect, useRef, PropsWithChildren, SyntheticEvent, Fragment } from 'react';
import { Link, Route, Routes, useSearchParams } from 'react-router-dom';

const WeatherInfoPage = () => {
  const [searchParams,] = useSearchParams();
  const city = searchParams.get("city");
  console.log('city', city)

  return (
    <Fragment>
      {
        city && (
          <div></div>
        )
      }
    </Fragment>
  )
}

export default WeatherInfoPage;