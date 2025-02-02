import styled from 'styled-components';
import {View, Text, Image,TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { Picker } from '@react-native-picker/picker';

const StatusBarHeight = Constants.statusBarHeight;


//colors
export const Colors = {
    green_cl: '#72AC57',
    pearpl_cl: '#7D0DDE',
    blue_cl: '#034078',
    dark_blue_cl:'#001F54',
    bb_blue_cl: '#1282A2',
    white_cl: '#FEFCFB',
    black_cl: '#0A1128',
    gray_cl: '#F2F2F2',
    yellow_cl: '#FBED35',
    dark_gray: '#ABABAB',
    bb_brown_cl: '#ECB797',
    blue_gray: '#D9E5E8',


};

const { green_cl, pearpl_cl ,blue_gray, blue_cl, red_cl, white_cl , black_cl , gray_cl , yellow_cl,bb_blue_cl,dark_blue_cl,bb_brown_cl } = Colors;

export const StyledContainer = styled.View`
    flex: 1;
    padding: 0px;
    padding-top: ${StatusBarHeight +30}px;
    background-color: ${white_cl};
    `;
export const InnerConatiner =styled.View`
    flex: 1;
    width: '100%';
    align-items: center;  
     
    `;


export const Background = styled.ImageBackground`
    flex: 1;
    width: 100%;
  justify-content: center;
  align-items: center;
  
 `;

 export const Overlay = styled.View`
 position: absolute;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 background-color: rgba(0, 0, 0, 0.1); /* Σκοτεινή διαφάνεια */
`;

export const LoginContainer = styled.View`
  width: 95%;
  padding: 10px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8); /* Λευκό με διαφάνεια */
  align-items: center;
  margin-top: 230px;
`;

export const ProfileContainer = styled.View`
  width: 95%;
  padding: 10px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8); /* Λευκό με διαφάνεια */
  align-items: center;
  margin-top: 30px;
`;

export const FormCard = styled.View`
  background-color: ${blue_gray};
  border-radius: 10px;
  padding: 20px; 
  
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${dark_blue_cl};
    padding: 0px;
    font-family: 'Roboto';
`;

export const SubTitle = styled.Text`
    font-size: 18px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${bb_blue_cl};
`;

export const StyledFormArea = styled.View`
    width: 95%;
`;

export const StyledInputText = styled.TextInput`
    padding: 10px;
    padding-left: 55px;
    padding-right: 10px;
    border-radius: 5px;
    font-size: 18px;
    height: 60px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    border-width: 1px;
    border-color: #ccc;
`;
export const StyledInputProfileText = styled.TextInput`
    padding: 20px;
    padding-left: 50px;
    padding-right: 10px;
    border-radius: 5px;
    font-size: 18px;
    height: 60px;
    margin-vertical: 3px;
    margin: 10px;
    border-width: 1px;
    border-color: #ccc;
    width: 90%;
`;
export const StyledInputLabel = styled.Text`
    font-size: 13px;
    text-align: left;
`;

export const LeftIcon = styled.View`
    left: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`;

export const ProfileImage = styled.Image`
    width: 150px;
    height: 150px;
    borderRadius: 75px;
    marginBottom: 10px;
`;



export const PickerStyle=styled(Picker)`
    height: 70px;
    width: "80%";
    color: bb_blue_cl;
    textAlign: 'center';

    
`;


export const Error = styled.View`
     color: 'red';
     marginBottom: 10;
`;

export const RightIcon = styled.TouchableOpacity`
    right: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`;
export const StyledButton = styled.TouchableOpacity`
    padding: 15px;
    justify-content: center;
    border-radius: 5px;
    margin-vertical: 5px;
    height: 60px;
    align-items: center;
    background-color: ${bb_blue_cl};

    ${(props) => props.google == true && `
        background-color: ${bb_brown_cl};
        flex-direction: row;
        justify-content: center;
    
    `}
    ${(props) => props.jobprofilebutton == true && `
        background-color: ${bb_brown_cl};
        flex-direction: row;
        justify-content: center;
    
    `}



`;
export const ButtonText = styled.Text`
    font-size: 14px;
    color: ${white_cl};


    ${(props) => props.google == true && `
       padding-left: 5px;
       padding-top: 2px;
       paddind-bottom: 2px;
       padding-right: 5px;
    
    `}
`;

export const MsgBox = styled.Text`
    text-align: center;
    font-size: 13px;
`;

export const Line = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${black_cl};
    margin-vertical: 10px;
`;

export const ExtraView = styled.View`
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 10px;
`;

export const ExtraText = styled.Text`
    justify-content: center;
    align-content: center;
    color: ${bb_blue_cl};
    font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`;
export const TextLinkContent =styled.Text`
    color: ${bb_brown_cl};
    font-size: 15px;
`;

//-----------------------Index style-----------------------

export const IndexContainer =styled.View`
    flex: 1;
    width: '100%';
    align-items: center;   
    padding-top: ${StatusBarHeight +30}px;
    
    `;

    export const IndexTopContainer =styled.View`
   /* flex: 0.3;  /* 30% της οθόνης */
    align-items: center;  
    background-color: ${white_cl}; 
    marginBottom: 5px;
    width: '100%'
  
    `;
    export const IndexOuterBoxContainer =styled.View`
    width: '100%';
    height: '100%';
    align-items: center;  
    background-color: ${bb_brown_cl}; 
    margin-bottom: 5px;
    border-color: ${black_cl};
    border-radius: 10px;
    paddind: 2px;
    justify-content: center;
   
     
    `;
    export const IndexInnerBoxContainer =styled.View`
    
    width: '100%';
    height: '100%';
    align-items: center;  
    background-color: ${bb_blue_cl}; 
    margin-bottom: 0px;
    border-color: ${black_cl};
    border-radius: 10px;
    justify-content: center;
    `;

    export const IndexBottomContainer = styled.View`
    flex: 0.7;  /* 70% της οθόνης */
    width: 100%;
    align-items: center;  
    background-color: ${bb_blue_cl}; 
`;
    export const BoxView = styled.View`
    font-size: 16px;
    font-weight: bold;
    width: 380px;
    justify-content: center;
    align-items: center;
    margin: 2px;
   
    `;
    export const BoxText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    width: 380px;
    text-align: ${(props) => props.align || "left"}
    `;

    export const Avatar = styled.Image`
    width: 180px;
    height:180px;
    border-radius:100px;
    align-self: center; 
    `;

    export const EditButton = styled.TouchableOpacity`
    position: absolute;
    bottom: 5px;
    right: 5px;
    background-color: white;
    padding: 5px;
    border-radius: 15px;
    elevation: 5;
  `;