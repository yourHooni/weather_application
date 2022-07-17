import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

/* Pages */
import WeatherInfoPage from 'pages/WeatherInfoPage';
import CityListPage from 'pages/CityListPage';

/* Components */
import BaseContainer from 'components/BaseContainer';

const TheLayout = styled(BaseContainer)``;

function PageLayout() {
  return (
    <TheLayout
      flex
      flexDirection={'column'}
      alignItems={'center'}
      padding={'20px'}
    >
      <h1> Search Weather Data </h1>
      <BaseContainer
        flex
        flexDirection={'column'}
        flexGrow={2}
        flexShrink={2}
        maxHeight={'calc(100% - 28px)'}
      >
        <Routes>
          <Route path="/" element={<CityListPage />} />
          <Route path="/weather/:cityID" element={<WeatherInfoPage />} />
          <Route path="*" element={<div>존재하지 않는 페이지입니다.</div>} />
        </Routes>
      </BaseContainer>
    </TheLayout>
  );
}
export default PageLayout;