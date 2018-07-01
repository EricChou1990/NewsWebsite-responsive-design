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
class PCHeader extends React.Component {
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

	componentWillMount(){
		if (localStorage.userid!='') {
			this.setState({hasLogined:true});
			this.setState({userNickName:localStorage.userNickName,userid:localStorage.userid});
		}
	};

	setModalVisible(value)
	{
		this.setState({modalVisible: value});
	};
	handleClick(e) {
		if (e.key == "register") {
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
		//页面开始向 API 进行提交数据
		e.preventDefault();
		var myFetchOptions = {
			method: 'GET'
		};
		var formData = this.props.form.getFieldsValue();
		console.log(formData);
		fetch("http://newapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
		+ "&username="+formData.userName+"&password="+formData.password
		+"&r_userName=" + formData.r_userName + "&r_password="
		+ formData.r_password + "&r_confirmPassword="
		+ formData.r_confirmPassword, myFetchOptions)
		.then(response => response.json())
		.then(json => {
			this.setState({userNickName: json.NickUserName, userid: json.UserId});
			localStorage.userid= json.UserId;
			localStorage.userNickName = json.NickUserName;
		});
		if (this.state.action=="login") {
			this.setState({hasLogined:true});
		}
		message.success("request send！");
		this.setModalVisible(false);
	};
	callback(key) {
		if (key == 1) {
			this.setState({action: 'login'});
		} else if (key == 2) {
			this.setState({action: 'register'});
		}
	};
	logout(){
		localStorage.userid= '';
		localStorage.userNickName = '';
		this.setState({hasLogined:false});
	};
	render() {
		let {getFieldProps} = this.props.form;
		const userShow = this.state.hasLogined
			? <Menu.Item key="logout" class="register">
					<Button type="primary" htmlType="button">{this.state.userNickName}</Button>
					&nbsp;&nbsp;
					<Link target="_blank" to={`/usercenter`}>
						<Button type="dashed" htmlType="button">user center</Button>
					</Link>
					&nbsp;&nbsp;
					<Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>quit</Button>
				</Menu.Item>
			: <Menu.Item key="register" class="register">
				<Icon type="appstore"/>register/login
			</Menu.Item>;
		return (
			<header>
				<Row>
					<Col span={2}></Col>
					<Col span={4}>
						<a href="/" class="logo">
							<img src="./src/images/logo.png" alt="logo"/>
							<span>ReactNews</span>
						</a>
					</Col>
					<Col span={16}>
						<Menu mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]}>
							<Menu.Item key="top">
								<Icon type="appstore"/>World
							</Menu.Item>
							<Menu.Item key="shehui">
								<Icon type="appstore"/>Politics
							</Menu.Item>
							<Menu.Item key="guonei">
								<Icon type="appstore"/>Business
							</Menu.Item>
							<Menu.Item key="guoji">
								<Icon type="appstore"/>Tech
							</Menu.Item>
							<Menu.Item key="yule">
								<Icon type="appstore"/>Science
							</Menu.Item>
							<Menu.Item key="tiyu">
								<Icon type="appstore"/>Health
							</Menu.Item>
							<Menu.Item key="keji">
								<Icon type="appstore"/>Sports
							</Menu.Item>
							<Menu.Item key="shishang">
								<Icon type="appstore"/>Art
							</Menu.Item>
							{userShow}
						</Menu>
						<Modal title="user center" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel= {()=>this.setModalVisible(false)} onOk={() => this.setModalVisible(false)} okText="关闭">
							<Tabs type="card" onChange={this.callback.bind(this)}>
								<TabPane tab="login" key="1">
									<Form horizontal onSubmit={this.handleSubmit.bind(this)}>
										<FormItem label="account">
											<Input placeholder="your account" {...getFieldProps('userName')}/>
										</FormItem>
										<FormItem label="password">
											<Input type="password" placeholder="type your password" {...getFieldProps('password')}/>
										</FormItem>
										<Button type="primary" htmlType="submit">login</Button>
									</Form>
								</TabPane>
								<TabPane tab="register" key="2">
									<Form horizontal onSubmit={this.handleSubmit.bind(this)}>
										<FormItem label="account">
											<Input placeholder="type your password" {...getFieldProps('r_userName')}/>
										</FormItem>
										<FormItem label="password">
											<Input type="password" placeholder="please confirm your password" {...getFieldProps('r_password')}/>
										</FormItem>
										<FormItem label="confirm password">
											<Input type="password" placeholder="confirm password" {...getFieldProps('r_confirmPassword')}/>
										</FormItem>
										<Button type="primary" htmlType="submit">register</Button>
									</Form>
								</TabPane>
							</Tabs>
						</Modal>
					</Col>
					<Col span={2}></Col>
				</Row>
			</header>
		);
	};
}
export default PCHeader = Form.create({})(PCHeader);
