import React, { Component } from 'react';
import {Text, View, Image, ImageBackground } from 'react-native';
import CellUserDataBar from './CellUserDataBar';

class InstaFeedCell extends Component {

  constructor(props){
    super(props);
    this.cellData = props.cellData;

  }

  render(){

    /*
    <CellUserDataBar
      username={this.props.cellData.user.username}
      imageURL={this.props.cellData.user.profile_picture}
      supplementaryContainerStyle={{marginBottom: 15}}
    />
    */

    return (
      <View style={{flex: 0, width: '100%'}}>
        <CellUserDataBar
          username={this.props.cellData.user.username}
          imageURL={this.props.cellData.user.profile_picture}
        />
        <ImageBackground
          source={{ uri: this.props.cellData.images.standard_resolution.url}}
          resizeMode={'cover'}
          style={{width: '100%', height:this.props.cellData.images.standard_resolution.height/2}}
        >

        </ImageBackground>

      </View>
    );

  }


}

export default InstaFeedCell;
