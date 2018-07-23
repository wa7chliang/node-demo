/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button, ScrollView, Dimensions} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 0
    }
  }

  componentDidMount () {
    this._startTimer()
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  _startTimer () {
    this.interval = setInterval(() => {
      nextPage = this.state.currentPage + 1
      if (nextPage >= 3) {
        nextPage = 0   //如何已经滚动到最后一页，下次返回第一页
      }
      this.setState({currentPage: nextPage})
      const offSetX = nextPage * Dimensions.get('window').width   //计算x的偏移量
      this.refs.scrollView.scrollResponderScrollTo({x: offSetX, y: 0, animated: true})
    }, 2000)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={styles.searchbar}>     
            <TextInput style={styles.input} placeholder='搜索商品'></TextInput>
            <Button style={styles.button} title='搜索'></Button>
          </View>
          <View style={styles.advertisement}>
            <ScrollView
                ref="scrollView"
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}>
              <Text style={{
                width: Dimensions.get('window').width,
                height: 180,
                backgroundColor: 'gray'
              }}>广告1</Text>
              <Text style={{
                width: Dimensions.get('window').width,
                height: 180,
                backgroundColor: 'orange'
              }}>广告2</Text>
              <Text style={{
                width: Dimensions.get('window').width,
                height: 180,
                backgroundColor: 'yellow'
              }}>广告3</Text>
            </ScrollView>
          </View>
          <View style={styles.products}>
            <Text>商品列表</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchbar: {
    marginTop: Platform.OS === 'ios'
        ? 20
        : 0,
    height: 40,
    flexDirection: 'row'
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 2
  },
  button: {
    flex: 1
  },
  advertisement: {
    height: 180
  },
  products: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
