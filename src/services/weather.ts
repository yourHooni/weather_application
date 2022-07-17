const url = `${process.env.REACT_APP_WEATHER_BASE_URL}/weather`;

export const getWeatherDataWithApi = async (cityID: string) => {
  const _url = `${url}?id=${cityID}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
  
  const response = await fetch(_url);
  if (response.ok) {
    const result = await response.json();
    return result;
  } else {
    return;
  }
};