import React, {Component} from 'react';

import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Navigator,
	TouchableHighlight,
	TouchableOpacity
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import Audit from '../audit/audit';
import AuditDetails from '../audit/auditDetails';
import AuditAdd from '../audit/auditAdd';

import Users from '../users/users';
import UserDetails from '../users/userDetails';
import UserAdd from '../users/userAdd';

import Resources from '../resources/resources';
import ResourceDetails from '../resources/resourceDetails';
import ResourceAdd from '../resources/resourceAdd';

import Projects from '../projects/projects';
import ProjectDetails from '../projects/projectDetails';
import ProjectAdd from '../projects/projectAdd';

import Departments from '../departments/departments';
import DepartmentDetails from '../departments/departmentDetails';
import DepartmentAdd from '../departments/departmentAdd';

class AppContainer extends Component {
	constructor(props) {
		super(props);				
	}
	
	render() {
		return (
			<ScrollableTabView>
 				<DepartmentsTab tabLabel="Deps" />
 				<ProjectsTab tabLabel="Projs" />
 				<ResourcesTab tabLabel="Res" />
 				<UsersTab tabLabel="Users" />
				<AuditTab tabLabel="Audit" />
			</ScrollableTabView>
		);
	}
}

class DepartmentsTab extends Component {
	constructor(props) {
		super(props);
		this.routes = [
			{title: 'Departments', index: 0},
			{title: 'Department Details', index: 1},
			{title: 'Add Department', index: 2}
		];
	}
		  
	renderScene(route, navigator) {
		switch (route.index) {
			case 0: return <Departments routes={this.routes} navigator={navigator} />
					break;			
			case 1: return <DepartmentDetails data={route.data} routes={this.routes} navigator={navigator} />
					break;
			case 2: return <DepartmentAdd data={route.data} routes={this.routes} navigator={navigator} />
					break
 		}
 	}	
	
	render() {
		return (
	  		<Navigator
			initialRoute={this.routes[0]}
			initialRouteStack={this.routes}
		    renderScene={this.renderScene.bind(this)}
			style={{padding: 0}}
		  
			configureScene={(route, routeStack) =>
				Navigator.SceneConfigs.PushFromRight}
		/>
		)
	}
}

class ProjectsTab extends Component {
	constructor(props) {
		super(props);
		this.routes = [
			{title: 'Projects', index: 0},
			{title: 'Project Details', index: 1},
			{title: 'Add Project', index: 2}
		];
	}
		  
	renderScene(route, navigator) {
		switch (route.index) {
			case 0: return <Projects routes={this.routes} navigator={navigator} />
					break;			
			case 1: return <ProjectDetails data={route.data} routes={this.routes} navigator={navigator} />
					break;
			case 2: return <ProjectAdd data={route.data} routes={this.routes} navigator={navigator} />
					break
 		}
 	}	
	
	render() {
		return (
	  		<Navigator
			initialRoute={this.routes[0]}
			initialRouteStack={this.routes}
		    renderScene={this.renderScene.bind(this)}
			style={{padding: 0}}
		  
			configureScene={(route, routeStack) =>
				Navigator.SceneConfigs.PushFromRight}
		/>
		)
	}
}

class ResourcesTab extends Component {
	constructor(props) {
		super(props);
		this.routes = [
			{title: 'Resources', index: 0},
			{title: 'Resource Details', index: 1},
			{title: 'Add Resource', index: 2}
		];
	}
		  
	renderScene(route, navigator) {
		switch (route.index) {
			case 0: return <Resources routes={this.routes} navigator={navigator} />
					break;			
			case 1: return <ResourceDetails data={route.data} routes={this.routes} navigator={navigator} />
					break;
			case 2: return <ResourceAdd data={route.data} routes={this.routes} navigator={navigator} />
					break
 		}
 	}	
	
	render() {
		return (
	  		<Navigator
			initialRoute={this.routes[0]}
			initialRouteStack={this.routes}
		    renderScene={this.renderScene.bind(this)}
			style={{padding: 0}}
		  
			configureScene={(route, routeStack) =>
				Navigator.SceneConfigs.PushFromRight}
		/>
		)
	}
}

class UsersTab extends Component {
	constructor(props) {
		super(props);
		this.routes = [
			{title: 'Users', index: 0},
			{title: 'User Details', index: 1},
			{title: 'Add User', index: 2}
		];
	}
		  
	renderScene(route, navigator) {
		switch (route.index) {
			case 0: return <Users routes={this.routes} navigator={navigator} />
					break;			
			case 1: return <UserDetails data={route.data} routes={this.routes} navigator={navigator} />
					break;
			case 2: return <UserAdd data={route.data} routes={this.routes} navigator={navigator} />
					break
 		}
 	}	
	
	render() {
		return (
	  		<Navigator
			initialRoute={this.routes[0]}
			initialRouteStack={this.routes}
		    renderScene={this.renderScene.bind(this)}
			style={{padding: 0}}
		  
			configureScene={(route, routeStack) =>
				Navigator.SceneConfigs.PushFromRight}
		/>
		)
	}
}

class AuditTab extends Component {
	constructor(props) {
		super(props);
		this.routes = [
			{title: 'Audit', index: 0},
			{title: 'Audit Details', index: 1},
			{title: 'Add Audit', index: 2}
		];
	}
		  
	renderScene(route, navigator) {
		switch (route.index) {
			case 0: return <Audit routes={this.routes} navigator={navigator} />
					break;			
			case 1: return <AuditDetails data={route.data} routes={this.routes} navigator={navigator} />
					break			
			case 2: return <AuditAdd data={route.data} routes={this.routes} navigator={navigator} />
					break
 		}
 	}	
	
	render() {
		return (
	  		<Navigator
			initialRoute={this.routes[0]}
			initialRouteStack={this.routes}
		    renderScene={this.renderScene.bind(this)}			
			style={{padding: 0}}
		  
			configureScene={(route, routeStack) =>
				Navigator.SceneConfigs.PushFromRight}
		/>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
});

module.exports = AppContainer;
