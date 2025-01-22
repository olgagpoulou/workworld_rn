import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
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



const Login = ({navigation}) => {

    const [hidePassword, setHidePassword]= useState(true);
    const [message, setMessage] = useState(''); // Για μηνύματα επιτυχίας ή σφάλματος



    //συνάρτηση για αποθήκευση του accessToken και του RefreshToken
    const storeToken = async (key, value) => {
        try {
            await SecureStore.setItemAsync(key, value);
        } catch (error) {
            console.error("Error storing token:", error);
        }
    };




    //σύνδεση με api
    const handleLogin = async (credentials) => {
        try {
            // Σύνδεση με το API
            const response = await axios.post('http://192.168.1.131:8000/api/login/', credentials);
            console.log('Response:', response);  // Log η πλήρης απόκριση για να δεις τι επιστρέφει το API
            if (response.status === 200) {
                const {accessToken } = response.data;


                if (!accessToken) {
                    throw new Error('Tokens are missing or undefined in the API response');
                }


                // Αποθήκευση των tokens καλώντας την συνάρτηση storeToken με χρήση->SecureStore
                await storeToken('accessToken', accessToken);
                //await storeToken('refreshToken', refresh);
                
                
                console.log('Access Token:', accessToken);
                //console.log('Refresh Token:', refresh);

                // Μετάβαση στην οθόνη Welcome
                navigation.navigate('Welcome');
            }
        } catch (error) {
            console.error('Axios Error:', error); // Εκτύπωση πλήρους σφάλματος
            // Αν αποτύχει η σύνδεση
            if (error.response) {
                console.log('Error response:', error.response);  // Έλεγξε την απόκριση σφάλματος
                setMessage(error.response.data.detail || 'Login failed. Please try again.');
            } else {
                setMessage('An error occurred. Please try again.');
            }
        }
    };

   
    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerConatiner>
            <PageTitle>Work World</PageTitle>
                <Background resizeMode="cover" source={require('./../assets/images/ww2.jpg')}>
                  <Overlay />
                  
                    <LoginContainer>
                        <SubTitle>Account Login</SubTitle>

                        <Formik
                            initialValues={{ email: '', password: '' }} // Αρχικές τιμές
                            validationSchema={Yup.object({
                            email: Yup.string()
                            .email('Invalid email') // Έλεγχος αν είναι έγκυρο email
                            .required('Email is required'), // Υποχρεωτικό πεδίο
                            password: Yup.string()
                             .min(6, 'Password must be at least 6 characters') // Τουλάχιστον 6 χαρακτήρες
                            .required('Password is required'),
                            
                              })}onSubmit={handleLogin}
                            //onSubmit={(values) => {
                            //console.log('Form Data:', values); // Ενέργεια υποβολής
                            //navigation.navigate("Welcome");
                           // setMessage(''); // Καθαρισμός μηνύματος
                            //handleLogin(values);}} // Κλήση του API

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
                                        <MyTextInput 
                                            label="Email Address"
                                            icon="mail"
                                            placeholder="olgagpoulou@gmail.com"
                                            placeholderTextColor= {Colors.dark_gray}
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            value={values.email}
                                            keyboardType="email-address"
                                        />

                                        <MyTextInput 
                                            label="Password"
                                            icon="lock"
                                            placeholder="* * * * * * * * "
                                            placeholderTextColor= {Colors.dark_gray}
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            value={values.password}
                                            secureTextEntry={hidePassword}  
                                            isPassword={true}  
                                            hidePassword={hidePassword}   
                                            setHidePassword={setHidePassword}                                     
                                        />
                                        <MsgBox>{message}</MsgBox>
                                        <StyledButton onPress={handleSubmit}>
                                            <ButtonText>
                                                Login
                                            </ButtonText>
                                        </StyledButton>
                                        <Line />
                                        <StyledButton google={true} onPress={handleSubmit}>
                                                <Fontisto name="google" color={Colors.white_cl} size={25} style={{ marginRight: 10 }}  />
                                            <ButtonText google={true}>
                                               Sign in with Google
                                            </ButtonText>
                                        </StyledButton>
                                        <ExtraView>
                                            <ExtraText>Don't have an account already? </ExtraText>
                                            <TextLink  onPress={() =>  navigation.navigate("Singup")}>
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

export default Login;