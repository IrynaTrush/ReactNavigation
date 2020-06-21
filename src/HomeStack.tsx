import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Center } from './Center';
import { Text, TouchableOpacity, FlatList, Button } from 'react-native';
import { AuthContext } from './AuthProvider';
import faker from 'faker';

interface HomeStackProps {

}

 const Stack = createStackNavigator();

 function Feed() {
    return(
        <Center>
            <FlatList 
            style={{ width: '100%' }}
            data={Array.from(Array(50), () => faker.commerce.product())}
            keyExtractor={(product, ind) => product + ind} 
            renderItem={({item}) => {
                return(
                    <Button title={item} onPress={() => {}}/>
                );
            }}
            />
        </Center>
    );
}

export const HomeStack: React.FC<HomeStackProps> = ({}) => {
    const {logout} = useContext(AuthContext);
        return (
            <Stack.Navigator>
                <Stack.Screen name="Feed" 
                options={{
                    headerRight: () => {
                        return (
                            <TouchableOpacity
                            onPress={() => {
                                logout();
                            }}
                            >
                                <Text style={{color: 'red'}}>
                                    Logout
                                </Text>
                            </TouchableOpacity>
                        );
                    }
                }}
                component={Feed} />
            </Stack.Navigator>
        );
}