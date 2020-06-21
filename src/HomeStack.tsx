import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Center } from './Center';
import { Text, TouchableOpacity, FlatList, Button } from 'react-native';
import { AuthContext } from './AuthProvider';
import faker from 'faker';
import { HomeParamList, HomeStackNavProps } from './HomeParamList';

interface HomeStackProps {

}

 const Stack = createStackNavigator<HomeParamList>();

 function Feed({navigation} : HomeStackNavProps<'Feed'>) {
    return(
        <Center>
            <FlatList 
            style={{ width: '100%' }}
            data={Array.from(Array(50), () => faker.commerce.product())}
            keyExtractor={(product, ind) => product + ind} 
            renderItem={({item}) => {
                return(
                    <Button title={item} onPress={() => {
                        navigation.navigate('Product', {
                            name: item
                        });
                    }}/>
                );
            }}
            />
        </Center>
    );
}

function Product({route} : HomeStackNavProps<'Product'>) {
    return(
        <Center>
            <Text>{route.params.name}</Text>
        </Center>
    );
}

export const HomeStack: React.FC<HomeStackProps> = ({}) => {
    const {logout} = useContext(AuthContext);
        return (
            <Stack.Navigator initialRouteName="Feed">
                <Stack.Screen 
                options={({route}) => ({
                    headerTitle: route.params.name
                })}
                name="Product" component={Product} />
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