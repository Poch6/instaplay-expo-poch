import React, {Component} from 'react';
import {  Text, View, ImageBackground, Image, StatusBar, ScrollView, Linking, WebView } from 'react-native';
import LoginButton from './src/components/LoginButton';
import TappableText from './src/components/TappableText';
import Dimensions from 'Dimensions';
import InstaNavigationBar from './src/components/InstaNavigationBar.js';
import NetworkManager from './src/model/NetworkManager';
const windowSize = Dimensions.get('window');
const twitterIcon = 19;
const standardComponentWidth = windowSize.width * 0.82;

const colors = {
  facebook: 'rgb(59, 89, 152)',
  text: 'rgba(255, 255, 255, 0.75)',
  instagramButtonBorderColor: 'rgba(255, 255, 255, 0.35)',
  facebookButtonBorderColor: 'rgba(255, 255, 255, 0.35)'
}

const loginButtonInfo = {
  height: 45,
  pageFontSize: 12,
  borderWidth: 0.8,
  borderRadius: 5
}

const urls = {
  forgotInstagramLogin: 'https://www.instagram.com/accounts/password/reset',
  twitterLogin: 'https://twitter.com/login?lang=en',
  instagramSignUp: 'https://www.instagram.com/accounts/emailsignup/?hl=en',
  instagramAuthLogin: 'https://api.instagram.com/oauth/authorize/?client_id=f65612428cbc44f5b60ff44927c0487e&redirect_uri=http://www.kaitechconsulting.com&response_type=token&scope=basic+follower_list+comments+likes',
  instagramLogout: 'https://instagram.com/accounts/logout',
  instagramBase: 'https://www.instagram.com/',
};


export default class App extends Component {

  constructor(props){

    super(props);

    this.state = {
      authenticationURL: urls.instagramAuthLogin,
      displayauthenticationWebView: false,
      accessToken: ''
    }

  }

  onURLStateChange = (webViewState) => {
    const accessTokenSubString ='access_token=';
    console.log("Current URL = " + webViewState.url);

    //if the current url contain the sbustring "accesstoken"
  if(webViewState.url.includes(accessTokenSubString)){

    if (this.state.accessToken.length < 1){
    //the index of the beginning of the access token
    var startIndexOfAccessToken = webViewState.url.lastIndexOf(accessTokenSubString) + accessTokenSubString.length;
    var foundAccessToken = webViewState.url.substr(startIndexOfAccessToken);

    //make a network call to getthe user details

    this.apiManager = new NetworkManager(foundAccessToken);

    //this
    this.apiManager.getSessionAndFeedData( (userData) => {
      console.log(userData);
    }, (feedData) => {
      console.log(feedData);
      this.setState({accessToken: foundAccessToken});
    } );




    }

  }

}
  authenticationWebViewComponent = () => {
    return (
      <WebView
        source={{ uri: this.state.authenticationURL }}
        startInLoadingState={true}
        onNavigationStateChange={this.onURLStateChange}
      />
    );
  }

  instagramFeedsScreenComponent = () => {
    return (
      <View style={{flex: 1,}}>
        <InstaNavigationBar />
      </View>

    );
  }

  loginButtonPressed = () => {
    this.setState({displayauthenticationWebView: true});
  }

  loginWithTwitterComponent = () => {
    return (
      <View style={viewStyles.twitterLoginViewStyle}>
        <Image
          source={require('./src/images/icons/twitter_bird.png')}
          style={viewStyles.twitterIcon}
          resizeMode={'contain'}
        />
        <TappableText
          textStyle={[textStyles.forgottenLogin, textStyles.forgottenLoginBold, textStyles.textStylesForTwitterLogin]}
          textTapped={ () => Linking.openURL(urls.twitterLogin)}
        >
          Log in with Twitter
        </TappableText>
      </View>
    );
  }

  signupFooterComponenet = () => {
    return (
      <View style={[viewStyles.forgottenLoginEncapsulationView, viewStyles.signupFooterComponenet]}>
        <Text style={textStyles.forgottenLogin}>Dont have an account?</Text>
        <TappableText
          textStyle={[textStyles.forgottenLogin, textStyles.forgottenLoginBold,]}
          textTapped={ () => Linking.openURL(urls.instagramSignUp)}
        >
          Sing up
        </TappableText>
      </View>
    );
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
                touchableHighlightStyle={viewStyles.instagranButtonTouchableHeightlightStyle}
                activeOpacity={0.75}
              >
                  Login (Via Instagram)
              </LoginButton>

              <LoginButton
                buttonViewStyle={[viewStyles.instagramLoginButtonView, viewStyles.facebookLoginButtonView]}
                buttonTextStyle={{color: colors.text, fontWeight: '500'}}
                buttonTapped={this.loginButtonPressed}
                touchableHighlightStyle={[viewStyles.instagranButtonTouchableHeightlightStyle, viewStyles.facebookButtonTouchableHighlightStyle]}
                activeOpacity={0.75}
              >
                facebook  Login
              </LoginButton>

              <View style={viewStyles.forgottenLoginEncapsulationView}>
                <Text style={textStyles.forgottenLogin}>Forgot your login details?</Text>
                <TappableText
                  textStyle={[textStyles.forgottenLogin, textStyles.forgottenLoginBold]}
                  textTapped={ () => Linking.openURL(urls.forgotInstagramLogin)}
                >
                  Get help singing in
                </TappableText>
              </View>

              <View style={ viewStyles.orSeparatorView}>
              <View style={viewStyles.orSeparatorLine}/>
              <Text style={textStyles.orSeparatorTextStyle}>OR</Text>
              <View style={viewStyles.orSeparatorLine}/>
              </View>

              {this.loginWithTwitterComponent()}

            </ScrollView>

          {this.signupFooterComponenet()}

          </ImageBackground>

    );
  }

  render() {

    var hasSuccessfullyLogginIn = (this.state.accessToken.length > 1);
    var shouldDisplayloginScreen = (this.state.displayauthenticationWebView == false && this.state.accessToken < 1);

    if(shouldDisplayloginScreen) {
      return (
        this.loginScreenComponent()
      );
    }
    else if(hasSuccessfullyLogginIn){
      return (
        this.instagramFeedsScreenComponent()
      );
    }
    else if (this.state.displayauthenticationWebView == true) {
      return (
        this.authenticationWebViewComponent()
      );
    }


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
    marginTop: '35%',
    marginBottom: 25,
    alignSelf: 'center'
  },

  instagramLoginButtonView: {
    backgroundColor: 'transparent',
    borderColor: colors.instagramButtonBorderColor,
    borderWidth: loginButtonInfo.borderWidth,
    borderRadius: loginButtonInfo.borderRadius,
    width: standardComponentWidth,
    height: loginButtonInfo.height,
    justifyContent: 'center',
    alignItems: 'center'
  },
  instagramButtonTouchableHighlightStyle: {
    backgroundColor: 'transparent',
    width: standardComponentWidth,
    height: loginButtonInfo.height,
    marginTop: 5
  },
  facebookButtonTouchableHighlightStyle: {
    marginTop: 20,
    marginBottom: 10
  },
  facebookLoginButtonView: {
    backgroundColor: colors.facebook,
  },
  forgottenLoginEncapsulationView: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orSeparatorView: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 14,
    paddingHorizontal: 5
    //backgroundColor: 'white'
  },
  orSeparatorLine: {
    height: 1,
    flex: 5,
    backgroundColor: colors.instagramButtonBorderColor,
    borderColor: colors.instagramButtonBorderColor,
    borderWidth: 0.5,
    marginHorizontal: 5
  },
  twitterLoginViewStyle: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'

  },
  twitterIcon: {
    width: twitterIcon,
    height: twitterIcon,
    marginHorizontal: 5
  },
signupFooterComponenet: {
  flex: 0.2,
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  borderWidth: 1,
  borderColor: 'rgba(255, 255, 255, 0.15)',
  shadowColor: 'black',
  shadowOffset: {width: 0, height: 5.5},
  height: null,
  width: windowSize.width
}

};

const textStyles = {
  forgottenLogin: {
    color: 'white',
    fontSize: loginButtonInfo.pageFontSize,
    backgroundColor: 'transparent'
  },
  forgottenLoginBold: {
    fontWeight: 'bold',
    marginLeft: 3

  },
  orSeparatorTextStyle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    fontSize: 13
  },
  textStylesForTwitterLogin: {
    fontSize: 19,

  }

};
