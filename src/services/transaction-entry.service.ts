import { Connection, createConnection, getRepository, Repository } from "typeorm";
import { TransactionEntry } from "../entities/transaction-entry.entity";
import { EntriesInDateSections, IState, ITransactionEntry } from "../interfaces/transaction-entry.interface";

export const getDbConnection = async (setConnection:React.Dispatch<React.SetStateAction<Connection | null>> , state: IState, setState: React.Dispatch<React.SetStateAction<IState>>) => {
    try {
      const connection = await createConnection({
        /* Use below if not using expo
      type: 'react-native',
      database: 'transaction_entries.db',
      location: 'default',
      */
        type: 'expo',
        database: 'transaction_entries.db',
        driver: require('expo-sqlite'),

        //logging: ['error', 'query', 'schema'],
        synchronize: true,
        entities: [TransactionEntry],
      });
      setConnection(connection);
      getTransactionEntries(state, setState);
    } catch (error) {
      console.log(error);
    }
}

export const getTransactionEntries = async (state: IState, setState: React.Dispatch<React.SetStateAction<IState>>) => {
    try {
        const transactionEntryRepository: Repository<TransactionEntry> = getRepository(TransactionEntry);
        let transactionEntries = await transactionEntryRepository.find();
        setState({ ...state, transactionEntries });
    } catch (error) {
        console.log(error);
    }
};

export const createTransactionEntry = async (transactionEntryData: ITransactionEntry, state: IState, setState: React.Dispatch<React.SetStateAction<IState>>) => {
    try {
        const transactionEntryRepository: Repository<TransactionEntry> = getRepository(TransactionEntry);
        const newTransactionEntry = transactionEntryRepository.create(transactionEntryData);
        const transactionEntry = await transactionEntryRepository.save(newTransactionEntry);
        //time to modify state after create
        const transactionEntries = state.transactionEntries;
        transactionEntries.push(transactionEntry);
        setState({ ...state, transactionEntries, onAddEntry: false });
    } catch (error) {
        console.log(error);
    }
};

export const deleteTransactionEntry = async (id: number, state: IState, setState: React.Dispatch<React.SetStateAction<IState>>) => {
    try {
        const transactionEntryRepository: Repository<TransactionEntry> = getRepository(TransactionEntry);
        await transactionEntryRepository.delete(id);
        //remove entry from state
        const currentEntries = state.transactionEntries;
        //find the index corresponding to the item with the passed id
        const index = currentEntries.findIndex((entry) => entry.id === id);
        currentEntries.splice(index, 1);//remove one element starting from the index position. This is removing the element itself
        //update state with the spliced currentItems
        setState({ ...state, transactionEntries: currentEntries });
    } catch (error) {
        console.log(error);
    }
};

/**
     * Function below is called in useMemo hook to transform the entries list to that suitable for a section list in accordance with dates.
     * useMemo has been set to run only when entries in state changes.
     * First, ...new Set is used to iterate through data and get the unique dates. Afterwards it iterates through
     * unique dates and associates the matching entries in groups of dates.
     * @param entries 
     */
 export const transformEntriesToDateSections = (entries: ITransactionEntry[]): EntriesInDateSections[] => {
    //first get distinct txnDates in entry. See https://codeburst.io/javascript-array-distinct-5edc93501dc4 for ideas on how to use ...new Set
    const distinctTxnDates = [...new Set(entries.map(entry => {
      const txnDate = new Date(entry.txnYear!, entry.txnMonth!, entry.txnDay!).toLocaleDateString('en-GB');
      return txnDate;
    }))];

    //map through distinctTxnDates and then map through entries each time to compare dates and date sections with date as title and then the data
    const entryByDates: EntriesInDateSections[] = distinctTxnDates.map((distinctTxnDate) => {

      let dataOnTxnDate: ITransactionEntry[] = [];
      entries.map((entry) => {
        const txnDate = new Date(entry.txnYear!, entry.txnMonth!, entry.txnDay!).toLocaleDateString('en-GB');
        if (txnDate == distinctTxnDate) {
          dataOnTxnDate.push(entry)
        }
      })
      return { title: distinctTxnDate, data: dataOnTxnDate }

    });
    return entryByDates;
  }