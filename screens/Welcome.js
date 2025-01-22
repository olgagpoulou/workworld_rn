import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';

//formik;
import { Formik } from 'formik';

//Yup
import * as Yup from 'yup'; // Για επικύρωση (προαιρετικά)

//icons
import {Octicons,Ionicons,Fontisto} from '@expo/vector-icons';



//colors
import { Colors } from './../components/styles';



import {
 StyledContainer,
 InnerConatiner,
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

import { View } from 'react-native';



const Welcome = ({navigation}) => {

    const [hidePassword, setHidePassword]= useState(true);
   
    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerConatiner>
            <PageTitle>Work World</PageTitle>
                <Background resizeMode="cover" source={require('./../assets/images/ww1.jpg')}>
                  <Overlay />
                  
                    <LoginContainer>
                        <SubTitle>Account Login</SubTitle>

                        <Formik
                        //    initialValues={{ email: '', password: '' }} // Αρχικές τιμές
                            //validationSchema={Yup.object({
                            //email: Yup.string()
                            //.email('Invalid email') // Έλεγχος αν είναι έγκυρο email
                            //.required('Email is required'), // Υποχρεωτικό πεδίο
                            //password: Yup.string()
                             //.min(6, 'Password must be at least 6 characters') // Τουλάχιστον 6 χαρακτήρες
                            //.required('Password is required'),
                            //  })}
                          //  onSubmit={(values) => {
                            //.apply.applyconsole.log('Form Data:', values); // Ενέργεια υποβολής
                           // navigation.navigate("Login");
                           
                        //}} 
                        >
                              {({
                                    handleChange, // Ενημερώνει τις τιμές των πεδίων
                                    handleBlur,   // Ελέγχει αν ένα πεδίο έχασε την εστίαση
                                    handleSubmit, // Υποβάλλει τα δεδομένα
                                    values,       // Περιέχει τις τιμές των πεδίων
                                    errors,       // Περιέχει τα σφάλματα
                                    touched,      // Ελέγχει αν ένα πεδίο έχει τροποποιηθεί
                                }) => (
                                    <StyledFormArea>
                                        
                                    <StyledButton onPress={() =>  navigation.navigate("Profile")}>
                                            <ButtonText >
                                                Your Job Profile
                                            </ButtonText>
                                        </StyledButton>
                                        


                                        <StyledButton onPress={() =>  navigation.navigate("Login")}>
                                            <ButtonText >
                                                Logout
                                            </ButtonText>
                                        </StyledButton>
                                        <Line />
                                        
                                        <ExtraView>
                                            <ExtraText>Don't have an account already? </ExtraText>
                                            <TextLink onPress={() =>  navigation.navigate("Singup")}>
                                                <TextLinkContent> Sign Up</TextLinkContent>
                                            </TextLink>
                                        </ExtraView>

                                    </StyledFormArea>
                                )

                              }  
                              </Formik>
                    </LoginContainer> 

                </Background>

           

            </InnerConatiner>
         

        </StyledContainer>

    );

};


const MyTextInput = ({label,icon,isPassword, hidePassword,setHidePassword, ...props}) => {
    return (<View>
                <LeftIcon>
                    <Octicons name={icon} size={30} />
                </LeftIcon>
                <StyledInputLabel>{label}</StyledInputLabel>
                <StyledInputText {...props}/>
                {isPassword && (
                    <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                        <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={30} />
                    </RightIcon>
                )}

    </View>);
};

export default Welcome;