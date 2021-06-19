export interface ITransactionEntry{
  id?: number;
  txnDay?: number;
  txnMonth?: number;
  txnYear?: number;
  description?: string;
  amount?: number;
  expense?: boolean
}

export interface IState{
    transactionEntries: ITransactionEntry[],
    onAddEntry: boolean
}

/**
 * Below is used for data passed to SectionList display
 */
 export type EntriesInDateSections = {
  data: ITransactionEntry[],
  title: string
}

/**
* Display options used in main component
*/
export enum DisplayOptions {
  SECTION_LIST_BY_DATE = 1,
  FLAT_LIST = 2,
  SPREADSHEET = 3
}

export type ISettings = {
  onSettings: boolean,
  displayOption: DisplayOptions
}
