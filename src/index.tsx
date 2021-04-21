import React, {useEffect, useState} from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import styles from './styles';

type Item = {
  label: string,
  value: string,
}

type SwipeFilter = {
  isWide: boolean,
  itemJSX: any,
  onChange: Function,
  opacityColour?: string,
  textColour: string,
  value: string,
  items: Array<Item>,
}

const SwipeFilterComponent = (props: SwipeFilter) => {
  const {
    isWide,
    itemJSX,
    onChange,
    textColour,
    value,
    items,
  } = props;

  const componentWidth = Math.floor(Dimensions.get('window').width);
  const itemsLength = items.length;

  const [initialValue, setInitialValue] = useState(value);
  useEffect(() => {
    setInitialValue(value);
  }, [value]);

  const itemWidth = isWide ? 3 : 5;
  const width = Math.floor(componentWidth / itemWidth);
  
  return (
    <View style={styles.wrapper}>
      <ScrollView
        contentOffset={{x: items.map((item: Item) => item.value).indexOf(initialValue) * width, y: 0}}
        horizontal
        onMomentumScrollEnd={(event: any) => {
          const xOffset = Math.round(event.nativeEvent.contentOffset.x / width) * width;
          const index = (xOffset / width);
          onChange(items[index].value);
        }}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        snapToInterval={width}
        style={{width: width * itemWidth}}
      >
        {items.map((item: Item, i: number) => {
          const {label} = item;
          const marginWidth = isWide ? width : width * 2;
          return (
            <View
              key={i}
              style={{
                ...styles.itemWrapper,
                width,
                marginLeft: i === 0 ? marginWidth : 0,
                marginRight: i === itemsLength - 1 ? marginWidth : 0,
              }}>
              {itemJSX(label, textColour)}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

SwipeFilterComponent.defaultProps = {
  isWide: false,
  itemJSX: (label, textColour) => (
    <Text style={{...styles.item, color: textColour}}>{label}</Text>
  ),
  onChange: () => {},
  textColour: '#000000',
  value: '',
  items: [{label: '', value: ''}],
}

export default SwipeFilterComponent;