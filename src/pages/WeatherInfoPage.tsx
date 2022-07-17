import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';

const WeatherInfoPage = ({ city }: any) => {
  return (
    <div>
      { city.toString() }
    </div>
  )
}

export default WeatherInfoPage;