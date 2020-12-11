import React from "react";
import { StyleSheet, ImageBackground, Dimensions } from "react-native";
import { Block, Text } from "galio-framework";
import { Images } from "../constants";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDolly } from '@fortawesome/free-solid-svg-icons';

const { width, height } = Dimensions.get("screen");

export default class Construction extends React.Component {

  render() {
    return (
       <Block flex middle>
        <ImageBackground source={Images.Onboarding} style={{ width, height }}>       
          <Block flex middle>
            <FontAwesomeIcon icon={faDolly} style={styles.icon} size={100} />
            <Text style={styles.text}>Em construção</Text>
          </Block>
        </ImageBackground>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    marginTop:120,
    paddingVertical: 30,
  }, 
  icon:{
    opacity:.9
  },
  text:{
    textTransform:"uppercase",
    fontSize:15,
    fontWeight:"bold",
    marginTop:20,
    opacity:.9
  }
});

