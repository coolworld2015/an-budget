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
    Picker
} from 'react-native';

class InputAdd extends Component {
    constructor(props) {
        super(props);
		
        let d = new Date;
        let todayDate = d.getMonth() + 1 + '/' + (d.getDate()) + '/' + d.getFullYear();
		let time = d.toTimeString().split(' ');
		let date = todayDate+ ' ' + time[0];
		
        this.state = {
            showProgress: false,
			serverError: true,
            projects: [],
            departments: [],
            employees: [],
            goods: [],
			resultsCount: appConfig.inputs.inputsCount,
			date: date
        };
		
    }
	
	componentDidMount() {
		this.getProjects();
		this.getDepartments();
		this.getEmployees();
		this.getGoods();
	}
	
	getGoods() {
        fetch(appConfig.url + 'api/goods/get', {			
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
				items.unshift({name: 'Select resource'});
                this.setState({
                    goods: items,
					serverError: false
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
	
	getEmployees() {
        fetch(appConfig.url + 'api/employees/get', {			
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
				items.unshift({name: 'Select employee'});
                this.setState({
                    employees: items,
					serverError: false
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
				items.unshift({name: 'Select project'});
                this.setState({
                    projects: items,
					serverError: false
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

    getDepartments() {
        fetch(appConfig.url + 'api/departments/get', {			
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
				items.unshift({name: 'Select department'});
                this.setState({
                    departments: items,
					serverError: false
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

    addUser() {
        if (this.state.name == undefined ||
            this.state.pass == undefined ||
            this.state.description == undefined) {
            this.setState({
                invalidValue: true
            });
            return;
        }

        this.setState({
            showProgress: true,
			bugANDROID: ' '
        });
	}
	
	goBack() {
		this.props.navigator.pop();
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
			<View style={{flex: 1, justifyContent: 'center'}}>
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
								fontSize: 16,
								textAlign: 'center',
								margin: 14,
								fontWeight: 'bold',
								color: 'darkblue'
							}}>
								Back
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
								marginRight: 40,
								fontWeight: 'bold',
								color: 'black'
							}}>
								 New
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
						paddingTop: 0,
						paddingBottom: 0,
						marginTop: 0,
						marginBottom: 0,
						backgroundColor: 'white'
					}}>
						<TextInput
							underlineColorAndroid='rgba(0,0,0,0)'
							onChangeText={(text)=> this.setState({
								resultsCount: text,
								invalidValue: false
							})}
							style={styles.loginInput}
							value={this.state.resultsCount}
							placeholder="resultsCount">
						</TextInput>
						
						<TextInput
							underlineColorAndroid='rgba(0,0,0,0)'
							style={styles.loginInput}
							value={this.state.date}
							placeholder="date">
						</TextInput>
					</View>
					
					<View style={{backgroundColor: 'white'}}>
						<View style={{
							borderColor: 'lightgray',
							borderWidth: 5,
							marginTop: 10,
							margin: 10,
							marginBottom: 0,
							flex: 1,
						}}>
							<Picker style={{marginTop: 0}}
                                selectedValue={this.state.project}

                                onValueChange={(value) => {
									let arr = [].concat(this.state.projects);
 									let project = arr.filter((el) => el.id == value);
 
                                    this.setState({
                                        project: value,
                                        id: project[0].id,
                                        name: project[0].name,
										pass: project[0].pass,
										description: project[0].description,
										invalidValue: false
                                    })
                                }}>

								{this.state.projects.map((item, i) =>
									<Picker.Item value={item.id} label={item.name} key={i}/>
								)}
							</Picker>
						</View>
					</View>
					
					<View style={{backgroundColor: 'white'}}>
						<View style={{
							borderColor: 'lightgray',
							borderWidth: 5,
							marginTop: 10,
							margin: 10,
							marginBottom: 0,
							flex: 1,
						}}>
							<Picker style={{marginTop: 0}}
                                selectedValue={this.state.department}

                                onValueChange={(value) => {
									let arr = [].concat(this.state.departments);
 									let department = arr.filter((el) => el.id == value);
 
                                    this.setState({
                                        department: value,
                                        id: department[0].id,
                                        name: department[0].name,
										pass: department[0].pass,
										description: department[0].description,
										invalidValue: false
                                    })
                                }}>

								{this.state.departments.map((item, i) =>
									<Picker.Item value={item.id} label={item.name} key={i}/>
								)}
							</Picker>
						</View>
					</View>
					
					<View style={{backgroundColor: 'white'}}>
						<View style={{
							borderColor: 'lightgray',
							borderWidth: 5,
							marginTop: 10,
							margin: 10,
							marginBottom: 0,
							flex: 1,
						}}>
							<Picker style={{marginTop: 0}}
                                selectedValue={this.state.employee}

                                onValueChange={(value) => {
									let arr = [].concat(this.state.employees);
 									let employee = arr.filter((el) => el.id == value);
 
                                    this.setState({
                                        employee: value,
                                        id: employee[0].id,
                                        name: employee[0].name,
										pass: employee[0].pass,
										description: employee[0].description,
										invalidValue: false
                                    })
                                }}>

								{this.state.employees.map((item, i) =>
									<Picker.Item value={item.id} label={item.name} key={i}/>
								)}
							</Picker>
						</View>
					</View>					
					
					<View style={{backgroundColor: 'white'}}>
						<View style={{
							borderColor: 'lightgray',
							borderWidth: 5,
							marginTop: 10,
							margin: 10,
							marginBottom: 0,
							flex: 1,
						}}>
							<Picker style={{marginTop: 0}}
                                selectedValue={this.state.good}

                                onValueChange={(value) => {
									let arr = [].concat(this.state.goods);
 									let good = arr.filter((el) => el.id == value);
 
                                    this.setState({
                                        good: value,
                                        id: good[0].id,
                                        name: good[0].name,
										price: good[0].price,
										description: good[0].description,
										invalidValue: false
                                    })
                                }}>

								{this.state.goods.map((item, i) =>
									<Picker.Item value={item.id} label={item.name} key={i}/>
								)}
							</Picker>
						</View>
					</View>
					
					<View style={{
						flex: 1,
						padding: 10,
						paddingTop: 0,
						marginTop: 0,
						backgroundColor: 'white'
					}}>
						<TextInput
							underlineColorAndroid='rgba(0,0,0,0)'
							onChangeText={(text)=> this.setState({
								name: text,
								invalidValue: false
							})}
							style={styles.loginInput}
							value={this.state.name}
							placeholder="Name">
						</TextInput>
						
						<TextInput
							underlineColorAndroid='rgba(0,0,0,0)'
							style={styles.loginInput}
							value={this.state.id}
							placeholder="ID">
						</TextInput>

						<TextInput
							underlineColorAndroid='rgba(0,0,0,0)'
							onChangeText={(text)=> this.setState({
								pass: text,
								invalidValue: false
							})}
							style={styles.loginInput}
							value={this.state.pass}
							placeholder="Password">
						</TextInput>

						<TextInput
							underlineColorAndroid='rgba(0,0,0,0)'
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
							onPress={()=> this.addUser()}
							style={styles.button}>
							<Text style={styles.buttonText}>Add</Text>
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
        color: 'black'
    },
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 24
    },
    loader: {
		marginTop: 30
    },
    error: {
        color: 'red',
        paddingTop: 20,
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

export default InputAdd;
