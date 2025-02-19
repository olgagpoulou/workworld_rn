import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const JitsiCallScreen = ({ route }) => {
  const { roomName, isVideoCall } = route.params;

  // Δημιουργούμε το Jitsi URL με βάση το αν είναι κλήση ή βιντεοκλήση   
const jitsiUrl = `https://meet.jit.si/${roomName}#config.startWithAudioMuted=false&config.startWithVideoMuted=${isVideoCall ? 'false' : 'true'}&config.defaultLanguage=el&config.prejoinPageEnabled=false&config.openBridgeChannel='websocket'&interfaceConfig.DISABLE_JOIN_LEAVE_NOTIFICATIONS=true&config.disableDeepLinking=true`;
  return (
    <View style={styles.container}>
       <WebView 
        source={{ uri: jitsiUrl }} 
        style={{ flex: 1 }}
        userAgent="Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Mobile Safari/537.36"
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default JitsiCallScreen;