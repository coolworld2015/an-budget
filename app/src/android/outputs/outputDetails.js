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
	BackAndroid,
	Alert
} from 'react-native';

class OutputDetails extends Component {
    constructor(props) {
        super(props);
		
		BackAndroid.addEventListener('hardwareBackPress', () => {
			if (this.props.navigator) {
				this.props.navigator.pop();
			}
			return true;
		});			
		
		this.state = {
			serverError: false
		}	
		
		if (props.data) {
			this.state = {
				id: props.data.id,
				invoiceID: props.data.invoiceID,
				date: props.data.date,
				project: props.data.project,
				projectID: props.data.projectID,
				department: props.data.department,				
				departmentID: props.data.departmentID,				
				employee: props.data.employee,
				employeeID: props.data.employeeID,
				product: props.data.product,	
				productID: props.data.productID,				
				description: props.data.description,
				
				priceShow: ((+props.data.price).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 "),
				quantityShow: ((+props.data.quantity).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 "),
				totalShow: ((+props.data.total).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 "),				
				
				price: props.data.price,
				quantity: props.data.quantity,
				total: props.data.total,
				showProgress: false,
				serverError: false
			};
		}		
    }

    deleteItemDialog() {
		Alert.alert(
			'Delete record',
			'Are you sure you want to delete record ' + this.state.invoiceID + '?',
			[
				{text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
				{
					text: 'OK', onPress: () => {
					this.deleteItem();
					}
				},
			]
		);	
	}
	
    deleteItem() {		
        this.setState({
            showProgress: true,
			bugANDROID: ' '
        });

        fetch(appConfig.url + 'api/outputs/delete', {
            method: 'post',
            body: JSON.stringify({
                id: this.state.id,
				date: this.state.date,
				department: this.state.department,
				departmentID: this.state.departmentID,
				description: this.state.description,
				employee: this.state.employee,
				employeeID: this.state.employeeID,
				invoiceID: this.state.invoiceID,
				price: this.state.price,
				product: this.state.product,
				productID: this.state.productID,
				project: this.state.project,
				projectID: this.state.projectID,
				quantity: this.state.quantity,
				total: this.state.total,
				authorization: appConfig.access_token
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
			.then((response)=> response.json())
            .then((responseData)=> {
				console.log(responseData);
				if (responseData) {
					appConfig.outputs.refresh = true;
					appConfig.assets.refresh = true;
					appConfig.projects.refresh = true;
					appConfig.departments.refresh = true;
					appConfig.employees.refresh = true;
					this.props.navigator.pop();
				} else {
					this.setState({
						badCredentials: true
					});
				}
            })
            .catch((error)=> {
                console.log(error);
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
		
		var loader = <View />;
				
		if (this.state.showProgress) {
			loader = <ActivityIndicator
				animating={true}
				size="large"
				style={styles.loader}
			/>	
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
								Back
							</Text>
						</TouchableHighlight>	
					</View>
					<View style={{flex:1,flexDirection:'column', flexWrap:'wrap'}}>
						<TouchableHighlight
							underlayColor='#ddd'
						>
							<Text style={{
								fontSize: 20,
								textAlign: 'center',
								margin: 10,
								fontWeight: 'bold',
								color: 'white'
							}}>
								{this.state.project}
							</Text>
						</TouchableHighlight>	
					</View>						
					<View>
						<TouchableHighlight
							onPress={()=> this.deleteItemDialog()}
							underlayColor='#ddd'
						>
							<Text style={{
								fontSize: 16,
								textAlign: 'center',
								margin: 14,
								fontWeight: 'bold',
								color: 'white'
							}}>
								Delete
							</Text>
						</TouchableHighlight>	
					</View>
				</View>
										
				<ScrollView>
					<View style={{
						flex: 1,
						padding: 10,
						paddingBottom: 40,
						justifyContent: 'flex-start',
						backgroundColor: 'white'
					}}>					
						
						{loader}
						
						<View>
							<Text style={styles.itemText}>
								ID: {this.state.invoiceID}
							</Text>		
						</View>
						
						<Text style={styles.itemText}>
							Date: {this.state.date}
						</Text>		
						
						<Text style={styles.itemText}>
							Project: {this.state.project}
						</Text>			
						
						<Text style={styles.itemText}>
							Department: {this.state.department}
						</Text>		
						
						<Text style={styles.itemText}>
							Employee: {this.state.employee}
						</Text>		
						
						<Text style={styles.itemText}>
							Product: {this.state.product}
						</Text>		
						
						<Text style={styles.itemText}>
							Price: {this.state.priceShow}
						</Text>			
						
						<Text style={styles.itemText}>
							Quantity: {this.state.quantityShow}
						</Text>			
						
						<Text style={styles.itemText}>
							Description: {this.state.description}
						</Text>				
						
						<Text style={styles.itemText}>
							Total: {this.state.totalShow}
						</Text>

						<TouchableHighlight
							onPress={()=> this.goBack()}
							style={styles.button}>
							<Text style={styles.buttonText}>Back</Text>
						</TouchableHighlight>
						
						<Text>{this.state.bugANDROID}</Text>
					</View>
				</ScrollView>
			</View>
        );
    }
}

const styles = StyleSheet.create({
    itemText: {
		fontSize: 20,
		textAlign: 'left',
		margin: 5,
		fontWeight: 'bold',
		color: 'black'
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
        borderRadius: 5,
        color: 'black'
    },
    loginInput1: {
        height: 100,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'lightgray',
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
        fontSize: 24
    },
    loader: {
        //marginTop: 40
    },
    error: {
        color: 'red',
        //paddingTop: 10,
        textAlign: 'center'
    },
    img: {
        height: 95,
        width: 75,
        borderRadius: 20,
        margin: 20
    }
});

export default OutputDetails;
/*
						<TextInput
							underlineColorAndroid='rgba(0,0,0,0)'
							style={styles.loginInput}
							value={this.state.invoiceID}
							placeholder="invoiceID">
						</TextInput>
						
						<TextInput
							underlineColorAndroid='rgba(0,0,0,0)'
							style={styles.loginInput}
							value={this.state.date}
							placeholder="date">
						</TextInput>
												
						<TextInput
							underlineColorAndroid='rgba(0,0,0,0)'
							style={styles.loginInput}
							value={this.state.project}
							placeholder="project">
						</TextInput>		
						
						<TextInput
							underlineColorAndroid='rgba(0,0,0,0)'
							style={styles.loginInput}
							value={this.state.department}
							placeholder="department">
						</TextInput>				
						
						<TextInput
							underlineColorAndroid='rgba(0,0,0,0)'
							style={styles.loginInput}
							value={this.state.employee}
							placeholder="employee">
						</TextInput>		
						
						<TextInput
							underlineColorAndroid='rgba(0,0,0,0)'
							style={styles.loginInput}
							value={this.state.product}
							placeholder="product">
						</TextInput>		
						
						<TextInput
							underlineColorAndroid='rgba(0,0,0,0)'
							style={styles.loginInput}
							value={this.state.priceShow}
							placeholder="price">
						</TextInput>	
						
						<TextInput
							underlineColorAndroid='rgba(0,0,0,0)'
							style={styles.loginInput}
							value={this.state.quantityShow}
							placeholder="quantity">
						</TextInput>

						<TextInput
							underlineColorAndroid='rgba(0,0,0,0)'
							multiline={true}
							style={styles.loginInput1}
							value={this.state.description}
							placeholder="Description">
						</TextInput>
						
						<TextInput
							underlineColorAndroid='rgba(0,0,0,0)'
							style={styles.loginInput}
							value={this.state.totalShow}
							placeholder="Total">
						</TextInput>
*/