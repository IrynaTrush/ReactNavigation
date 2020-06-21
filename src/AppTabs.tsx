import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppParamList } from './AppParamList';
import { Center } from './Center';
import { Text, Button } from 'react-native';
import { AuthContext } from './AuthProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HomeStack } from './HomeStack';

interface AppTabsProps {

}

const Tabs = createBottomTabNavigator<AppParamList>();

function Home() {
    const { logout } = useContext(AuthContext);
    return (
        <Center>
            <Text>Home</Text>
            <Button title="logout" onPress={() => {
                logout();
            }}/>
        </Center>
    );
}

function Search() {
    return (
        <Center>
            <Text>Search</Text>
        </Center>
    );
}

export const AppTabs: React.FC<AppTabsProps> = ({}) => {
        return (
            <Tabs.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
      
                  if (route.name === 'Home') {
                    iconName = focused
                      ? 'ios-information-circle'
                      : 'ios-information-circle-outline';
                  } else if (route.name === 'Search') {
                    iconName = focused ? 'ios-list-box' : 'ios-list';
                  }
      
                  // You can return any component that you like here!
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              })}
              tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
              }}
            >
                <Tabs.Screen name="Home" component={HomeStack}/>
                <Tabs.Screen name="Search" component={Search} />
            </Tabs.Navigator>
        );
}