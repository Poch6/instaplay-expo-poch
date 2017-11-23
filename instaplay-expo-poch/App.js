import React, {Component} from 'react';
import {  Text, View, ImageBackground, Image, StatusBar, ScrollView } from 'react-native';
import LoginButton from './src/components/LoginButton';


const colors = {
  facebook: 'rgb(59, 89, 152)',
  text: 'rgba(255, 255, 255, 0.75)',
  instagramButtonBorderColor: 'rgba(255, 255, 255, 0.35)',
  facebookButtonBorderColor: 'rgba(255, 255, 255, 0.35)'
}

const loginButtonInfo = {
  height: 45,
  pageFontSize: 11,
  borderWidth: 0.8,
  borderRadius: 5
}

const urls = {
  forgotInstagramLogin: 'https://www.instagram.com/accounts/password/reset',
  twitterLogin: 'https://twitter.com/login?lang=en',
  instagramSignUp: 'https://www.instagram.com/accounts/emailsignup/?hl=en',
  instagramAuthLogin: 'https://api.instagram.com/oauth/authorize/?client_id=cda6dee7d8164a868150910407962f52&redirect_uri=http://www.kaitechconsulting.com&response_type=token&scope=basic+follower_list+comments+likes',
  instagramLogout: 'https://instagram.com/accounts/logout',
  instagramBase: 'https://www.instagram.com/',
};


export default class App extends Component {

  constructor(props){
    super(props);
  }

LoginButtonPressed = () => {
  console.log
}

    loginScreenComponent = () => {
      return (
          <ImageBackground
            source={require('./src/images/Netflix.jpg')}
            resizeMode={'cover'} style={viewStyles.container}
          >
            <StatusBar
              backgroundColor="blue"
              barStyle="light-content"
           />

            <ScrollView>

              <Image
                source={require('./src/images/instagram-text-logo.png')}
                style={viewStyles.instagramTextLogo}
                resizeMode={'contain'}
              />

                <LoginButton
                  buttonViewStyle={viewStyles.instagramLoginButtonView}
                  buttonTextStyle={{color: colors.text, fontWeight: '500'}}
                  buttonTapped={this.loginButtonPressed}
                  activeOpacity={0.75}
                >
                    Login
                </LoginButton>
              </ScrollView>

            </ImageBackground>

    );
    }

  render() {
    return (
      this.loginScreenComponent()
    );
  }
}

const viewStyles = {
  container: {
    flex: 1,
    alignItems: 'center',

  },
  instagramTextLogo: {
    width: 150,
    height: 80,
    marginTop: '100%',
    marginBottom: 25,
  },

  instagranLoginButtonView: {
    backgroundColor: 'transparent',
    borderColor: colors.instagramButtonBorderColor,
    borderWidth: loginButtonInfo.borderWidth,
    borderRadius: loginButtonInfo.borderRadius,
    width: '100%',
    height: loginButtonInfo.height,
    justifyContent: "center",
    alignItems: 'center'
  }
};

const textStyles = {

};
