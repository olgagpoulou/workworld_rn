import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';

// Import των οθονών που εχουν το bottom Tab Navigator
import Home from './../screens/Home';
import Index from './../screens/Index';
import Logout from './../screens/Logout';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



const BottomTabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,  // Κρύβει το header
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home-outline';
            } else if (route.name === 'Index') {
              iconName = 'person-outline';
            } else if (route.name === 'Logout') {
              return<AntDesign name="logout" size={size} color={color}  />
            
            }return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Index" component={Index} />
        <Tab.Screen name="Logout" component={Logout} />
      </Tab.Navigator>
    );
  };
  
  export default BottomTabNavigator;