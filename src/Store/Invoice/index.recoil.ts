import { atom, selector } from 'recoil';
import { ZInvoiceSearchKeyE, type ZInvoiceI } from '@/Types/Auth/Invoice';
import {
  type ZPaginationInfoI,
  type ZFilterOptions
} from '@/Types/Auth/index.type';
import { ZFilterAndPaginateData, isZNonEmptyString } from '@/utils/Helpers';
import { constants } from '@/utils/Constants';

export const ZInvoiceRStateAtom = atom<ZInvoiceI[]>({
  key: 'ZInvoiceRStateAtom_key',
  default: []
});

export const ZExpenseRStateAtom = atom<ZInvoiceI[]>({
  key: 'ZExpenseRStateAtom_key',
  default: []
});

export const ZInvoiceFiltersRStateAtom = atom<ZFilterOptions>({
  key: 'ZInvoiceFiltersRStateAtom_key',
  default: {
    itemPerPage: 5,
    currentPage: 1,
    showAll: constants?.showAllOption?.value
  }
});

export const ZExpenseFiltersRStateAtom = atom<ZFilterOptions>({
  key: 'ZExpenseFiltersRStateAtom_key',
  default: {
    itemPerPage: 5,
    currentPage: 1,
    showAll: constants?.showAllOption?.value
  }
});

export const ZInvoiceRStateSelector = selector<{
  data: ZInvoiceI[];
  paginationInfo: ZPaginationInfoI;
}>({
  key: 'ZInvoiceRStateSelector_key',
  get: ({ get }) => {
    const invoices = get(ZInvoiceRStateAtom);
    const filters = get(ZInvoiceFiltersRStateAtom);
    let invoiceData = [...invoices];

    if (isZNonEmptyString(filters?.showAll)) {
      invoiceData = invoiceData?.filter((el) =>
        filters?.showAll !== constants?.showAllOption?.value
          ? el?.client?.id === filters?.showAll
          : true
      );
    }

    const { _data, _paginationInfo } = ZFilterAndPaginateData({
      data: invoiceData,
      filters,
      searchKey: [ZInvoiceSearchKeyE.invoice_no]
    });


    if (_data !== null) {
      invoiceData = _data;
    }

    return { data: invoiceData, paginationInfo: _paginationInfo };
  }
});

export const ZExpenseRStateSelector = selector<{
  data: ZInvoiceI[];
  paginationInfo: ZPaginationInfoI;
}>({
  key: 'ZExpenseRStateSelector_key',
  get: ({ get }) => {
    const expense = get(ZExpenseRStateAtom);
    const filters = get(ZExpenseFiltersRStateAtom);
    let expenseData = [...expense];

    if (isZNonEmptyString(filters?.showAll)) {
      expenseData = expenseData?.filter((el) =>
        filters?.showAll !== constants?.showAllOption?.value
          ? el?.client?.id === filters?.showAll
          : true
      );
    }

    const { _data, _paginationInfo } = ZFilterAndPaginateData({
      data: expenseData,
      filters,
      searchKey: [ZInvoiceSearchKeyE.invoice_no]
    });

    if (_data !== null) {
      expenseData = _data;
    }

    return { data: expenseData, paginationInfo: _paginationInfo };
  }
});
