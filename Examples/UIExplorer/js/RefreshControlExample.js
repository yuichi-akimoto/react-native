/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @providesModule RefreshControlExample
 */
'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
  ScrollView,
  StyleSheet,
  RefreshControl,
  Text,
  TouchableWithoutFeedback,
  View,
} = ReactNative;

const styles = StyleSheet.create({
  row: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 20,
    backgroundColor: '#3a5795',
    margin: 5,
  },
  text: {
    alignSelf: 'center',
    color: '#fff',
  },
  scrollview: {
    flex: 1,
  },
});

class Row extends React.Component {
  _onClick = () => {
    this.props.onClick(this.props.data);
  };

  render() {
    return (
     <TouchableWithoutFeedback onPress={this._onClick} >
        <View style={styles.row}>
          <Text style={styles.text}>
            {this.props.data.text + ' (' + this.props.data.clicks + ' clicks)'}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

class RefreshControlExample extends React.Component {
  static title = '<RefreshControl>';
  static description = 'Adds pull-to-refresh support to a scrollview.';

  state = {
    isRefreshing: false,
    loaded: 0,
    rowData: Array.from(new Array(20)).map(
      (val, i) => ({text: 'Initial row ' + i, clicks: 0})),
  };

  _onClick = (row) => {
    row.clicks++;
    this.setState({
      rowData: this.state.rowData,
    });
  };

  render() {
    const rows = this.state.rowData.map((row, ii) => {
      return <Row key={ii} data={row} onClick={this._onClick}/>;
    });
    return (
      <ScrollView
        style={styles.scrollview}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            tintColor="#ff0000"
            title="Loading..."
            titleColor="#00ff00"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />
        }>
        {rows}
      </ScrollView>
    );
  }

  _onRefresh = () => {
    this.setState({isRefreshing: true});
    setTimeout(() => {
      // prepend 10 items
      const rowData = Array.from(new Array(10))
      .map((val, i) => ({
        text: 'Loaded row ' + (+this.state.loaded + i),
        clicks: 0,
      }))
      .concat(this.state.rowData);

      this.setState({
        loaded: this.state.loaded + 10,
        isRefreshing: false,
        rowData: rowData,
      });
    }, 5000);
  };
}

module.exports = RefreshControlExample;
