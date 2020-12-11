import React from "react";
import {
  StyleSheet,
  Dimensions,
  FlatList
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Loader from "../components/loader";
import api from '../service/api';

const { width } = Dimensions.get("screen");

class Cupom extends React.Component {
  
  state = {
    about: [],
    loading: false
  };

  async componentDidMount() {
    try {
      this.setState({loading: true});
      const response = await api.get('cupom');
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
          <FlatList
            data={this.state.about}
            keyExtractor={ post => post._id }
            renderItem={({ item }) => (
              <Block style={styles.defaultStyle}>               
                <Block flex row>
                  <Block middle flex={0.1} style={{ marginRight: 2 }}>
                    <FontAwesomeIcon icon={faCaretRight} size={25} />
                  </Block>
                  <Block row center flex={0.9}>
                    <Text style={styles.list}>{item.titulo}</Text>
                  </Block>
                </Block>
                <Text style={styles.desc}>{item.descricao}</Text>
                <Text style={styles.desc}>{item.desconto}</Text>
                <Text style={styles.desc}>{item.validade}</Text>
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
    paddingHorizontal: 20,
    width: width
  },
  desc: {
    fontSize:15,
    paddingHorizontal:20,
    paddingTop:5,
    width: width - 40
  },
  list: {
    fontSize:18
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

export default Cupom;
