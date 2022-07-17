
import React, { useState, useEffect, useRef, PropsWithChildren, SyntheticEvent, Ref } from 'react';
import { Link, Route, Routes, useSearchParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

/* Stores */
import { suggestionListState } from 'stores/city';

/* Components */
import BaseInput from 'components/BaseInput';
import SuggestionFragment from 'components/SuggestionFragment';

/* Interfaces */
import { CityListProps, CityProps } from 'interfaces/city';

/* Assets */
import CityListJson from 'assets/constants/city.list.json';

type SearchFragmentProps = PropsWithChildren<{
  isUseDrop?: boolean
}>

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  max-width: 560px;
  margin: auto;
`;

const Button = styled.button`
  width: 85px;
  margin-left: 5px;
`;

const SearchFragment = ({ isUseDrop=true }: SearchFragmentProps) => {
  
  /* Stores */
  const [, setSuggestionList] = useRecoilState(suggestionListState); // store, suggestion list
  
  /* States */
  const [searchTerm, setSearchTerm] = useState(''); // 검색어
  // const [suggestionList, setSuggestionList] = useState<CityListProps>([]); // 검색 추천 리스트
  const [isOpenSuggestion, SetIsOpenSuggestion] = useState<boolean>(false); // 검색어 추천 오픈 플래그 체크

  useEffect(() => {
    if (isUseDrop && !isOpenSuggestion) {
      SetIsOpenSuggestion(true);
    }
    handleSetSuggestionList(searchTerm);
  }, [searchTerm]);

  const handleClickSuggestion = () => {
    SetIsOpenSuggestion(false);
  };

  // handle change search term
  const onChangeSearchTerm = (e: SyntheticEvent) => {
    const { value } = e.target as HTMLInputElement;
    setSearchTerm(value);
  };

  // 검색어에 대한 리스트 필터링
  const handleSetSuggestionList = (search='') => {
    const searchCase = new RegExp(search, 'gi');
    const newTotalList = [...CityListJson as CityListProps].filter(
        (city: CityProps) => city['name'].match(searchCase)
      );
    setSuggestionList([...newTotalList]);
    // setSuggestionList([...newTotalList].slice(0, MAX_PAGE_COUNT));
  };

  return (
    <SearchContainer>
      <BaseInput 
        id='search_city' 
        onChange={onChangeSearchTerm}
      />
      <Button>최근 검색어</Button>
      {
        isOpenSuggestion && (
          <SuggestionFragment onClickSuggestion={handleClickSuggestion} />
        )
      }
    </SearchContainer>
  )
}

export default SearchFragment;
