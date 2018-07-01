import React from 'react';
import {Row, Col} from 'antd';
import {
	Menu,
	Icon,
	Tabs,
	message,
	Form,
	Input,
	Button,
	CheckBox,
	Modal
} from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
import {Router, Route, Link, browserHistory} from 'react-router'
class MobileHeader extends React.Component {
	constructor() {
		super();
		this.state = {
			current: 'top',
			modalVisible: false,
			action: 'login',
			hasLogined: false,
			userNickName: '',
			userid: 0
		};
	};
	setModalVisible(value)
	{
		this.setState({modalVisible: value});
	};
	componentWillMount() {
		if (localStorage.userid != '') {
			this.setState({hasLogined: true});
			this.setState({userNickName: localStorage.userNickName, userid: localStorage.userid});
		}
	}
	handleClick(e) {
		if (e.key = "register") {
			this.setState({current: 'register'});
			this.setModalVisible(true);
		} else {
			{
				this.setState({current: e.key});
			}
		}
	};
	handleSubmit(e)
	{

		e.preventDefault();
		var myFetchOptions = {
			method: 'GET'
		};
		var formData = this.props.form.getFieldsValue();
		console.log(formData);
		fetch("http://newapi.gugujiankong.com/Handler.ashx?action=" + this.state.action + "&username=" + formData.userName + "&password=" + formData.password + "&r_userName=" + formData.r_userName + "&r_password=" + formData.r_password + "&r_confirmPassword=" + formData.r_confirmPassword, myFetchOptions).then(response => response.json()).then(json => {
			this.setState({userNickName: json.NickUserName, userid: json.UserId});
		});
		if (this.state.action == "login") {
			this.setState({hasLogined: true});
		}
		message.success("request send！");
		this.setModalVisible(false);
	};
	login() {
		this.setModalVisible(true);
	};
	callback(key) {
		if (key == 1) {
			this.setState({action: 'login'});
		} else if (key == 2) {
			this.setState({action: 'register'});
		}
	};
	render() {
		let {getFieldProps} = this.props.form;
		const userShow = this.state.hasLogined
			? <Link to={`/usercenter`}>
					<Icon type="inbox"/>
				</Link>
			: <Icon type="setting" onClick={this.login.bind(this)}/>
		return (
			<div id="mobileheader">
				<header>
					<a href="/">
						<img src="./src/images/logo.png" alt="logo"/>
						<span>ReactNews</span>
					</a>
					{userShow}
				</header>
				<Modal title="user center" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel= {()=>this.setModalVisible(false)} onOk={() => this.setModalVisible(false)} okText="关闭">
					<Tabs type="card" onChange={this.callback.bind(this)}>
						<TabPane tab="login" key="1">
							<Form horizontal onSubmit={this.handleSubmit.bind(this)}>
								<FormItem label="account">
									<Input placeholder="please login as your account" {...getFieldProps('userName')}/>
								</FormItem>
								<FormItem label="password">
									<Input type="password" placeholder="password" {...getFieldProps('password')}/>
								</FormItem>
								<Button type="primary" htmlType="submit">login</Button>
							</Form>
						</TabPane>
						<TabPane tab="register" key="2">
							<Form horizontal onSubmit={this.handleSubmit.bind(this)}>
								<FormItem label="account">
									<Input placeholder="account" {...getFieldProps('r_userName')}/>
								</FormItem>
								<FormItem label="password">
									<Input type="password" placeholder="password" {...getFieldProps('r_password')}/>
								</FormItem>
								<FormItem label="confirm your password">
									<Input type="password" placeholder="please confirm your password" {...getFieldProps('r_confirmPassword')}/>
								</FormItem>
								<Button type="primary" htmlType="submit">register</Button>
							</Form>
						</TabPane>
					</Tabs>
				</Modal>
			</div>
		);
	};
}
export default MobileHeader = Form.create({})(MobileHeader);
