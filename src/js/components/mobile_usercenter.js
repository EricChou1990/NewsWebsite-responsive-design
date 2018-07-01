import React from 'react';
import ReactDOM from 'react-dom';
import {Row, Col, Modal} from 'antd';
import {Menu, Icon} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import {
	Tabs,
	message,
	Form,
	Input,
	Button,
	Checkbox,
	Card,
	notification,
	Upload
} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
import {Router, Route, Link, browserHistory} from 'react-router'
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
export default class MobileUserCenter extends React.Component {

	constructor() {
		super();
		this.state = {
			usercollection: '',
			usercomments: '',
			previewImage: '',
			previewVisible: false
		};
	};

	componentDidMount() {
		var myFetchOptions = {
			method: 'GET'
		};
		fetch("http://newapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userid, myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({usercollection:json});
		});

		fetch("http://newapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid, myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({usercomments:json});
		});
	};

	render() {
		const {usercollection,usercomments} = this.state;
		const usercollectionList = usercollection.length ?
		usercollection.map((uc,index)=>(
				<Card key={index} title={uc.uniquekey} extra={<a href={`/#/details/${uc.uniquekey}`}>check</a>}>
					<p>{uc.Title}</p>
				</Card>
		))
		:
		'No collection yet';

		const usercommentsList = usercomments.length ?
		usercomments.map((comment,index)=>(
				<Card key={index} title={` ${comment.datetime} `} extra={<a href={`/#/details/${comment.uniquekey}`}>check</a>}>
					<p>{comment.Comments}</p>
				</Card>
		))
		:
		'No comment yet';

		return (
			<div>
				<MobileHeader/>
				<Row>
					<Col span={24}>
						<Tabs>
							<TabPane tab="collection list" key="1">
								<Row>
									<Col span={24}>
										{usercollectionList}
									</Col>
								</Row>
							</TabPane>
							<TabPane tab="comment list" key="2">
							<Row>
								<Col span={24}>
									{usercommentsList}
								</Col>
							</Row>
							</TabPane>
							<TabPane tab="set image" key="3"></TabPane>
						</Tabs>
					</Col>
				</Row>
				<MobileFooter/>
			</div>
		);
	};
}
