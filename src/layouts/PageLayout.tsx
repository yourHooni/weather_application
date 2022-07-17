import styled from 'styled-components';

/* Pages */
import WeatherInfoPage from 'pages/WeatherInfoPage';

/* Components */
import BaseContainer from 'components/BaseContainer';
import SearchFragment from 'components/SearchFragment';

const Title = styled.h1`
  margin-bottom: 20px;
`;

function PageLayout() {
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
      <WeatherInfoPage />
    </BaseContainer>
  );
}
export default PageLayout;