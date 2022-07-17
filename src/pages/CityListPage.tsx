
import React, { useState, useEffect, useRef, PropsWithChildren, SyntheticEvent, Ref, Fragment } from 'react';
import { Link, Route, Routes, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

/* Hooks */
import useSuggestionList from 'hooks/useSuggestionList'

/* Components */
import BaseInput from 'components/BaseInput';
import BaseContainer from 'components/BaseContainer';
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
