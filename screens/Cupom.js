import React from "react";
import { StyleSheet, Dimensions, FlatList } from "react-native";
import { Block } from "galio-framework";

import Loader from "../components/loader";
import Card from "../components/CupomList";
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
              <Card item={item} style={styles.defaultStyle} />
            )}
          />
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingHorizontal: 20,
    width: width-40
  }
});

export default Cupom;
