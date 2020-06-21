import React, { useContext, useRef, useState, useEffect } from 'react'
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

function Product({route, navigation} : HomeStackNavProps<'Product'>) {
    return(
        <Center>
            <Text>{route.params.name}</Text>
            <Button title="edit this product"
            onPress={() => navigation.navigate("EditProduct", {
                name: route.params.name
            })}/>
        </Center>
    );
}

function apiCall(x: any) {
    return x
}

function EditProduct({route, navigation} : HomeStackNavProps<'EditProduct'>) {
    const [formState, setFormState] = useState();
    const submit = useRef(() => {});
    submit.current = () => {
        //api call with a new form state
        apiCall(formState);
        navigation.goBack();
    }

    useEffect(() => {
        navigation.setParams({ submit })
    }, [])

    return(
        <Center>
            <Text>editing {route.params.name}...</Text>
        </Center>
    );
}

export const HomeStack: React.FC<HomeStackProps> = ({}) => {
    const {logout} = useContext(AuthContext);
        return (
            <Stack.Navigator initialRouteName="Feed">
                <Stack.Screen 
                name="EditProduct"
                component={EditProduct}
                options={({route}) => ({
                    headerTitle: `Edit: ${route.params.name}`,
                    headerRight: () => <TouchableOpacity 
                    onPress={() => {
                        if (route.params.submit) {
                            route.params.submit?.current()
                        }
                    }}
                    style={{paddingRight: 10}}>
                        <Text style={{color: 'red'}}>Done</Text>
                    </TouchableOpacity>
                })}
                />
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