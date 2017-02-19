'use strict';

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    ListView,
    ScrollView,
    ActivityIndicator,
    TabBarIOS,
    NavigatorIOS,
    TextInput
} from 'react-native';

class AuditDetails extends Component {
    constructor(props) {
        super(props);

        var ip = props.pushEvent.ip.split(':');

        this.state = {
            id: props.pushEvent.id,
            name: props.pushEvent.name,
            date: props.pushEvent.date,
            ip: ip[3],
            description: props.pushEvent.description,
            showProgress: false
        };
    }

    render() {

        return (
            <ScrollView>
                <View style={{
                    flex: 1,
                    padding: 10,
                    justifyContent: 'flex-start'
                }}>

                    <Text style={{
                        fontSize: 24,
                        textAlign: 'center',
                        marginTop: 10,
                        fontWeight: 'bold'
                    }}>
                        {this.state.date}
                    </Text>

                    <TextInput
                        style={styles.loginInput}
                        value={this.state.name}
                        placeholder="Name">
                    </TextInput>

                    <TextInput
                        style={styles.loginInput}
                        value={this.state.id}
                        placeholder="ID">
                    </TextInput>

                    <TextInput
                        style={styles.loginInput}
                        value={this.state.ip}
                        placeholder="IP">
                    </TextInput>

                    <TextInput
                        style={styles.loginInput1}
                        value={this.state.description}
                        multiline={true}
                        placeholder="Description">
                    </TextInput>

                    <ActivityIndicator
                        animating={this.state.showProgress}
                        size="large"
                        style={styles.loader}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    AppContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray',
    },
    countHeader: {
        fontSize: 16,
        textAlign: 'center',
        padding: 15,
        backgroundColor: '#F5FCFF',
    },
    countFooter: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
        borderColor: '#D7D7D7',
        backgroundColor: 'whitesmoke'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 20,
    },
    loginInput: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 0,
        color: 'black'
    },
    loginInput1: {
        height: 150,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 0,
        color: 'black'
    },
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 24
    },
    loader: {
        marginTop: 20
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    },
    img: {
        height: 95,
        width: 75,
        borderRadius: 20,
        margin: 20
    }
});

export default AuditDetails;
