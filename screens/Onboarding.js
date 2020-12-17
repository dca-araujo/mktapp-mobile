import React from "react";
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions } from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
import argonTheme from "../constants/Theme";
import Images from "../constants/Images";

const { height, width } = Dimensions.get("screen");

class Onboarding extends React.Component { 
  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex center>
        <ImageBackground
            source={Images.Onboarding}
            style={{ height, width, zIndex: 1 }}
          />
        </Block>
        <Block center>
          <Image source={Images.LogoOnboarding} style={styles.logo} />
        </Block>
        <Block flex space="between" style={styles.padded}>
            <Block flex space="around" style={{ zIndex: 2 }}>
              <Block style={styles.title}>
                <Block>
                  <Text color="white" size={40}>
                    Bem Vindo
                  </Text>
                </Block>
                <Block style={styles.subTitle}>
                  <Text color="white" size={16}>
                    Aproveite as vantagens através de nossa plataforma.
                  </Text>
                </Block>
              </Block>
              <Block flex row style={styles.buttons}>
                <Button
                  style={styles.button}
                  color={argonTheme.COLORS.SUCCESS}
                  onPress={() => navigation.navigate("App", {screen: 'Login'})}
                  textStyle={{ color: argonTheme.COLORS.WHITE }}
                >
                  LOGIN
                </Button>
                <Button
                  style={styles.button}
                  color={argonTheme.COLORS.SUCCESS}
                  onPress={() => navigation.navigate("App", {screen: 'Account'})}
                  textStyle={{ color: argonTheme.COLORS.WHITE }}
                >
                  CADASTRAR
                </Button>
              </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  button: {
    width: ((width - theme.SIZES.BASE * 4)-5)/2,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginRight: 5
  },
  logo: {
    width: 280,
    height: 60,
    zIndex: 2,
    position: 'relative',
    marginTop: '-50%'
  },
  title: {
    marginTop:'-5%',
    marginRight:20,
    marginLeft:20,
    marginBottom:'15%'
  },
  subTitle: {
    marginTop: 20
  }, 
  buttons: {
    marginTop: '5%'
  }
});

export default Onboarding;
