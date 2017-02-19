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
	BackAndroid
} from 'react-native';

class PhoneDetails extends Component {
    constructor(props) {
        super(props);
		
		BackAndroid.addEventListener('hardwareBackPress', () => {
			if (this.props.navigator) {
				this.props.navigator.pop();
			}
			return true;
		});
		
		this.state = {
			name: ''
		}	
		
		if (props.data) {
			this.state = {
				id: props.data.id,
				name: props.data.name,
				phone: props.data.phone,
				street: props.data.street,
				house: props.data.house,
				apt: props.data.apt,
				index: props.data.index
			};
		}
    }
	
    goBack(rowData) {
		this.props.navigator.pop();
	}
	
    render() {
        return (
            <ScrollView>
					<View style={{
							flexDirection: 'row',
							justifyContent: 'space-between'
						}}>
						<View>
							<TouchableHighlight
								onPress={()=> this.goBack()}
								underlayColor='#ddd'
							>
								<Text style={{
									fontSize: 20,
									textAlign: 'center',
									margin: 10,
									fontWeight: 'bold'
								}}>
									 
								</Text>
							</TouchableHighlight>	
						</View>
						<View>
							<TouchableHighlight
								underlayColor='#ddd'
							>
								<Text style={{
									fontSize: 20,
									textAlign: 'center',
									margin: 10,
									fontWeight: 'bold',
									color: 'black'
								}}>
									{this.state.name}
								</Text>
							</TouchableHighlight>	
						</View>						
						<View>
							<TouchableHighlight
								underlayColor='#ddd'
							>
								<Text style={{
									fontSize: 18,
									textAlign: 'center',
									margin: 20,
									fontWeight: 'bold'
								}}>
									 
								</Text>
							</TouchableHighlight>	
						</View>
					</View>
					
					<View style={{
						flex: 1,
						padding: 10,
						paddingBottom: 85,
						justifyContent: 'flex-start',
						backgroundColor: 'white'
					}}>
						<TextInput
							style={styles.loginInput}
							value={'Phone: ' + this.state.phone}
							>
						</TextInput>
						
						<TextInput
							style={styles.loginInput}
							value={'Str: ' + this.state.street}
							>
						</TextInput>

						<TextInput
							style={styles.loginInput}
							value={'House: ' + this.state.house}
							>
						</TextInput>	

						<TextInput
							style={styles.loginInput}
							value={'Apt: ' + this.state.apt}
							>
						</TextInput>	

						<TextInput
							style={styles.loginInput}
							value={'Zip: ' + this.state.index}
							>
						</TextInput>
						
						<TouchableHighlight
							onPress={()=> this.goBack()}

							style={styles.button}>
							<Text style={styles.buttonText}>Back</Text>
						</TouchableHighlight>
					</View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    headder: {
        fontSize: 24,
        textAlign: 'center',
        margin: 10,
        paddingTop: 10,
        fontWeight: 'bold'
    },
    details: {
        fontSize: 20,
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: 'lightgray'
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

export default PhoneDetails;
