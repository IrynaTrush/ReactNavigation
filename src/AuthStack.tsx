import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, Button } from 'react-native';
import { AuthContext } from './AuthProvider';
import { AuthParamList, AuthNavProps } from './AuthParamList';
import { Center } from './Center';

interface AuthStackProps {

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


export const AuthStack: React.FC<AuthStackProps> = ({}) => {
        return (
            <Stack.Navigator 
                screenOptions={{
                    header: () => null
                }}
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
        );
}