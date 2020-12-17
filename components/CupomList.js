import React from 'react';
import moment from 'moment';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

class Card extends React.Component {
  render() {
    const { navigation, item, horizontal, full, style, ctaColor, imageStyle } = this.props;
    const cardContainer = [styles.card, styles.shadow, style];

    return (
      <Block card flex style={cardContainer}>          
        <Block flex space="between" style={styles.cardDescription}>
          <Text size={16} style={styles.listTitle} bold>{item.titulo}</Text>
          <Text size={14}>{item.descricao}</Text>
          <Text size={14} color={theme.COLORS.BLACK} bold>{item.desconto}</Text>
          <Text size={14} style={styles.due}>{moment(item.validade).format('DD/MM/YYYY')}</Text>
        </Block>
      </Block> 
    );
  }
}

Card.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE - 2,
    borderWidth: 0,
    marginBottom: 5
  },
  due: {
    textAlign:'right',
    marginTop:5,
    color:theme.COLORS.MUTED
  },
  cardTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});

export default withNavigation(Card);