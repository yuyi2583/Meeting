import React, { Component } from 'react';
import { TextInput, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import NotifService from '../Component/NotifyService';

let appConfig = {
    "name": "example",
    "displayName": "React Native Push Notification Example",
    "senderID": "YOUR-GCM-ID"
}
export default class Example extends Component {

    constructor(props) {
        super(props);
        this.state = {
            senderId: appConfig.senderID
        };

        this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
    }

    setMessagePut = () => {
        let date1 = "2019/03/18 14:8";
        let date= "2019-03-18 6:18";
        let reg=new RegExp("-",'gm');
        let date2=date.replace(reg,"/"); 
        let timestamp1 = +new Date();
        let timestamp2 = Date.parse(new Date(date2));
        let difference=(timestamp1-timestamp2)/1000;
        console.log("now:" + timestamp1 + "\n2019-03-18 13:15:" + timestamp2);
        console.log(difference);
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Example app react-native-push-notification</Text>
                <View style={styles.spacer}></View>
                <TextInput style={styles.textField} value={this.state.registerToken} placeholder="Register token" />
                <View style={styles.spacer}></View>

                <TouchableOpacity style={styles.button} onPress={() => { this.notif.localNotif() }}>
                    <Text>Local Notification (now)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => { this.notif.scheduleNotif() }}>
                    <Text>Schedule Notification in 30s</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => { this.notif.cancelNotif() }}>
                    <Text>Cancel last notification (if any)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => { this.notif.cancelAll() }}>
                    <Text>Cancel all notifications</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => { this.notif.checkPermission(this.handlePerm.bind(this)) }}>
                    <Text>Check Permission</Text>
                </TouchableOpacity>

                <View style={styles.spacer}></View>
                <TextInput style={styles.textField} value={this.state.senderId} onChangeText={(e) => { this.setState({ senderId: e }) }} placeholder="GCM ID" />
                <TouchableOpacity style={styles.button} onPress={() => { this.notif.configure(this.onRegister.bind(this), this.onNotif.bind(this), this.state.senderId) }}><Text>Configure Sender ID</Text></TouchableOpacity>
                {this.state.gcmRegistered && <Text>GCM Configured !</Text>}

                <View style={styles.spacer}></View>
            </View>
        );
    }

    onRegister(token) {
        Alert.alert("Registered !", JSON.stringify(token));
        console.log(token);
        this.setState({ registerToken: token.token, gcmRegistered: true });
    }

    onNotif(notif) {
        console.log(notif);
        Alert.alert(notif.title, notif.message);
    }

    handlePerm(perms) {
        Alert.alert("Permissions", JSON.stringify(perms));
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    button: {
        borderWidth: 1,
        borderColor: "#000000",
        margin: 5,
        padding: 5,
        width: "70%",
        backgroundColor: "#DDDDDD",
        borderRadius: 5,
    },
    textField: {
        borderWidth: 1,
        borderColor: "#AAAAAA",
        margin: 5,
        padding: 5,
        width: "70%"
    },
    spacer: {
        height: 10,
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
    }
});