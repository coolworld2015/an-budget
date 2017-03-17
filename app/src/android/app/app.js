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
    TextInput,
	BackAndroid
} from 'react-native';

console.disableYellowBox = true;

import Login from './login';
import AppContainer from './appContainer';

class App extends Component {
    constructor(props) {
        super(props);
		
		BackAndroid.addEventListener('hardwareBackPress', () => {
			if (this.props.navigator) {
				this.props.navigator.pop();
			}
			return true;
		});
		
        this.state = {
            isLoggedIn: false
        };
		
        appConfig = {
            access_token: '',
			url: 'http://jwt-budget.herokuapp.com/',
			users: {
                refresh: false
            },
			goods: {
                refresh: false
            },
			projects: {
                refresh: false
            },
			departments: {
                refresh: false
            },
			employees: {
                refresh: false
            },			
			assets: {
                refresh: false
            },
			inputs: {
                refresh: false,
				inputsCount: 0
            },
			outputs: {
                refresh: false,
				outputsCount: 0
            },
			rus: {
				firstday: 'Начало периода',
				lastday: 'Конец периода',
				selectdep: 'Выбор подразделения',
				alldep: 'Все подразделения',
				selectproj: 'Выбор проекта',
				allproj: 'Все проекты',
				selectemp: 'Выбор сотрудника',
				allemp: 'Все сотрудники',
				selectres: 'Выбор ресурса',
				allres: 'Все ресурсы',
				delrec: 'Удаление записи',
				reload: 'Загрузка',
				other: 'Другое',		
				results: 'Результаты для ',
				quantity: 'Количество',
				date: 'Дата',
				phone: 'Телефон',
				address: 'Адрес',
				yes: 'Да',
				no: 'Нет',
				conform: 'Вы уверены, что хотите удалить ',
				delete: 'Удалить',
				price: 'Цена',
				submit: 'Применить',
				newrec: 'Новая запись',
				trans: 'Транзакция',
				app: 'Режим приложения',
				lang: 'Выбор языка',
				action: 'Применить',
				title: 'Управление проектами',
				menu: 'Главное меню',
				config: 'Настройки',
				log: 'Проверка полномочий',
				login: 'Логин',
				pass: 'Пароль',
				enter: 'Вход',
				error: 'Ошибка. Неверное имя или пароль !!!',
				back: 'Назад',
				assets: 'Активы',
				reports: 'Отчеты',
				resource: 'Ресурс',
				resources: 'Ресурсы',
				search: 'Поиск',
				outputs: 'Расход',
				inputs: 'Приход',
				project: 'Проект',
				projects: 'Проекты',
				department: 'Подразделение',
				departments: 'Подразделения',
				employee: 'Сотрудник',
				employees: 'Сотрудники',
				users: 'Пользователи',
				audit: 'Аудит',
				logout: 'Выход',
				change: 'Изменить',
				sys: 'Системная информация',
				load: 'Загрузка данных...',
				project_count: 'Количесто проектов: ',
				runs_count: 'Количесто запусков программы: ',
				dep_count: 'Количесто подразделений: ',
				staff_count: 'Количесто сотрудников: ',
				size: 'Размер: ',
				in_count: 'Количесто приходов: ',
				out_count: 'Количесто расходов: ',
				records: 'записей найдено',
				name: 'Наименование',
				sum: 'Сумма',
				add: 'Добавить',
				description: 'Описание',
				grn: 'Гривны',
				grns: ' грн.',
				total: 'Итого'
			},
			eng: {
				firstday: 'First day',
				lastday: 'Last day',
				selectdep: 'Select department',
				alldep: 'All departments',
				selectproj: 'Select project',
				allproj: 'All projects',
				selectemp: 'Select employee',
				allemp: 'All employees',
				selectres: 'Select resource',
				allres: 'All resources',
				delrec: 'Delete record',
				reload: 'Reload',
				other: 'Other',
				results: 'Results for ',
				quantity: 'Quantity',
				date: 'Date',
				phone: 'Phone',
				address: 'Address',
				yes: 'Yes',
				no: 'No',
				conform: 'Are you sure you want to delete ',
				delete: 'Delete',			
				price: 'Price',
				submit: 'Submit',
				newrec: 'New record',
				trans: 'Transaction',			
				app: 'Application mode',			
				lang: 'Language mode',
				action: 'Action',
				title: 'Project management',
				menu: 'Main menu',
				config: 'Configurations',
				log: 'Login',
				login: 'Login',
				pass: 'Password',
				enter: 'Enter',
				error: 'Error. Wrong name or password !!!',
				back: 'Back',
				assets: 'Assets',
				reports: 'Reports',
				resource: 'Resource',
				resources: 'Resources',
				search: 'Search here',
				outputs: 'Outputs',
				inputs: 'Inputs',
				project: 'Project',
				projects: 'Projects',
				department: 'Departament',
				departments: 'Departaments',
				employee: 'Employee',
				employees: 'Employees',
				users: 'Users',
				audit: 'Audit',
				logout: 'Logout',
				change: 'Change',
				sys: 'System information',
				load: 'Loading...',
				project_count: 'Projects: ',
				runs_count: 'Program runs: ',
				dep_count: 'Departaments: ',
				staff_count: 'Staff: ',
				size: 'Total: ',
				in_count: 'Inputs: ',
				out_count: 'Outputs: ',
				records: 'entries were found',
				name: 'Name',
				sum: 'Total',
				add: 'Add',
				description: 'Description',
				grn: 'UAH',
				grns: ' uah.',
				total: 'Total'
			},
			language: {}			
        };		
    }
	
	componentWillMount() {
		appConfig.language = appConfig.rus; // RUS !!!
	}
	
    render() {
        if (this.state.isLoggedIn) {
            return (
                <AppContainer onLogOut={this.onLogOut.bind(this)}/>
            )
        } else {
            return (
                <Login onLogin={this.onLogin.bind(this)}/>
            )
        }
    }

    onLogin() {
        console.log('onLogin');
        this.setState({isLoggedIn: true});
    }

    onLogOut() {
        console.log('onLogOut');
        this.setState({isLoggedIn: false});
    }
}

export default App;
