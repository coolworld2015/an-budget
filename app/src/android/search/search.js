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

class Search extends Component {
    constructor(props) {
        super(props);
		
		var width = Dimensions.get('window').width;
		
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
		
		let d = new Date;
		var todayDate = d.toLocaleDateString();
		
        this.state = {
            showProgress: false,
            eventSwitchTitle: true,
			eventSwitchBase: true,
            textSwitchBase: 'Choose project',
			searchQuery: 'All projects',
			bugANDROID: '',
			items: [],
            item: 'New item',
            dataSource: ds.cloneWithRows([]),
			
			presetDate: new Date(),
			simpleDate: new Date(),
			spinnerDate: new Date(),
			calendarDate: new Date(),
			defaultDate: new Date(),
			allDate: new Date(),
			startText: '01/01/17',
			endText: todayDate,
			simpleText: 'pick a date',
			spinnerText: 'pick a date',
			calendarText: 'pick a date',
			defaultText: 'pick a date',
			minText: 'pick a date, no earlier than today',
			maxText: 'pick a date, no later than today',
			presetText: 'pick a date, preset to 2020/5/5',
			allText: 'pick a date between 2020/5/1 and 2020/5/10'
        }
    }
	
	componentDidMount() {
		this.setState({
			width: Dimensions.get('window').width
        });
		this.getProjects();
	}

    getProjects() {
        fetch(appConfig.url + 'api/projects/get', {			
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
				'Authorization': appConfig.access_token
            }
        })
            .then((response)=> response.json())
            .then((responseData)=> {
				var items = responseData.sort(this.sort);
				items.unshift({name: 'All projects'});
                this.setState({
                    items: items
                });
            })
            .catch((error)=> {
                this.setState({
                    serverError: true
                });
            })
            .finally(()=> {
                this.setState({
                    showProgress: false,
                    serverError: false
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
	
	showPicker = async (stateKey, options) => {
		try {
			var newState = {};
			const {action, year, month, day} = await DatePickerAndroid.open(options);
			if (action === DatePickerAndroid.dismissedAction) {
				//newState[stateKey + 'Text'] = 'dismissed';
			} else {
				var date = new Date(year, month, day);
				newState[stateKey + 'Text'] = date.toLocaleDateString();
				newState[stateKey + 'Date'] = date;
			}
			this.setState(newState);
		} catch ({code, message}) {
			console.warn(`Error in example '${stateKey}': `, message);
		}
	};

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
								//marginRight: 40,
								fontWeight: 'bold',
								color: 'white'
							}}>
								 Reports
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
					<View style={{backgroundColor: 'white',         
						flex: 1,
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center'
					}}>
						<View style={{
							borderColor: 'lightgray',
							borderWidth: 5,
							marginTop: 15,
							margin: 5,
							marginBottom: 0,
							width: 360
						}}>

							<Picker style={{marginTop: 0}}
                                selectedValue={this.state.item}

                                onValueChange={(value) => {
									let arr = [].concat(this.state.items);
 									let item = arr.filter((el) => el.id == value);
 
                                    this.setState({
                                        item: value,
                                        id: item[0].id,
                                        searchQuery: item[0].name,
										pass: item[0].pass,
										description: item[0].description,
										invalidValue: false
                                    })
                                }}>

								{this.state.items.map((item, i) =>
									<Picker.Item value={item.id} label={item.name} key={i}/>
								)}
							</Picker>
						</View>
					</View>

					<View style={{
						flex: 1,
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center'
					}}>
						<TextInput
							underlineColorAndroid='rgba(0,0,0,0)'
							onChangeText={(text)=> this.setState({
								searchQuery: text,
								invalidValue: false
							})}
							style={styles.loginInput}
							value={this.state.searchQuery}
							placeholder="Search query">
						</TextInput>	
						
						<TouchableHighlight
							onPress={this.showPicker.bind(this, 'start', {date: this.state.simpleDate})}
							style={styles.button1}>
							<Text style={styles.buttonText1}>Begin: {this.state.startText}</Text>
						</TouchableHighlight>						
						
						<TouchableHighlight
							onPress={this.showPicker.bind(this, 'end', {date: this.state.simpleDate})}
							style={styles.button1}>
							<Text style={styles.buttonText1}>End: {this.state.endText}</Text>
						</TouchableHighlight>	
										
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
					</View>
				</ScrollView>
			</View>
        )
    }
}

const styles = StyleSheet.create({
	text: {
		color: 'black',
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
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    button1: {
        height: 50,
        borderWidth: 1,
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        margin: 10,
        marginBottom: 0,
        justifyContent: 'center',
        //alignItems: 'center',
        borderRadius: 5
    },    
    buttonText: {
        color: '#fff',
        fontSize: 24,
		fontWeight: 'bold'
    },    
	buttonText1: {
        fontSize: 20,
		fontWeight: 'bold',
		color: 'gray',
		textAlign: 'left',
		marginLeft: 5,
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

/*

						<TouchableWithoutFeedback
							onPress={this.showPicker.bind(this, 'spinner', {date: this.state.spinnerDate, mode: 'spinner'})}>
							<Text style={styles.text}>{this.state.spinnerText}</Text>
						</TouchableWithoutFeedback>

						<TouchableWithoutFeedback
							onPress={this.showPicker.bind(this, 'calendar', {date: this.state.calendarDate, mode: 'calendar'})}>
							<Text style={styles.text}>{this.state.calendarText}</Text>
						</TouchableWithoutFeedback>

						<TouchableWithoutFeedback
							onPress={this.showPicker.bind(this, 'default', {date: this.state.defaultDate, mode: 'default'})}>
							<Text style={styles.text}>{this.state.defaultText}</Text>
						</TouchableWithoutFeedback>

						<TouchableWithoutFeedback
							onPress={this.showPicker.bind(this, 'preset', {date: this.state.presetDate})}>
							<Text style={styles.text}>{this.state.presetText}</Text>
						</TouchableWithoutFeedback>

						<TouchableWithoutFeedback
							onPress={this.showPicker.bind(this, 'min', {
							date: this.state.minDate,
							minDate: new Date(),
						})}>
							<Text style={styles.text}>{this.state.minText}</Text>
						</TouchableWithoutFeedback>

						<TouchableWithoutFeedback
							onPress={this.showPicker.bind(this, 'max', {
							date: this.state.maxDate,
							maxDate: new Date(),
						})}>
							<Text style={styles.text}>{this.state.maxText}</Text>
						</TouchableWithoutFeedback>

						<TouchableWithoutFeedback
							onPress={this.showPicker.bind(this, 'all', {
							date: this.state.allDate,
							minDate: new Date(2020, 4, 1),
						maxDate: new Date(2020, 4, 10),
						})}>
							<Text style={styles.text}>{this.state.allText}</Text>
						</TouchableWithoutFeedback>
*/
						
/*
 
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
			</View>
*/			