import AsyncStorage from "@react-native-async-storage/async-storage"
import { Picker } from "@react-native-picker/picker"
import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { Button, Text } from 'react-native-elements'
import { DisplayOptions } from "../interfaces/transaction-entry.interface"

/**
 * Type for props to be passed by App when mounting AddEntry
 */
type Props = {
    setDisplayOption: Function,
    cancelSetSetting: Function
}

type IState = {
    displayOption: DisplayOptions | null
}

const Settings: React.FC<Props> = ({ setDisplayOption, cancelSetSetting }) => {
    
    const [state, setState] = useState<IState>({
        displayOption: null //this should really be gotten from AsyncStorage on ComponentDidMount
    })

    const storeDisplayOption = async (value: string) => {
        try {
            await AsyncStorage.setItem('displayOption', value.toString())
        } catch (e) {
            // saving error
        }
    }

    const getDisplayOption = async () => {
        try {
          const value = await AsyncStorage.getItem('displayOption');
          if(value !== null) {
            // value previously stored
            setState({...state, displayOption: parseInt(value)})
            
          }else{
              //return default option
              setState({...state, displayOption: DisplayOptions.SECTION_LIST_BY_DATE})
          }
        } catch(e) {
          // error reading value
        }
      }

    useEffect(
        () => {
            getDisplayOption()
        },[]
    )

    return (
        <View style={{
            backgroundColor: '#fffff2',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            marginTop: 30
        }}>
            <Text h3 style={{
                width: '100%',
                padding: 10,
                backgroundColor: '#fffff2'
            }}>Select display type</Text>
            <Picker
                style={{ width: '100%' }}
                selectedValue={state.displayOption}
                onValueChange={(itemValue, itemIndex) => {
                    //setState({ ...state, displayOption: itemValue }) //display in this component
                    //do async storage instead of setState here, as the next call to App function will close settings
                    storeDisplayOption(itemValue!.toString());
                    setDisplayOption(itemValue); //talk to App.tsx to set. Later move this to general settings save later
                }
                }>
                <Picker.Item label="Flat List" value={DisplayOptions.FLAT_LIST} />
                <Picker.Item label="By Date Sections" value={DisplayOptions.SECTION_LIST_BY_DATE} />
                <Picker.Item label="Spreadsheet" value={DisplayOptions.SPREADSHEET} />
            </Picker>
            <Button style={{
                width: '100%', padding: 10, backgroundColor: '#fffff2', paddingLeft: 1
            }}
                title="Close"
                onPress={() => {
                    //call create which will also make the form disappear
                    cancelSetSetting();
                }}
                buttonStyle={{ backgroundColor: 'orange' }}
            />
        </View>
    )
}

export default Settings;