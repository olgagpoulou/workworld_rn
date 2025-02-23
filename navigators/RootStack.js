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
import Home from './../screens/Home';
import Welcome from './../screens/Welcome';
import Profile from './../screens/Profile';
import Index from './../screens/Index';
import EditProfile from './../screens/EditProfile';
import ConversationList from './../screens/ConversationList';
import ConversationDetail from './../screens/ConversationDetail';
import Messages from './../screens/Messages';
import SplashScreenComponent from './../screens/SplashScreenComponent';
import JitsiCallScreen from './../screens/JitsiCallScreen';
import ProfileIndex from './../screens/ProfileIndex';



// Import του Bottom Tab Navigator
import BottomTabNavigator from './../navigators/BottomTabNavigator';



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
                 initialRouteName="Splash"
            >
                {/* Οθόνες που δεν εχουν bottom Tab Navigator */}
                <Stack.Screen name="Splash" component={SplashScreenComponent} />
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Singup" component={Singup}/>
                <Stack.Screen name="Welcome" component={Welcome}/>
                <Stack.Screen name="Profile" component={Profile}/>
                <Stack.Screen name="ConversationList" component={ConversationList}/>
                <Stack.Screen name="ConversationDetail" component={ConversationDetail}/>
                <Stack.Screen name="JitsiCall" component={JitsiCallScreen} />
                <Stack.Screen name="Messages" component={Messages}/>
                <Stack.Screen name="ProfileIndex" component={ProfileIndex}/>
                <Stack.Screen name="EditProfile"
                              component={EditProfile}
                              initialParams={{ profileId: 'someId' }}  // Περνάς τα params
                />
                

                {/* Η main τωρα θα εχει το bottom Tab Navigator και θα εοεξεργαζεται τις υπολοιπες οθονες*/}
                <Stack.Screen name="Home" component={BottomTabNavigator} />
                
              


            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack;