import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { Button, Text } from 'react-native';
import { Center } from './Center';
import { AuthParamList, AuthNavProps } from './AuthParamList';

interface RoutesProps {

}

const Stack = createStackNavigator<AuthParamList>();

function Login({navigation, route} : AuthNavProps<'Login'>) {
    return (
        <Center>
            <Text>Login screen</Text>
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
        return (
            <NavigationContainer>
                <Stack.Navigator 
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
                </Stack.Navigator>
            </NavigationContainer>
        );
}