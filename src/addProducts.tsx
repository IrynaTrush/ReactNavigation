import React, { useState, useRef, useEffect } from 'react'; 
import { TouchableOpacity, Text, Button } from 'react-native';
import { Center } from './Center';
import { HomeParamList, HomeStackNavProps } from './HomeParamList';

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

export const addProductRoutes = (Stack : any) => {
    return (
        <>
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
        </>
    )
}