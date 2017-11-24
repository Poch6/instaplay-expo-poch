import React, {Component} from 'react';
import {Text, TouchableHighlight} from 'react-native';

class TappableText extends Component {

  constructor(props){
    super(props);
  }

  render(){
    return(
      <TouchableHighlight
       style={this.props.highlightStyle}
       activeOpacity={this.props.activeOpacity}
       underlayColor={'transparent'}
       onPress={this.props.textTapped}
      >
        <Text style={this.props.textStyle}>{this.props.children}</Text>
      </TouchableHighlight>
    );
  }

}


export default TappableText;
