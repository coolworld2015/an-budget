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
    TextInput,
    Picker,
    CameraRoll
} from 'react-native';

import Users from '../users/users';

//const CameraRollView = require('./CameraRollView');

//import CameraRollPicker from 'react-native-camera-roll-picker';

class AuditAdd extends Component {
    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.state = {
            showProgress: true,
            items: [],
            item: 'New item',
            dataSource: ds.cloneWithRows([])
        };

        this.getUsers();
    }

    getUsers() {
        fetch('http://ui-base.herokuapp.com/api/users/get', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response)=> response.json())
            .then((responseData)=> {

                this.setState({
                    items: responseData.sort(this.sort)
                });
            })
            .catch((error)=> {
                this.setState({
                    serverError: true
                });
            })
            .finally(()=> {
                this.setState({
                    showProgress: false
                });
            });
    }

    sort(a, b) {
        var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
        if (nameA < nameB) {
            return -1
        }
        if (nameA > nameB) {
            return 1
        }
        return 0;
    }

    getSelectedImages(images, current) {
        var num = images.length;

        this.setState({
            num: num,
            selected: images,
        });

        console.log(current);
        console.log(this.state.selected);
    }

    render() {
        var errorCtrl = <View />;

        if (this.state.serverError) {
            errorCtrl = <Text style={styles.error}>
                Something went wrong.
            </Text>;
        }

        var validCtrl = <View />;

        if (this.state.invalidValue) {
            validCtrl = <Text style={styles.error}>
                Value required - please provide.
            </Text>;
        }

        return (
            <ScrollView>

                {errorCtrl}

                <View>
                    <Text style={{
                        fontSize: 24,
                        marginTop: 15,
                        textAlign: 'center',
                        fontWeight: "bold"
                    }}>
                        {this.state.item}
                    </Text>

                    <View style={{
                        borderColor: 'lightgray',
                        borderWidth: 5,
                        marginTop: 10,
                        margin: 5,
                        flex: 1,
                    }}>

                        <Picker style={{marginTop: -20}}
                                selectedValue={this.state.item}

                                onValueChange={(value) => (
                                    this.setState({
                                        item: value,
                                    })
                                )}>

                            {this.state.items.map((item, i) =>
                                <Picker.Item value={item.id} label={item.name} key={i}/>
                            )}

                        </Picker>
                    </View>
                </View>

                <View style={{
                    flex: 1,
                    padding: 10,
                    justifyContent: 'flex-start'
                }}>


                    <TextInput
                        onChangeText={(text)=> this.setState({
                            name: text,
                            invalidValue: false
                        })}
                        style={styles.loginInput}
                        value={this.state.name}
                        placeholder="Name">
                    </TextInput>

                    <TextInput
                        onChangeText={(text)=> this.setState({
                            pass: text,
                            invalidValue: false
                        })}
                        style={styles.loginInput}
                        value={this.state.pass}
                        placeholder="Password">
                    </TextInput>

                    <TextInput
                        onChangeText={(text)=> this.setState({
                            description: text,
                            invalidValue: false
                        })}
                        style={styles.loginInput}
                        value={this.state.description}
                        placeholder="Description">
                    </TextInput>

                    <TextInput
                        onChangeText={(text)=> this.setState({
                            description: text,
                            invalidValue: false
                        })}
                        style={styles.loginInput}
                        value={this.state.description}
                        placeholder="Description">
                    </TextInput>

                    {validCtrl}

                    <TouchableHighlight
                        style={styles.button}>
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableHighlight>

                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    imgsList: {
        flex: 1,
        flexDirection: 'row',
        padding: 0,
        alignItems: 'center',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1,
        backgroundColor: '#fff'
    },
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
        color: 'gray'
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
        top: 80,
        left: 140,
        position: 'absolute'
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    },
    img: {
        height: 300,
        width: 300,
        borderRadius: 20,
        margin: 20,
        alignItems: 'center'
    }
});

export default AuditAdd;
