import React from "react";
import {
  StyleSheet,
  Image,
  Dimensions,
  FlatList
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { Images } from "../constants/";
import Loader from "../components/loader";
import api from '../service/api';

const { width } = Dimensions.get("screen");

class Empresa extends React.Component {
  
  state = {
    about: [],
    loading: false
  };

  async componentDidMount() {
    try {
      this.setState({loading: true});
      const response = await api.get('empresa');
      this.setState({ about: response.data });
    } catch (error) {
      console.log(error);
    }

    this.setState({loading: false});
  }

  render() {
    return (
      <Block center>
        <Loader loading={this.state.loading} />
        <Block center style={[this.state.loading ? {display: 'none'} : '']} >
          <Image source={Images.LogoOnboarding} style={styles.logo} />
          <FlatList
            data={this.state.about}
            keyExtractor={ post => post._id }
            renderItem={({ item }) => (
              <Block>
                <Text style={styles.topic}>Quem somos</Text>
                <Text style={styles.about}>{item.descricao}</Text>
                <Block flex center>                  
                  <Block flex row style={styles.defaultStyle}>
                    <Block middle flex={0.1} style={{ marginRight: 5 }}>
                      <FontAwesomeIcon icon={faPhone} style={styles.icon} size={25} />
                    </Block>
                    <Block row center flex={0.9}>
                      <Text style={styles.list}>{item.telefone}</Text>
                    </Block>
                  </Block>
                  <Block flex row style={styles.defaultStyle}>
                    <Block middle flex={0.1} style={{ marginRight: 5 }}>
                      <FontAwesomeIcon icon={faEnvelope} style={styles.icon} size={25} />
                    </Block>
                    <Block row center flex={0.9}>
                      <Text style={styles.list}>{item.email}</Text>
                    </Block>
                  </Block>
                  <Block flex row style={styles.defaultStyle}>
                    <Block middle flex={0.1} style={{ marginRight: 5 }}>
                      <FontAwesomeIcon icon={faWhatsapp} style={styles.icon} size={25} />
                    </Block>
                    <Block row center flex={0.9}>
                      <Text style={styles.list}>{item.whatsapp}</Text>
                    </Block>
                  </Block>
                </Block>
                <Text style={styles.topic}>Atendimento</Text>
                <Text style={styles.about}>{item.atendimento}</Text>
              </Block>
            )}
          />
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 5,
    paddingHorizontal: 20
  },
  about: {
    fontSize:15,
    paddingHorizontal:20,
    width: width,
    textAlign: "justify"
  },
  list: {
    paddingLeft:10,
    fontSize:20
  },
  topic: {
    marginHorizontal:20,
    marginTop:20,
    fontSize:20,
    fontWeight: "bold",
    width: width,
  },
  none:{
    display: "none"
  }
});

export default Empresa;
