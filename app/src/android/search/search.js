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
    Switch,
	Dimensions
} from 'react-native';

class Search extends Component {
    constructor(props) {
        super(props);
		
		var width = Dimensions.get('window').width;
		
        this.state = {
            showProgress: false,
            eventSwitchTitle: true,
			eventSwitchBase: true,
            textSwitchBase: 'Choose project',
			searchQuery: '',
			bugANDROID: ''
        }
    }
	
	componentDidMount() {
		this.setState({
			width: Dimensions.get('window').width
        });
	}
	
    goBack() {
		this.props.navigator.pop();
	}
	
    clearSearch() {
        this.setState({
            searchQuery: '',
            invalidValue: false
        })
    }

    onSearchPressed() {
		var searchQuery = this.state.searchQuery;
		
        if (this.state.searchQuery == '') {
			searchQuery = 'All projects'
        }
		 
		this.props.navigator.push({
			index: 2,
			data: {
				searchQuery: searchQuery,
				searchType: this.state.textSwitchBase
			}
		});
    }
	
    toggleTypeChange() {
        if (!this.state.eventSwitchBase) {
            this.setState({
                textSwitchBase: 'Choose project'
            });
        } else {
            this.setState({
                textSwitchBase: 'Choose project'
            });
        }
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
                <View style={styles.container}>
                    <TouchableHighlight
                        onPress={this.goBack.bind(this)}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Reports</Text>
                    </TouchableHighlight>

                    <View style={{
                        height: 50,
                        marginTop: 10,
                        padding: 10,
                        borderWidth: 1,
                        borderColor: '#48BBEC',
                        alignSelf: 'stretch',
                        flex: 1,
                        flexDirection: 'row',
						borderRadius: 5,
						width: this.state.width * .94
                    }}>
                        <View style={{
							marginTop: 0,
							flex: 1
						}}>
                            <Text style={{
                                fontSize: 18
                            }}>
                                {this.state.textSwitchBase}
                            </Text>
                        </View>

                        <View style={{
							marginTop: -1
						}}>
                            <Switch
                                onValueChange={(value) => {
                                    this.toggleTypeChange();
                                    this.setState({
                                        eventSwitchBase: value
                                    });
                                }}
                                value={this.state.eventSwitchBase}
                            />
                        </View>
                    </View>
					
                    <View style={{
                        height: 50,
                        marginTop: 10,
                        padding: 10,
                        borderWidth: 1,
                        borderColor: '#48BBEC',
                        alignSelf: 'stretch',
                        flex: 1,
                        flexDirection: 'row',
						borderRadius: 5,
						width: this.state.width * .94
                    }}>
                        <View style={{
							marginTop: 0,
							flex: 1
						}}>
                            <Text style={{
                                fontSize: 18
                            }}>
                                {this.state.textSwitchBase}
                            </Text>
                        </View>

                        <View style={{
							marginTop: -1
						}}>
                            <Switch
                                onValueChange={(value) => {
                                    this.toggleTypeChange();
                                    this.setState({
                                        eventSwitchBase: value
                                    });
                                }}
                                value={this.state.eventSwitchBase}
                            />
                        </View>
                    </View>		
					
                    <View style={{
                        height: 50,
                        marginTop: 10,
                        padding: 10,
                        borderWidth: 1,
                        borderColor: '#48BBEC',
                        alignSelf: 'stretch',
                        flex: 1,
                        flexDirection: 'row',
						borderRadius: 5,
						width: this.state.width * .94
                    }}>
                        <View style={{
							marginTop: 0,
							flex: 1
						}}>
                            <Text style={{
                                fontSize: 18
                            }}>
                                {this.state.textSwitchBase}
                            </Text>
                        </View>

                        <View style={{
							marginTop: -1
						}}>
                            <Switch
                                onValueChange={(value) => {
                                    this.toggleTypeChange();
                                    this.setState({
                                        eventSwitchBase: value
                                    });
                                }}
                                value={this.state.eventSwitchBase}
                            />
                        </View>
                    </View>

					<View style={{
                        height: 50,
                        marginTop: 10,
                        padding: 10,
                        borderWidth: 1,
                        borderColor: '#48BBEC',
                        alignSelf: 'stretch',
                        flex: 1,
                        flexDirection: 'row',
						borderRadius: 5,
						width: this.state.width * .94
                    }}>
						<View style={{
							marginBottom: -10,
							flex: 1
						}}>
							<TextInput
								underlineColorAndroid='rgba(0,0,0,0)'
								onChangeText={(text)=> this.setState({
									searchQuery: text,
									invalidValue: false
								})}
								value={this.state.searchQuery}
								style={{fontSize: 18}}
								placeholder="All projects">
							</TextInput>
						</View>
					</View>
					
                    {validCtrl}

                    <TouchableHighlight
                        onPress={this.onSearchPressed.bind(this)}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableHighlight>

                    {errorCtrl}

                    <ActivityIndicator
                        animating={this.state.showProgress}
                        size="large"
                        style={styles.loader}
                    />
					
					<Text>{this.state.bugANDROID}</Text>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    AppContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
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
    countHeader1: {
        fontSize: 16,
        textAlign: 'center',
        padding: 15,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 20,
    },
    container: {
		padding: 10,
        paddingBottom: 210,
        alignItems: 'center',
        flex: 1,
		backgroundColor: 'white',
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
		width: 360,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 5,
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
        fontSize: 24,
		fontWeight: 'bold'
    },
    loader: {
        marginTop: 40
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    }
});

export default Search;
