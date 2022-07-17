
import React, { useState, useEffect, useRef, PropsWithChildren, SyntheticEvent, Fragment } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';

const WeatherInfoPage = () => {
  const { city } = useParams();
  console.log('city', city)

  return (
    <Fragment>
      {
        city && (
          <div>{city}</div>
        )
      }
    </Fragment>
  )
}

export default WeatherInfoPage;