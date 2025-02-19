import React, { useEffect } from "react";
import { View, Text, StyleSheet,Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
PageTitle,
IndexContainer,
IndexTopContainer,
Name,
Divider,
Header,
IndexBottomContainer1,
BoxText,
Email,
BoxView
}

from  './../components/styles';

const SplashScreenComponent = () => {
   const navigation = useNavigation();

   useEffect(() => {
    setTimeout(() => {
      navigation.replace("Login"); // Μεταβαίνει στην Login μετά από 3 δευτερόλεπτα
    }, 4000);
  }, []);

  return (
    <IndexContainer backgroundColor={'white'}>
    <IndexTopContainer>
    <Image  source={require('./../assets/images/ihu-gr-logo.jpg')}></Image>
    </IndexTopContainer>
    <IndexBottomContainer1 marginTop={50}>
      <PageTitle marginTop={20}>Διπλωματική Εργασία</PageTitle>
      <Divider></Divider>
      <Header marginTop={30}>Εφαρμογή Work World</Header>
      <BoxView>
     <Email>Φοιτήτρια: <BoxText>Γραμματικοπούλου Όλγα</BoxText></Email>
     <Email>Σέρρες 2025</Email>
     </BoxView>
     <Image marginTop={20} source={require('./../assets/images/react4.jpg')}></Image>
      </IndexBottomContainer1>
      
    </IndexContainer>
    
  );
}


export default SplashScreenComponent;