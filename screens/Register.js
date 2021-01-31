import React from "react";
import {
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  StatusBar,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Alert
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";
import { ErrorMessage } from '../components/styled';
import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import api from '../service/api';
import { login } from '../service/auth';
const { width, height } = Dimensions.get("screen");

class Register extends React.Component {
    state = { name:'', email: '', password: '', error: '', privacy: false, loading: false };

    handleNameChange = (name) => {
        this.setState({ name });
    };    

    handleEmailChange = (email) => {
        this.setState({ email });
    };
    
    handlePasswordChange = (password) => {
        this.setState({ password });
    };
    
    handlePrivacyPolicy = () => {
        this.props.navigation.navigate("App", {screen: 'Privacy'});
    };

    handlePrivacyChange = (privacy) => {
        this.setState({ privacy });
    };

    handleSignInPress = async () => {
        if (this.state.privacy === false) {
            this.setState({ error: 'É necessário concordar com os termos de Política de Privacidades' }, () => false);
            return false;
        }

        if(this.state.password.length < 5) {
            this.setState({ error: 'É necessário informar uma senha com no mínimo 5 caracteres' }, () => false);
            return false;
        }

        if(this.state.email.length === 0) {
            this.setState({ error: 'É necessário informar um e-mail válido' }, () => false);
            return false;            
        }
        
        try {
            const response = await api.post('cliente', {
                nome: this.state.name,
                email: this.state.email,
                senha: this.state.password
            });

            if(response.data.errors) {
                this.setState({ error: response.data.errors.email.message }, () => false);
            } else {
                login(response.data.token).then(result => {
                    this.props.navigation.navigate("App");
                });          
            }
        } catch (_err) {
            this.setState({ error: 'Houve um problema com o cadastro, tente novamente em instantes.' }, () => false);
        }
    };  


  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                <Block flex={0.1} middle>
                  <Text color="#8898AA" size={14}>
                    Informe seus dados para acesso
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8}>
                      <Input
                        borderless
                        placeholder="Nome"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="hat-3"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                        value={this.state.name}
                        onChangeText={this.handleNameChange}
                      />
                    </Block>
                    <Block width={width * 0.8}>
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
                    <Block width={width * 0.8}>
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
                    <Block row width={width * 0.75}>
                      <Checkbox
                        checkboxStyle={{
                          borderWidth: 3
                        }}
                        color={argonTheme.COLORS.PRIMARY}
                        label="Concordo com os "
                        value={this.state.privacy}
                        onChange={this.handlePrivacyChange}
                      />
                      <Button
                        style={{
                          backgroundColor: '#F4F5F7',
                          elevation: 0,
                          width: 150
                          }}
                        textStyle={{
                          color: argonTheme.COLORS.PRIMARY,
                          fontSize: 14
                        }}
                        onPress={this.createTwoButtonAlert}
                      >
                        Política de Privacidade
                      </Button>
                    </Block>
                    <Block middle>
                      <Button color="primary" style={styles.createButton} onPress={this.handleSignInPress}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          CADASTRAR
                        </Text>
                      </Button>
                    </Block>
                    <Block row width={width * 0.8} style={{marginTop:15}}>
                        {this.state.error.length !== 0 && <ErrorMessage style={styles.error}>{this.state.error}</ErrorMessage> }
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    zIndex: 2,
    position: 'relative',
    marginTop: 40
  },
  error: {
    width: width * 0.8,
  },
  registerContainer: {
    width: width * 0.9,
    height: height * 0.8,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  inputIcons: {
    marginRight: 12
  },
  createButton: {
    width: width * 0.5,
    marginTop: 5
  }
});

export default Register;