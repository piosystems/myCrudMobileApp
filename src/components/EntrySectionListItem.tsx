import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ButtonGroup, Text, Button, Icon } from 'react-native-elements';
import { ITransactionEntry } from '../interfaces/transaction-entry.interface';

type Props = {
    item: ITransactionEntry;
    deleteEntry: Function;
}

const EntrySectionListItem: React.FC<Props> = ({ item, deleteEntry }) => {

    return (
        <View style={styles.inputContainerStyle}>
            <Text style={{ fontWeight: 'bold' }}>Income?: {item.expense ? "No" : "Yes"}</Text>
            <Text style={{ fontWeight: 'bold' }}>Description: {item.description}</Text>
            <Text style={{ fontWeight: 'bold' }}>Amount: {item.amount}</Text>
            <ButtonGroup
                containerStyle={{ backgroundColor: 'skyblue', width: '40%', borderColor: 'skyblue' }}
                buttons={
                    [<Button
                        icon={<Icon
                            name="edit"
                            color="green"
                        />}
                        type="clear"
                        title="Edit"
                        titleStyle={{ fontSize: 15 }}
                        onPress={() => { }}
                    />,
                    <Button
                        icon={<Icon
                            name="delete"
                            color="red"
                        />}
                        type="clear"
                        title="Delete"
                        titleStyle={{ fontSize: 15 }}
                        onPress={() => {
                            deleteEntry(item.id!)
                        }}
                    />
                    ]
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainerStyle: {
        width: '100%',
        padding: 9
    }
});

export default EntrySectionListItem;