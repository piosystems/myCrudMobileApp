import React from 'react';
import { View, SectionList, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import Constants from "expo-constants";
import EntrySectionListItem from './EntrySectionListItem';
import { EntriesInDateSections } from '../interfaces/transaction-entry.interface';

type Props = {
    entriesInDateSections: EntriesInDateSections[] //array of entries
    deleteEntry: Function
}

const EntrySectionList: React.FC<Props> = ({ entriesInDateSections, deleteEntry }) => {

    return (
        <SectionList
            style={{ width: '100%', padding: 3, backgroundColor: 'skyblue' }}
            sections={entriesInDateSections}
            keyExtractor={(item, index) => item + index.toString()}
            renderItem={({ item }) => (
                <EntrySectionListItem item={item} deleteEntry={deleteEntry} />
            )}
            renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.header}>{title}</Text>
            )}


            ListHeaderComponent={
                () => (
                    <View>
                        <Text h3 style={[styles.inputContainerStyle, { backgroundColor: "lightblue" }]}>Entries so far by date...</Text>
                    </View>
                )}

            /*
            ListFooterComponent = {
                ()=> (<View style={{backgroundColor:'#ccc', paddingBottom: 30, paddingTop: 3,alignContent:"flex-start"}}><Text style={{fontSize: 15, fontStyle: "italic"}}>Copyright: Pius Onobhayedo</Text></View>)
            }
            */

            ItemSeparatorComponent={
                //this component will be rendered in between items
                () => {
                    return (<View style={{ backgroundColor: '#ccc', height: 3, width: '100%' }} />)
                }
            }
        />

    )

}

EntrySectionList.defaultProps = {
    entriesInDateSections: []
}

export default EntrySectionList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: { fontSize: 16, color: 'black' },
    inputContainerStyle: {
        width: '100%',
        padding: 3
    },
    header: {
        fontSize: 16,
        backgroundColor: "#eee",
        padding: 3
    }
});
