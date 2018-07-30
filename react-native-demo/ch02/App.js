/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button, ScrollView, Dimensions, ListView, Alert, TouchableHighlight, StatusBar, Image} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const ds = new ListView.DataSource({    //创建ListView.DataSource数据源
  rowHasChanged: (r1, r2) => r1 !== r2      //是否需要重绘某一行
})

const circleSize = 8
const circleMargin = 5

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 0,
      dataSource: ds.cloneWithRows([
        '商品1',
        '商品2',
        '商品3',
        '商品4',
        '商品5',
        '商品6',
        '商品7',
        '商品8',
        '商品9',
        '商品10',
      ]),
      advertisements: [{
        url: 'https://img13.360buyimg.com/cms/jfs/t4090/228/1399180862/217278/206073fe/5874e621Nc675c6d0.jpg'
      }, {
        url: require('./advertisement-01.jpg')
      }, {
        url: 'https://img13.360buyimg.com/cms/jfs/t4090/228/1399180862/217278/206073fe/5874e621Nc675c6d0.jpg'
      }],
      searchText: '保存当前输入的文本'
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

  _renderRow = (rowData, sectionID, rowID) => {
    //标签中使用value的方法值
    return (
      <TouchableHighlight onPress={() => Alert.alert('你单击了商品列表', null, null)}>
        <View style={styles.row}>
          <Text>{rowData}</Text>    
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    const advertisementCount = this.state.advertisements.length
    const indicatorWidth = circleSize * advertisementCount + circleMargin * advertisementCount * 2
    const left = (Dimensions.get('window').width - indicatorWidth) / 2
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={'blue'}
          barStyle={'default'}
          networkActivityIndicatorVisible={true}></StatusBar>
        <View style={styles.searchbar}>     
          <TextInput style={styles.input} placeholder='搜索商品'
            onChangeText={(text) => {
              this.setState({searchText: text})
            }}></TextInput>
          <Button 
              style={styles.button} 
              title='搜索'
              onPress={() => Alert.alert('搜索内容' + this.state.searchText, null, null)}></Button>
        </View>
        <View style={styles.advertisement}>
          <ScrollView
            ref="scrollView"
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}>
            {this.state.advertisements.map((advertisement, index) => {
              if (index == 1) {
                return (
                  <TouchableHighlight key={index} onPress={() => Alert.alert('你单击了轮播图' + index, null, null)}>
                    <Image style={styles.advertisementContent}
                      source={advertisement.url}></Image>
                  </TouchableHighlight>
                )
              } else {
                return (
                  <TouchableHighlight key={index} onPress={() => Alert.alert('你单击了轮播图' + index, null, null)}>
                    <Image style={styles.advertisementContent}
                      source={{uri: advertisement.url}}></Image>
                  </TouchableHighlight>
                )
              }
            })}
          </ScrollView>
          <View style={[
            styles.indicator, {left: left}
          ]}>
            {this.state.advertisements.map((advertisement, index) => {
              return (
                <View key={index}
                  style={(index === this.state.currentPage)
                    ? styles.circleSelected
                    : styles.circle} />)
            })}
          </View>
        </View>
        <View style={styles.products}>
          <ListView dataSource={this.state.dataSource} renderRow={this._renderRow} />
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
    borderWidth: 2,
    borderRadius: 10
  },
  button: {
    flex: 1
  },
  advertisement: {
    height: 180
  },
  advertisementContent: {
    width: Dimensions.get('window').width,
    height: 180
  },
  indicator: {
    position: 'absolute',
    top: 160,
    flexDirection: 'row'
  },
  circle: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    backgroundColor: 'gray',
    marginHorizontal: circleMargin
  },
  circleSelected: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    backgroundColor: 'white',
    marginHorizontal: circleMargin
  },
  products: {
    flex: 1
  },
  row: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
