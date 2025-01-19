import React, {useState} from 'react';
import { Alert } from 'react-native';

import { StatusBar } from 'expo-status-bar';

//formik;
import { Formik } from 'formik';

//Yup
import * as Yup from 'yup'; // Για επικύρωση (προαιρετικά)

//icons
import {Octicons,Ionicons,Fontisto} from '@expo/vector-icons';

//DatetimePicker
import DateTimePicker from '@react-native-community/datetimepicker';



//colors
import { Colors } from './../components/styles';
import axios from 'axios';



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

import { View, TouchableOpacity } from 'react-native';





const Singup = ({navigation}) => {

    const [hidePassword, setHidePassword]= useState(true);
    const [show, setShow] = useState(false);
    const [date, setData] = useState(new Date(2000, 0 , 1));

    //Actual date of birth to be sent
    const [dob, setDob] = useState();

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setData(currentDate);
        setDob(currentDate); // Μορφοποίηση σε YYYY-MM-DD
    }

    const showDatePicker = () => {
        setShow(true);

    }

    //API
    const handleSubmit = async (values) => {
        try {
            // Δημιουργία του αντικειμένου που θα σταλεί στο API
            const data = {
                name: values.name,
                email: values.email,
               // dateOfBirth: values.dateofBirth, // Χρησιμοποιούμε το dateofBirth από τη φόρμα
                password: values.password,
            };

            // Αίτηση POST στο API
            const response = await axios.post('http://192.168.1.131:8000/api/register/', data);

            // Αν η εγγραφή πετύχει
            console.log('User registered successfully', response.data);
            Alert.alert('Success', 'Account created successfully!');
            navigation.navigate("Welcome");
        } catch (error) {
            console.error('Error during signup:', error.response ? error.response.data : error.message);
            Alert.alert('Error', 'An error occurred during registration');
        }
    };



   
    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerConatiner>
            <PageTitle>Tennis Players</PageTitle>
                
                        <SubTitle>Account SignUp</SubTitle>

                        {show && (
                            <DateTimePicker
                                testID="dateTimePicke"
                                value={date}
                                mode='date'
                                is24Hour={true}
                                display='default'
                                onChange={onChange}
                            />
                            )
                        }

                        <Formik
                            initialValues={{ fullName: '', email: '', dateofBirth: '', password: '', confirmpassword: '' }} // Αρχικές τιμές
                            validationSchema={Yup.object({
                            email: Yup.string()
                            .email('Invalid email') // Έλεγχος αν είναι έγκυρο email
                            .required('Email is required'), // Υποχρεωτικό πεδίο
                            password: Yup.string()
                             .min(6, 'Password must be at least 6 characters') // Τουλάχιστον 6 χαρακτήρες
                            .required('Password is required'),
                              })}
                              onSubmit={handleSubmit}
                           
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
                                            label="name"
                                            icon="person"
                                            placeholder="Olga Grammatikopoulou"
                                            placeholderTextColor= {Colors.dark_gray}
                                            onChangeText={handleChange('name')}
                                            onBlur={handleBlur('name')}
                                            value={values.nameame}
                                        />

                                        <MyTextInput 
                                            label="Email Address"
                                            icon="mail"
                                            placeholder="olgagpoulou@gmail.com"
                                            placeholderTextColor= {Colors.dark_gray}
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            value={values.email}
                                            
                                            
                                        />

                                        <MyTextInput 
                                            label="Date of Birth"
                                            icon="calendar"
                                            placeholder="YYYY - MM - DD"
                                            placeholderTextColor= {Colors.dark_gray}
                                            onChangeText={handleChange('dateOfBirth')}
                                            onBlur={handleBlur('dateOfBirth')}
                                            value={dob ? dob.toDateString() : ''}
                                            isDate={true}
                                            edittable={false}
                                            showDatePicker={showDatePicker}
                                            
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

                                        <MyTextInput 
                                            label="Confirm Password"
                                            icon="lock"
                                            placeholder="* * * * * * * * "
                                            placeholderTextColor= {Colors.dark_gray}
                                            onChangeText={handleChange('confirmpassword')}
                                            onBlur={handleBlur('confirmpassword')}
                                            value={values.confirmpassword}
                                            secureTextEntry={hidePassword}  
                                            isPassword={true}  
                                            hidePassword={hidePassword}   
                                            setHidePassword={setHidePassword}                                     
                                        />

                                        <MsgBox>...</MsgBox>
                                        <StyledButton onPress={handleSubmit}>
                                            <ButtonText>
                                                Singup
                                            </ButtonText>
                                        </StyledButton>
                                        <Line />
                                        
                                        <ExtraView>
                                            <ExtraText>Already have an account? </ExtraText>
                                            <TextLink onPress={() =>  navigation.navigate("Login")}>
                                                <TextLinkContent> Login</TextLinkContent>
                                            </TextLink>
                                        </ExtraView>

                                    </StyledFormArea>
                                )

                              }  
                         </Formik>

                    
               

            </InnerConatiner>
         

        </StyledContainer>

    );

};


const MyTextInput = ({label,icon,isPassword, hidePassword,setHidePassword, isDate, showDatePicker,  ...props}) => {
    return (<View>
                <LeftIcon>
                    <Octicons name={icon} size={30} />
                </LeftIcon>
                <StyledInputLabel>{label}</StyledInputLabel>
                {isDate ? (
                <TouchableOpacity onPress={showDatePicker}>
                <StyledInputText editable={false} {...props} />
                </TouchableOpacity>
                 ) : (
                <StyledInputText {...props} />
                )}


               
                {isPassword && (
                    <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                        <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={30} />
                    </RightIcon>
                )}

    </View>);
};

export default Singup;