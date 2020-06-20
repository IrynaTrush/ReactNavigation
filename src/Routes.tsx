import React, { useState, useEffect, useContext } from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { Button, Text, ActivityIndicator, AsyncStorage } from 'react-native';
import { Center } from './Center';
import { AuthParamList, AuthNavProps } from './AuthParamList';
import { AuthContext } from './AuthProvider';
import { AppTabs } from './AppTabs';

interface RoutesProps {

}

const Stack = createStackNavigator<AuthParamList>();

function Login({navigation, route} : AuthNavProps<'Login'>) {
    const { login } = useContext(AuthContext);
    return (
        <Center>
            <Text>Login screen</Text>
            <Button title="log me in" onPress={() => {
                login();
            }}/>
            <Button title="go to register" onPress={() => {
                navigation.navigate('Register')
            }}/>
        </Center>
    );
}

function Register({navigation, route} : 
    AuthNavProps<'Register'>) {
    return (
        <Center>
            <Text>route name: {route.name}</Text>
            <Button title="go to login screen" onPress={() => {
                navigation.navigate('Login');
            }} />
        </Center>
    );
}

export const Routes: React.FC<RoutesProps> = ({}) => {
    const { user, login } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AsyncStorage.getItem('user').then(userString => {
            if (userString) {
               login()
            }
            setLoading(false);
            console.log(userString)
        }).catch(err => {
            console.log(err);
            
        })
    }, [])

    if (loading) {
        return <Center>
            <ActivityIndicator size="large" />
        </Center>
    }
        return (
            <NavigationContainer>
                { user ? <AppTabs /> : <Stack.Navigator 
                // screenOptions={{
                //     header: () => null
                // }}
                >
                    <Stack.Screen name="Login" 
                    options={{
                        headerTitle: 'Sign Up'
                    }}
                    component={Login}/>
                    <Stack.Screen name="Register"
                    options={{
                        headerTitle: 'Sign Up'
                    }}
                    component={Register} />
                </Stack.Navigator> }
            </NavigationContainer>
        );
}