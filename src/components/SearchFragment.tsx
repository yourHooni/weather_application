
import { useState, useEffect, PropsWithChildren, SyntheticEvent } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

/* Stores */
import { suggestionListState, searchStatusState } from 'stores/city';

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
  const [searchStatus, setSearchStatus] = useRecoilState(searchStatusState); // store, search status

  /* States */
  const [searchTerm, setSearchTerm] = useState(''); // 검색어
  const [isOpenSuggestion, SetIsOpenSuggestion] = useState<boolean>(false); // 검색어 추천 오픈 플래그 체크

  useEffect(() => {
    if (isUseDrop) {
      if (searchStatus==='suggestion' && !searchTerm) {
        SetIsOpenSuggestion(false);
        return;
      }
      SetIsOpenSuggestion(true);
    }
    handleSetSuggestionList(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (searchStatus === 'history') {
      if (isUseDrop) {
        SetIsOpenSuggestion(true);
      }
    } else {
      SetIsOpenSuggestion(false);
    }
  }, [searchStatus]);

  const handleClickSuggestion = () => {
    if (searchStatus==='suggestion') {
      SetIsOpenSuggestion(false);
    } else {
      setSearchStatus('suggestion');
    }
  };

  // handle change search term
  const onChangeSearchTerm = (e: SyntheticEvent) => {
    const { value } = e.target as HTMLInputElement;
    setSearchTerm(value);
  };

  // 검색어에 대한 리스트 필터링
  const handleSetSuggestionList = (search='') => {
    const searchCase = new RegExp(search, 'gi');
    const cityList = CityListJson as unknown as CityListProps;
    const newTotalList = [...cityList].filter(
        (city: CityProps) => city['name'].match(searchCase)
      );
    setSuggestionList([...newTotalList]);
  };

  // 검색 상태 변경
  const handleChangeSearchStatus = () => {
    if (searchStatus === 'suggestion') {
      setSearchStatus('history');
    } else {
      setSearchStatus('suggestion');
    }
  };

  return (
    <SearchContainer>
      <BaseInput 
        id='search_city' 
        onChange={onChangeSearchTerm}
        disabled={searchStatus === 'history'}
      />
      <Button onClick={handleChangeSearchStatus}>
        {
          searchStatus === 'suggestion' ? '최근 검색' : '검색'
        }
      </Button>
      {
        isOpenSuggestion && (
          <SuggestionFragment onClickSuggestion={handleClickSuggestion} />
        )
      }
    </SearchContainer>
  )
}

export default SearchFragment;
