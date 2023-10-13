import React, {useEffect} from "react";
import { View, Image, Text, useColorScheme, Button } from "react-native";
import PropTypes from "prop-types";
import AppIntroSlider from "react-native-app-intro-slider";
import notifee, {AndroidColor, AndroidImportance, AndroidVisibility} from '@notifee/react-native';
import dynamicStyles from "./styles";


const WalkthroughScreen = (props) => {

  const appConfig = props.appConfig;
  const appStyles = props.appStyles;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);


  const onDisplayNotification = async (message) => {
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'support_alert_app1',
      name: 'Support Alart Message Application1',
      sound: 'alarm',
      importance: AndroidImportance.HIGH,
    });

    try {
      // Display a notification
      await notifee.displayNotification({
        title: '<p style="color: red;"><b>Application Alert </span></p></p>',
        body: `<p style="font-size: 20px; color: red;">${message}</p>`,
        android: {
          channelId,
          autoCancel: false,
          ongoing: true,
          smallIcon: 'alert',
          color: AndroidColor.RED,
          timestamp: Date.now(),
        },
        asForegroundService: true,
      });
    } catch (e) {
      console.log('Notification error========',e);
    }
  }

  useEffect(()=>{
    const ws = new WebSocket('ws://10.0.2.2:3000/consumer');
    ws.onopen = () => {
      // connection opened
      ws.send('alertmessage'); // send a message
      console.log('open data==============');
    };
    
    ws.onmessage = ({data}) => {
      // a message was received
      onDisplayNotification(data);
      console.log('message data==============', data);
    };

    ws.onerror = e => {
      // an error occurred
      console.log('Error==========', e.message);
    };
    
    ws.onclose = e => {
      // connection closed
      console.log('close======',e.code, e.reason);
    };
  }, []);



  const slides = appConfig.onboardingConfig.walkthroughScreens.map(
    (screenSpec, index) => {
      return {
        key: `${index}`,
        text: screenSpec.description,
        title: screenSpec.title,
        image: screenSpec.icon,
      };
    }
  );

  const _renderItem = ({ item, dimensions }) => (
    <View style={[styles.container, dimensions]}>
      <Image
        style={styles.image}
        source={item.image}
        size={100}
        color="white"
      />
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
        {/* <Button title="Display Notification" onPress={() => onDisplayNotification()} /> */}
      </View>
    </View>
  );

  return (
    <AppIntroSlider
      data={slides}
      slides={slides}
      renderItem={_renderItem}
      //Handler for the done On last slide
      showSkipButton={false}
      showDoneButton={false}
      showNextButton={false}
    />
  );
};

WalkthroughScreen.propTypes = {
  appStyles: PropTypes.object,
  appConfig: PropTypes.object,
};

export default WalkthroughScreen;
