import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import DrawerLayout from 'react-native-drawer-layout';
import Routes from './Routes';

// main entry point
var App = React.createClass({

  render: function() {
    // this variable is DRAWER LAYOUT and holds some SETTING items
    // NOT IMPLEMENTED YET because of time restriction
    const navigationView = (
      <View style={[styles.container]}>
        <Text>JotForm Settings here</Text>
        <Text></Text>
        <Text></Text>
        <Button
          onPress={()=>console.log("clicked Notifications")}
          title="Notifications"
          color="#FAEBD7"
          accessibilityLabel="Learn more about edit operation"
        />
        <Text></Text>
        <Text></Text>
        <Button
          onPress={()=>console.log("clicked Vibrate")}
          title="Vibrate"
          color="#FAEBD7"
          accessibilityLabel="Learn more about edit operation"
        />
        <Text></Text>
        <Text></Text>
        <Button
          onPress={()=>console.log("clicked Sync")}
          title="Sync"
          color="#FAEBD7"
          accessibilityLabel="Learn more about edit operation"
        />
      </View>
    );
    // end of drawer layout options */

    return (
      <DrawerLayout
        drawerBackgroundColor="white"
        drawerWidth={200}
        renderNavigationView={() => navigationView}>
        { /* all layouts at here */}
        <Routes />  
      </DrawerLayout>
    );
  }

});

// css for center-alignment
var styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  }
});

module.exports = App;