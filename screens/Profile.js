import React from "react";
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Block, Text, theme, Button, Input } from "galio-framework";
import { Images, argonTheme } from "../constants";
import { getCliente } from '../service/auth';

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

class Profile extends React.Component {
    state = { loading: false };
    handleData = (atributo, valor) => {
        this.setState({[atributo]: valor});
    };   
    
  render() {
    getCliente().then(result => {this.setState(JSON.parse(result))});
    return (
      <Block flex>
        <Block flex>
          <ImageBackground
            source={Images.ProfileBackground}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width, marginTop: 90 }}
            >
              <Block flex style={styles.profileCard}>
                <Block middle style={styles.avatarContainer}>
                  <Image
                    source={{ uri: Images.ProfilePicture }}
                    style={styles.avatar}
                  />
                </Block>
                <Block flex>
                    <Block style={{ marginTop: 20 }}>
                        <Input right placeholder="Nome" value={this.state.nome} color={theme.COLORS.BLACK} iconContent={<FontAwesome5 name="user-circle" size={20} color="rgba(0,0,0,0.5)" />} />
                        <Input right placeholder="E-mail" value={this.state.email} color={theme.COLORS.BLACK} iconContent={<FontAwesome5 name="at" size={20} color="rgba(0,0,0,0.5)" />} />
                    </Block>
                    <Block middle style={{ marginVertical: 15 }}>
                        <Block style={styles.divider} />
                    </Block>
                    <Block>
                        <Input right placeholder="Filhos" value={this.state.filhos} color={theme.COLORS.BLACK} iconContent={<FontAwesome5 name="child" size={20} color="rgba(0,0,0,0.5)" />} />
                        <Input right placeholder="Histórico" value={this.state.historico} color={theme.COLORS.BLACK} iconContent={<FontAwesome5 name="history" size={20} color="rgba(0,0,0,0.5)" />} />
                        <Input right placeholder="Nascimento" value={this.state.nascimento} color={theme.COLORS.BLACK} iconContent={<FontAwesome5 name="birthday-cake" size={20} color="rgba(0,0,0,0.5)" />} />
                        <Input right placeholder="Documento" value={this.state.identidade} color={theme.COLORS.BLACK} iconContent={<FontAwesome5 name="id-card" size={20} color="rgba(0,0,0,0.5)" />} />
                        <Input right placeholder="Endereço" value={this.state.endereco} color={theme.COLORS.BLACK} iconContent={<FontAwesome5 name="home" size={20} color="rgba(0,0,0,0.5)" />} />
                        <Input right placeholder="Cidade" value={this.state.cidade} color={theme.COLORS.BLACK} iconContent={<FontAwesome5 name="map-marked" size={20} color="rgba(0,0,0,0.5)" />} />
                        <Input right placeholder="Telefone" value={this.state.telefone} color={theme.COLORS.BLACK} iconContent={<FontAwesome5 name="phone" size={20} color="rgba(0,0,0,0.5)" />} />
                    </Block>
                    <Block flex row style={{ marginTop: 5 }}>
                        <Block flex={0.5} style={{ paddingHorizontal: 5 }}>
                            <Button                                
                                color={this.state.sexo == 'Masculino' ? argonTheme.COLORS.MUTED : argonTheme.COLORS.SECONDARY}
                                textStyle={{ color: "black", fontSize: 16, fontWeight: "700" }}
                                style={styles.button}
                                onPress={ () => {this.handleData("sexo", "Masculino")}}>
                                Masculino
                            </Button>
                        </Block>
                        <Block flex={0.5} style={{ paddingHorizontal: 5 }}>
                            <Button
                                color={this.state.sexo == 'Feminino' ? argonTheme.COLORS.MUTED : argonTheme.COLORS.SECONDARY}
                                textStyle={{ color: "black", fontSize: 16, fontWeight: "700" }}
                                style={styles.button}
                                onPress={ () => {this.handleData("sexo", "Feminino")}}>
                                Feminino
                            </Button>
                        </Block>
                    </Block>
                    <Block style={{ marginTop: 15 }}>
                        <Button
                            color={argonTheme.COLORS.SUCCESS}
                            textStyle={{ color: "white", fontSize: 16, fontWeight: "700" }}
                            style={styles.button}>
                            Salvar alterações
                        </Button>
                    </Block>
                </Block>
              </Block>
            </ScrollView>
          </ImageBackground>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  profileContainer: {
    width: width,
    padding: 0,
    zIndex: 0,
    marginTop:-90
  },
  button: {
    width: "100%",
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginRight: 5
  },
  profileBackground: {
    width: width,
    height: height / 2
  },
  profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
    minHeight:500
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  }
});

export default Profile;
