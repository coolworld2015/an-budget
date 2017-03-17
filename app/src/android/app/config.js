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
	Dimensions,
	Picker,
	DatePickerAndroid,
	TouchableWithoutFeedback,
} from 'react-native';

class Config extends Component {
    constructor(props) {
        super(props);
		
		var width = Dimensions.get('window').width;
 
        this.state = {
			eventSwitchBase: false,
            textSwitchBase: appConfig.lang,
			bugANDROID: '',
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
		
    toggleTypeChange() {
        if (!this.state.eventSwitchBase) {
			appConfig.lang = 'English';
			appConfig.language = appConfig.eng;
            this.setState({
                textSwitchBase: 'English'
            });
        } else {
			appConfig.lang = 'Русский';
			appConfig.language = appConfig.rus;
            this.setState({
                textSwitchBase: 'Русский'
            });
        }
    }

    render() {	
        return (
			<View style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
				<View style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					backgroundColor: '#48BBEC',
					borderWidth: 0,
					borderColor: 'whitesmoke'
				}}>
					<View>
						<TouchableHighlight
							onPress={()=> this.goBack()}
							underlayColor='#ddd'
						>
							<Text style={{
								fontSize: 16,
								textAlign: 'center',
								margin: 14,
								fontWeight: 'bold',
								color: 'white'
							}}>
							
							</Text>
						</TouchableHighlight>	
					</View>
					<View>
						<TouchableHighlight
							onPress={()=> this.goBack()}
							underlayColor='#ddd'
						>
							<Text style={{
								fontSize: 20,
								textAlign: 'center',
								margin: 10,
								fontWeight: 'bold',
								color: 'white'
							}}>
								{appConfig.language.config} 
							</Text>
						</TouchableHighlight>	
					</View>						
					<View>
						<TouchableHighlight
							underlayColor='#ddd'
						>
							<Text style={{
								fontSize: 16,
								textAlign: 'center',
								margin: 14,
								fontWeight: 'bold'
							}}>
								 
							</Text>
						</TouchableHighlight>	
					</View>
				</View>
				
				<ScrollView>
					<View style={{
						flex: 1,
						padding: 10,
						paddingBottom: 40,
						justifyContent: 'center',
						backgroundColor: 'white'
					}}>	
                        <View style={{
							height: 50,
							borderWidth: 1,
							borderColor: '#48BBEC',
							flex: 1,
							flexDirection: 'row',
							justifyContent: 'space-between',
							borderRadius: 5
						}}>
							<View style={{
									fontSize: 18,
									marginTop: 10,
									margin: 10,
								}}>
								<Text style={{
									fontSize: 18
								}}>
									{this.state.textSwitchBase}
								</Text>
							</View>

							<View style={{
									fontSize: 18,
									marginTop: 10,
									margin: 10,
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
						
						<TouchableHighlight
							onPress={()=> this.props.onLogOut()}
							style={styles.button}>
							<Text style={styles.buttonText}>
								{appConfig.language.submit}
							</Text>
						</TouchableHighlight>
						
                    </View>
				</ScrollView>
			</View>
        )
    }
}

const styles = StyleSheet.create({
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
        fontSize: 20,
		fontWeight: 'bold'
    }
});

export default Config;