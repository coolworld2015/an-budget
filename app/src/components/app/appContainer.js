//'use strict';

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
    ActivityIndicatorIOS,
    TabBarIOS,
    NavigatorIOS,
    TextInput
} from 'react-native';

import Login from './login';
import Phones from '../phones/phones';
import PhoneSearch from '../phones/phoneSearch';
import Users from '../users/users';
import UserAdd from '../users/userAdd';
import Audit from '../audit/audit';
import AuditAdd from '../audit/auditAdd';

class AppContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTab: 'Phones'
        };

        App = {
            users: {
                refresh: false
            }
        };
    }

    onLogOut() {
        this.props.onLogOut();
    }

    render() {
        return (
            <TabBarIOS style={styles.AppContainer}>

                <TabBarIOS.Item
                    title="Phones"
                    //systemIcon="favorites"
                    icon={require('../../../phones.png')}
                    selected={this.state.selectedTab == 'Phones'}
                    onPress={()=> this.setState({selectedTab: 'Phones'})}>

                    <NavigatorIOS
                        style={{
                            flex: 1
                        }}
                        ref="phones"
                        initialRoute={{
                            component: Phones,
                            title: 'Phones',
                            rightButtonTitle: 'Search',
                            onRightButtonPress: () => {
                                this.refs.phones.navigator.push({
                                    title: "Search",
                                    component: PhoneSearch
                                });
                            }
                        }}
                    />
                </TabBarIOS.Item>

                <TabBarIOS.Item
                    title="Users"
                    //systemIcon="contacts"
                    icon={require('../../../users.png')}
                    selected={this.state.selectedTab == 'Users'}
                    onPress={()=> this.setState({selectedTab: 'Users'})}>

                    <NavigatorIOS
                        style={{
                            flex: 1
                        }}
                        ref="users"
                        initialRoute={{
                            component: Users,
                            title: 'Users',
                            rightButtonTitle: 'New',
                            onRightButtonPress: () => {
                                this.refs.users.navigator.push({
                                    title: "New user",
                                    component: UserAdd
                                });
                            }
                        }}
                    />
                </TabBarIOS.Item>

                <TabBarIOS.Item
                    title="Audit"
                    //systemIcon="history"
                    icon={require('../../../clock.png')}
                    selected={this.state.selectedTab == 'Audit'}
                    onPress={()=> this.setState({selectedTab: 'Audit'})}>

                    <NavigatorIOS
                        style={{
                            flex: 1
                        }}
                        ref="audit"
                        initialRoute={{
                            component: Audit,
                            title: 'Audit',
                            rightButtonTitle: 'Test',
                            onRightButtonPress: () => {
                                this.refs.audit.navigator.push({
                                    title: "Test",
                                    component: AuditAdd,
                                    rightButtonTitle: 'Back',
                                    onRightButtonPress: () => {
                                        this.refs.audit.navigator.popToTop();
                                    }
                                });
                            }
                        }}
                    />
                </TabBarIOS.Item>

                <TabBarIOS.Item
                    title="Logout"
                    //systemIcon="more"
                    icon={require('../../../log-out.png')}
                    selected={this.state.selectedTab == 'Logout'}
                    onPress={this.onLogOut.bind(this)}>
                </TabBarIOS.Item>

            </TabBarIOS>
        );
    }
}

/*
 systemIcon List:
 bookmarks
 contacts
 downloads
 favorites
 featured
 history
 more
 "most-recent"
 "most-viewed"
 recents
 search
 "top-rated"
 */

const styles = StyleSheet.create({
    AppContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 20,
    },
    container: {
        backgroundColor: '#F5FCFF',
        paddingTop: 40,
        padding: 10,
        alignItems: 'center',
        flex: 1
    },
    logo: {
        width: 66,
        height: 65
    },
    heading: {
        fontSize: 30,
        margin: 10,
        marginBottom: 20
    },
    loginInput: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 0,
        color: '#48BBEC'
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
        paddingTop: 10
    }
});

export default AppContainer;
