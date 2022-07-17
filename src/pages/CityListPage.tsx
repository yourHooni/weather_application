
import { Fragment } from 'react';

/* Components */
import SearchFragment from 'components/SearchFragment';
import SuggestionFragment from 'components/SuggestionFragment';

const CityListPage = () => {
  return (
    <Fragment>
      <SearchFragment isUseDrop={false} />
      <SuggestionFragment isDropDown={false} />
    </Fragment>
  )
}

export default CityListPage;
