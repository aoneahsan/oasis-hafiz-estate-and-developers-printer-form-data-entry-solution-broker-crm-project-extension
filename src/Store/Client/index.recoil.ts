import { atom, selector } from 'recoil';
import {
  ZClientSearchKeyE,
  type ZClientI
} from '@/Types/Auth/Clients/index.type';
import {
  type ZPaginationInfoI,
  type ZFilterOptions
} from '@/Types/Auth/index.type';
import { ZFilterAndPaginateData } from '@/utils/Helpers';

export const ZClientsRStateAtom = atom<ZClientI[]>({
  key: 'ZClientsRStateAtom_key',
  default: []
});

export const ZClientFiltersRStateAtom = atom<ZFilterOptions>({
  key: 'ZClientFiltersRStateAtom_key',
  default: {
    itemPerPage: 5,
    currentPage: 1
  }
});

export const ZClientRStateSelector = selector<{
  data: ZClientI[];
  paginationInfo: ZPaginationInfoI;
}>({
  key: 'ZClientRStateSelector_key',
  get: ({ get }) => {
    const clients = get(ZClientsRStateAtom);
    const filters = get(ZClientFiltersRStateAtom);
    let clientsData = [...clients];
    const { _data, _paginationInfo } = ZFilterAndPaginateData({
      data: clientsData,
      filters,
      searchKey: [
        ZClientSearchKeyE.company,
        ZClientSearchKeyE.email,
        ZClientSearchKeyE.name
      ]
    });

    if (_data !== null) {
      clientsData = _data;
    }

    return { data: clientsData, paginationInfo: _paginationInfo };
  }
});
