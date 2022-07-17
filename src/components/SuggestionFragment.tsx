
import React, { useState, useEffect, useRef, PropsWithChildren, SyntheticEvent, Ref, useCallback } from 'react';
import { Link, Route, Routes, useSearchParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';

/* Stores */
import { suggestionListState } from 'stores/city';

/* Components */
import BaseInput from 'components/BaseInput';

/* Interfaces */
import { CityListProps, CityProps } from 'interfaces/city';

type SuggestionFragmentProps = PropsWithChildren<{
  isDropDown?: boolean
  onClickSuggestion?: () => void
}>

const SuggestionContainer = styled.div<{
  dropdownStyle?: boolean
}>`
  width: 100%;
  height: 100%;
  border-radius: 3px;
  box-shadow: 0 3px 8px #00bcd4;
  margin-top: 10px;
  overflow: auto;

  ${({ dropdownStyle }) =>
  dropdownStyle &&
    css`
      position: absolute; 
      max-height: 200px;
      margin-top: 0;
      z-index: 999;
    `};
`;

const Suggestion = styled.div`
  padding: 10px;
  cursor: pointer;
  
  &:hover {
    background: #00bcd447;
  }
`;

const Button = styled.button`
  width: 85px;
  margin-left: 5px;
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

const MAX_PAGE_COUNT = 500; // 한 페이지에 포함된 제품 개수

const SuggestionFragment = ({ isDropDown=true, onClickSuggestion }: SuggestionFragmentProps) => {
    
  const [, setSearchParams] = useSearchParams();

/* Stores */
const [suggestionList,] = useRecoilState(suggestionListState); // store, suggestion list

  const target = useRef<HTMLDivElement>(null);

  const [currentList, setCurrentList] = useState<CityListProps>([]); // 현재 리스트
  const [page, setPage] = useState(0); // 현재 페이지

  useEffect(() => {
    handleInitialize();
  }, [suggestionList]);
  
  /* Events */
  // 초기화
  const handleInitialize = () => {
    const newSuggestionList = [...suggestionList].slice(0, MAX_PAGE_COUNT)
    setCurrentList([...newSuggestionList]);
    setPage(1);
  };

  // 다음 페이지 리스트 추가 ( 마지막 페이지일 경우 return false, else true )
  const handlePageNation = () => {
    const newSuggestionList = [...suggestionList].slice((page) * MAX_PAGE_COUNT, (page + 1) * MAX_PAGE_COUNT)
    setCurrentList([...currentList].concat(newSuggestionList));
    setPage(page + 1);
  };

  const handleClickSuggestion = (city: CityProps) => {
    if (onClickSuggestion) onClickSuggestion();
    setSearchParams({ city: city['id'] });
  };

  const onScroll = () => {
    if (!target.current) return;
    if (suggestionList.length <= page * MAX_PAGE_COUNT) return;
    const { scrollTop, scrollHeight } = target.current;
    if (scrollTop > (scrollHeight - scrollHeight/10)) {
      handlePageNation();
    }
  };

  return (
    <SuggestionContainer dropdownStyle={isDropDown} onScroll={onScroll} ref={target}>
      {
        currentList && (
          currentList.length > 0 ? (
            <ul>
              {
                currentList.map((suggestion: CityProps, index: number) => (
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
    </SuggestionContainer>
  )
}

export default SuggestionFragment;
