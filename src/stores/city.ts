import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

/* Interfaces */
import { CityListProps, CityProps } from 'interfaces/city';

const { persistAtom } = recoilPersist();

// 'suggestion' or 'history'
export const searchStatusState = atom<string>({
  key: 'searchStatus',
  default: 'suggestion',
});

// 검색어가 포함된 city list
export const suggestionListState = atom<CityListProps>({
  key: 'suggestionList',
  default: [],
});

// 검색했던 city history list (persist)
export const historyListState = atom<CityListProps>({
  key: 'historyList',
  default: [],
  effects_UNSTABLE: [persistAtom],
});