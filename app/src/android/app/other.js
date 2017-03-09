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
    Alert
} from 'react-native';

class Other extends Component {
    constructor(props) {
        super(props);
		
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.state = {
            dataSource: ds.cloneWithRows([
				{name: 'Reports', id: 1},
				{name: 'Projects', id: 10},
				{name: 'Resources', id: 20},
				{name: 'Departments', id: 30},
				{name: 'Employees', id: 40},
				{name: 'Users', id: 50},
				{name: 'Audit', id: 60},
				{name: 'Logout', id: 70}
			]),
            showProgress: true,
            resultsCount: 7,
            recordsCount: 25,
            positionY: 0
        };
    }	
	
    getAudit() {		
        fetch(appConfig.url + 'api/audit/get', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
				'Authorization': appConfig.access_token
            }
        })
            .then((response)=> response.json())
            .then((responseData)=> {			
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.slice(0, 25)),
                    resultsCount: responseData.length,
                    responseData: responseData,
                    filteredItems: responseData
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

    showDetails(rowData) {
		switch (rowData.id) {
			case 1: this.props.navigator.push({
						index: 1,
					});
					break;				
					
			case 10: this.props.navigator.push({
						index: 10,
					});
					break;		
					
			case 20: this.props.navigator.push({
						index: 20,
						data: rowData
					});
					break;		
					
			case 30: this.props.navigator.push({
						index: 30,
						data: rowData
					});
					break;		
					
			case 40: this.props.navigator.push({
						index: 40,
						data: rowData
					});
					break;		
					
			case 50: this.props.navigator.push({
						index: 50,
						data: rowData
					});
					break;		
					
			case 60: this.props.navigator.push({
						index: 60,
						data: rowData
					});
					break;	
					
			case 70: this.props.onLogOut();
					break;						
		}					
    }

    renderRow(rowData) {
        return (
            <TouchableHighlight
                onPress={()=> this.showDetails(rowData)}
                underlayColor='#ddd'
            >
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    padding: 20,
                    alignItems: 'center',
                    borderColor: '#D7D7D7',
                    borderBottomWidth: 1,
                    backgroundColor: '#fff'
                }}>
                    <Text style={{
						backgroundColor: '#fff', 
						color: 'black', 
						fontWeight: 'bold',
						fontSize: 20
						}}>
                        {rowData.name}
                    </Text>
                </View>
            </TouchableHighlight>
        );
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
							underlayColor='#ddd'
						>
							<Text style={{
								fontSize: 16,
								textAlign: 'center',
								margin: 14,
								fontWeight: 'bold',
								color: 'darkblue'
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
								marginRight: 20,
								fontWeight: 'bold',
								color: 'white'
							}}>
								Other
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
								fontWeight: 'bold',
								color: 'darkblue'
							}}>
								 
							</Text>
						</TouchableHighlight>	
					</View>
				</View>
				
                <ScrollView>
                    <ListView
						enableEmptySections={true}
                        style={{marginTop: 0, marginBottom: 0}}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                    />
                </ScrollView>

                <View style={{marginBottom: 0}}>
                    <Text style={styles.countFooter}>
                        {this.state.resultsCount} entries were found.
                    </Text>
                </View>

            </View>
        )
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
        backgroundColor: '#48BBEC',
		color: 'white',
		fontWeight: 'bold'
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

export default Other;
