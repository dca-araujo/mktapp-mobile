import React from "react";
import { StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Block, Text, theme } from "galio-framework";
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import { logout } from '../service/auth';
import argonTheme from "../constants/Theme";

class DrawerItem extends React.Component {
  renderIcon = () => {
    const { title, focused } = this.props;

    switch (title) {
      case "Home":
        return (
          <Icon
            name="home"
            family="ArgonExtra"
            size={14}
            color={focused ? "white" : "rgba(0,0,0,0.5)"}
          />
        );
      case "A empresa":
        return (
          <Icon
            name="building"
            family="ArgonExtra"
            size={14}
            color={focused ? "white" : "rgba(0,0,0,0.5)"}
          />
        );
      case "Produtos":
        return (
          <Icon
            name="shopping-cart"
            family="ArgonExtra"
            size={14}
            color={focused ? "white" : "rgba(0,0,0,0.5)"}
          />
        );
      case "Cupons de desconto":
        return (
          <Icon
            name="ticket"
            family="ArgonExtra"
            size={14}
            color={focused ? "white" : "rgba(0,0,0,0.5)"}
          />
        );
      case "Minhas medicações":
        return (
          <Icon
            name="medkit"
            family="ArgonExtra"
            size={14}
            color={focused ? "white" : "rgba(0,0,0,0.5)"}
          />
        );
      case "Lembretes":
        return (<Icon
          name="sticky-note"
          family="ArgonExtra"
          size={14}
          color={focused ? "white" : "rgba(0,0,0,0.5)"}
        />);
      case "Vacinas":
        return (<IconFontisto
          name="injection-syringe"
          family="ArgonExtra"
          size={14}
          color={focused ? "white" : "rgba(0,0,0,0.5)"}
        />);
      case "Fale conosco":
        return (<IconFontisto
          name="email"
          family="ArgonExtra"
          size={14}
          color={focused ? "white" : "rgba(0,0,0,0.5)"}
        />);
      case "Minha conta":
        return (<Icon
          name="user-circle-o"
          family="ArgonExtra"
          size={14}
          color={focused ? "white" : "rgba(0,0,0,0.5)"}
        />);
      case "Preferências":
        return (<Icon
          name="gear"
          family="ArgonExtra"
          size={14}
          color={focused ? "white" : "rgba(0,0,0,0.5)"}
        />);
      case "Termos de uso":
        return (<Icon
          name="file-text"
          family="ArgonExtra"
          size={14}
          color={focused ? "white" : "rgba(0,0,0,0.5)"}
        />);
      case "Logout":
        return (<FontAwesomeIcon icon={faSignOutAlt} size={14} color={"rgba(0,0,0,0.5)"}/>);
      default:
        return null;
    }
  };

  myNavigate = (navigation, title) => {
    switch (title) {
      case 'Minha conta':
        navigation.navigate('Profile');
        break;

      case 'A empresa':
        navigation.navigate('Empresa');
        break;

      case 'Home':
        navigation.navigate('Home');
        break;

      case 'Cupons de desconto':
        navigation.navigate('Cupom');
        break;

      case 'Preferências':
        navigation.navigate('Elements');
        break;
        
      case 'Logout':
        logout().then(result => {
            if(result === null) {
                navigation.navigate('Onboarding');
            } 
          });
        break;  
    
      default:
        navigation.navigate('Construction');
        break;
    }
  }

  render() {
    const { focused, title, navigation } = this.props;

    const containerStyles = [
      styles.defaultStyle,
      focused ? [styles.activeStyle, styles.shadow] : null
    ];

    return (
      <TouchableOpacity
        activeOpacity={.7}
        style={{ height: 40 }}
        onPress={() => this.myNavigate(navigation, title) }
      >
        <Block flex row style={containerStyles}>
          <Block middle flex={0.1} style={{ marginRight: 5 }}>
            {this.renderIcon()}
          </Block>
          <Block row center flex={0.9}>
            <Text
              size={15}
              bold={focused ? true : false}
              color={focused ? "white" : "rgba(0,0,0,0.5)"}
            >
              {title}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16
  },
  activeStyle: {
    backgroundColor: argonTheme.COLORS.VERDE,
    borderRadius: 4
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.1
  }
});

export default DrawerItem;
