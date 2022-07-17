
import React, { useState, useEffect, useRef, PropsWithChildren, SyntheticEvent } from 'react';
import { Link, Route, Routes, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

/* Components */
import BaseInput from 'components/BaseInput';

/* Assets */
import CityListJson from 'assets/constants/city.list.json';
interface CityProps {
  id: string,
  name: string,
  state?: string,
  country: string,
  coord?: object
};

type CityListProps = Array<CityProps>;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 560px;
`;

const SuggestionFragment = styled.div`
  position: absolute; 
  width: 100%;
  max-height: 200px;
  border-radius: 3px;
  box-shadow: 0 3px 8px #00bcd4;
  z-index: 999;
  overflow: auto;
`;

const Suggestion = styled.div`
  padding: 10px;
  cursor: pointer;
  
  &:hover {
    background: #00bcd447;
  }
`;

const Loading = styled.div`
  height: 100px;

  @keyframes spinner {
    from {transform: rotate(0deg); }
    to {transform: rotate(360deg);}
  }

  &::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 64px;
    height: 64px;
    margin-top: -32px;
    margin-left: -32px;
    border-radius: 50%;
    border: 4px solid lightgrey;
    border-top-color: #00bcd4;
    animation: spinner .8s linear infinite;
  }
`
const SearchFragment = () => {
  const [, setSearchParams] = useSearchParams(); // search param

  /* States */
  const [searchTerm, setSearchTerm] = useState(''); // 검색어
  const [suggestionList, setSuggestionList] = useState<CityListProps>([]); // 검색 추천 리스트
  const [isOpenSuggestion, SetIsOpenSuggestion] = useState<boolean>(false); // 검색어 추천 오픈 플래그 체크

  useEffect(() => {
    if (!searchTerm) {
      setSuggestionList([]);
      SetIsOpenSuggestion(false);
      return;
    }
    if (!isOpenSuggestion) {
      SetIsOpenSuggestion(true);
    }
    handleSearchCity();
  }, [searchTerm]);

  const handleSearchCity = () => {
    const searchCase = new RegExp(searchTerm, 'gi');
    const newSuggestionList = [...CityListJson as CityListProps].filter(
        (city: CityProps) => city['name'].match(searchCase)
      );
    setSuggestionList(newSuggestionList);
    if (!(newSuggestionList.length > 0)) {
      SetIsOpenSuggestion(false);
    }
  }

  const handleClickSuggestion = (city: CityProps) => {
    setSearchParams({ city: city['id'] });
    setSuggestionList([]);
    SetIsOpenSuggestion(false);
  };

  // handle change search term
  const onChangeSearchTerm = (e: SyntheticEvent) => {
    const { value } = e.target as HTMLInputElement;
    setSearchTerm(value);
  };

  return (
    <SearchContainer>
      <BaseInput 
        id='search_city' 
        onChange={onChangeSearchTerm}
      />
      {
        isOpenSuggestion && (
          <SuggestionFragment>
            {
              suggestionList && (
                suggestionList.length > 0 ? (
                  <ul>
                    {
                      suggestionList.map((suggestion: CityProps, index: number) => (
                        <li key={index} onClick={() => handleClickSuggestion(suggestion)}>
                          <Suggestion>
                            { suggestion['name'] }
                          </Suggestion>
                        </li>
                      ))
                    }
                  </ul>
                ) : (
                  <Loading />
                )
              )
            }
          </SuggestionFragment>
        )
      }
    </SearchContainer>
  )
}

export default SearchFragment;
