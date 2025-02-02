import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import React, {useEffect,useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, Button, Image , StyleSheet,  Platform , Alert  } from 'react-native';

//formik;
import { Formik } from 'formik';


//Yup
import * as Yup from 'yup'; // Για επικύρωση (προαιρετικά)

//icons
import {Feather} from '@expo/vector-icons';





import {
    IndexContainer,
    IndexTopContainer,
    IndexBottomContainer,
    IndexOuterBoxContainer,
    IndexInnerBoxContainer,
    Avatar,
    BoxView,
    BoxText,
    EditButton,
    Background,
    PageTitle,
    Overlay,
    LoginContainer,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    RightIcon,
    StyledInputText,
    StyledInputLabel,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent,
    
   } from './../components/styles';

  
   const Index = ({navigation}) => {
    

    return (
    <IndexContainer>
        <IndexTopContainer>
          <IndexOuterBoxContainer>
             <BoxText>Φορέας Εργασίας</BoxText>
          <IndexInnerBoxContainer>
          
            <BoxView>
            <EditButton onPress={() => navigation.navigate("EditProfile")}>
                <Feather name="edit" size={24} color="#3498db" />
             </EditButton>
            <Avatar 
                source={require('./../assets/images/default-image.jpg')}
            />  
          </BoxView>
          <BoxText align="center" >Ονοματεπώνυμο</BoxText>
             <BoxText align="center">Email</BoxText>
         </IndexInnerBoxContainer>
        </IndexOuterBoxContainer>
    </IndexTopContainer>
    <IndexBottomContainer>
        <PageTitle>ena kommati rgtgynnnnnnnnnnnnnnrghr</PageTitle>
    </IndexBottomContainer>
    </IndexContainer>
    
    

        
    )

   };

   export default Index;