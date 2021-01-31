import React from "react";
import { StyleSheet, Image, ImageBackground, Dimensions, StatusBar, KeyboardAvoidingView } from "react-native";
import { Block, Text,theme } from "galio-framework";
import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import { ErrorMessage } from '../components/styled';
import Loader from "../components/loader";
import { login } from '../service/auth';
import api from '../service/api';
const { width, height } = Dimensions.get("screen");

class Register extends React.Component {
  state = { email: '', password: '', error: '', loading: false };

  handleEmailChange = (email) => {
    this.setState({ email });
  };
  
  handlePasswordChange = (password) => {
    this.setState({ password });
  };
  
  handleCreateAccountPress = () => {
    this.props.navigation.navigate("App", {screen: 'Account'});
  };

  handleSignInPress = async () => {
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      this.setState({ error: 'Preencha usuário/senha para continuar' }, () => false);
    } else {
      try {
        const response = await api.post('cliente/auth', {
          email: this.state.email,
          password: this.state.password,
        });

        if(response.data.error === true) {
          this.setState({ error: response.data.msg });
        } else {
          login(response.data.token).then(result => {
            this.props.navigation.navigate("App");
          });          
        }
      } catch (_err) {
        this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });
      }
    }
  };  

  render() {
    return (
      <Block flex middle>
        <StatusBar hidden />
        <ImageBackground
          source={Images.Onboarding}
          style={{ width, height, zIndex: 1 }}
        >
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block center>
                <Image source={Images.LogoOnboarding} style={styles.logo} />
              </Block>
              <Block flex>
                <Block flex={0.17} middle>
                  <Text color="#FFF" size={18}>Informe seus dados para acesso</Text>
                  <Loader loading={this.state.loading} />
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block style={{ marginBottom: 5 }}>
                      <Input
                        borderless
                        placeholder="E-mail"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="ic_mail_24px"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                        value={this.state.email}
                        onChangeText={this.handleEmailChange}
                        autoCapitalize="none"
                        autoCorrect={false}
                      />
                    </Block>
                    <Block style={{ marginBottom: 15 }}>
                      <Input
                        password
                        borderless
                        placeholder="Senha"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="padlock-unlocked"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                        value={this.state.password}
                        onChangeText={this.handlePasswordChange}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry
                      />
                    </Block>
                    {this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage> }
                    <Block flex row style={{ marginTop: 15 }}>
                      <Button color="success" style={styles.button} onPress={this.handleSignInPress}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          ENTRAR
                        </Text>
                      </Button>
                      <Button color="primary" style={styles.button} onPress={this.handleCreateAccountPress}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          CADASTRE-SE
                        </Text>
                      </Button>                      
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    zIndex: 2,
    position: 'relative',
    marginTop: 40
  },
  button: {
    width: ((width - theme.SIZES.BASE * 4))/2,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginRight: 10
  },
  registerContainer: {
    width: width * 0.9,
    height: height * 0.78,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
  }
});

export default Register;