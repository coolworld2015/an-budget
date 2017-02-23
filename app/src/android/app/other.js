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
				{name: 'Projects', id: 1},
				{name: 'Resources', id: 2},
				{name: 'Departments', id: 3},
				{name: 'Employees', id: 4},
				{name: 'Users', id: 5},
				{name: 'Audit', id: 6},
				{name: 'Logout', id: 7}
			]),
            showProgress: true,
            resultsCount: 1,
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
						data: rowData
					});
					break;		
					
			case 2: this.props.navigator.push({
						index: 1,
						data: rowData
					});
					break;		
					
			case 3: this.props.navigator.push({
						index: 1,
						data: rowData
					});
					break;		
					
			case 4: this.props.navigator.push({
						index: 1,
						data: rowData
					});
					break;		
					
			case 5: this.props.navigator.push({
						index: 1,
						data: rowData
					});
					break;		
					
			case 6: this.props.navigator.push({
						index: 1,
						data: rowData
					});
					break;	
					
			case 7: this.props.onLogOut();
					break;						
		}					
 
		this.props.navigator.push({
			index: 1,
			data: rowData
		});
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
            <View style={{flex: 1, justifyContent: 'center'}}>
					<View style={{
						flexDirection: 'row',
						justifyContent: 'space-between'
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
								color: 'black'
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
        backgroundColor: 'lightgray',
		color: 'black'
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
