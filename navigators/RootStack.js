import React from 'react';
import style from "./../components/styles";

import { Colors, styles } from './../components/styles';
const { green_cl, pearpl_cl , blue_cl, red_cl, white_cl , black_cl , gray_cl , yellow_cl } = Colors;

//React Navigation
import { NavigationContainer } from '@react-navigation/native'; // Εισαγωγή NavigationContainer
//import { NavigationContainer } from '@react-navigation/native';  // Ορθά εισαγόμενο

import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Διορθωμένη εισαγωγή


//screens
import Login from './../screens/Login';
import Singup from './../screens/Singup';
import Welcome from './../screens/Welcome';
import Profile from './../screens/Profile';

const Stack = createNativeStackNavigator();



const RootStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: 'transparent'} ,
                headerTintColor: Colors.black_cl,
                headerTransparent: true,
                headerTitle: '',
                headerLeftContainerStyle: {
                    paddingLeft:20
                }
               
                }}
                 initialRouteName="Login"
            >
               
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Singup" component={Singup}/>
                
                <Stack.Screen name="Welcome" component={Welcome}/>
                <Stack.Screen name="Profile" component={Profile}/>
              


            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack;