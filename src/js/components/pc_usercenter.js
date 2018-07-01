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
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
export default class PCUserCenter extends React.Component {
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
		const props = {
			action: 'http://newsapi.gugujiankong.com/handler.ashx',
			headers: {
				"Access-Control-Allow-Origin": "*"
			},
			listType: 'picture-card',
			defaultFileList: [
				{
					uid: -1,
					name: 'xxx.png',
					state: 'done',
					url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
					thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
				}
			],
			onPreview: (file) => {
				this.setState({previewImage: file.url, previewVisible: true});
			}
		};

		const {usercollection,usercomments} = this.state;
		const usercollectionList = usercollection.length ?
		usercollection.map((uc,index)=>(
				<Card key={index} title={uc.uniquekey} extra={<a target="_blank" href={`/#/details/${uc.uniquekey}`}>Check</a>}>
					<p>{uc.Title}</p>
				</Card>
		))
		:
		'No Collection yet';

		const usercommentsList = usercomments.length ?
		usercomments.map((comment,index)=>(
				<Card key={index} title={` ${comment.datetime}  ${comment.uniquekey}`} extra={<a target="_blank" href={`/#/details/${comment.uniquekey}`}>Check</a>}>
					<p>{comment.Comments}</p>
				</Card>
		))
		:
		'No Comment yet';

		return (
			<div>
				<PCHeader/>
				<Row>
					<Col span={2}></Col>
					<Col span={20}>
						<Tabs>
							<TabPane tab="Collection List" key="1">
								<div class="comment">
									<Row>
										<Col span={24}>
											{usercollectionList}
										</Col>
									</Row>
								</div>
							</TabPane>
							<TabPane tab="Comment List" key="2">
							<div class="comment">
								<Row>
									<Col span={24}>
										{usercommentsList}
									</Col>
								</Row>
							</div>
							</TabPane>
							<TabPane tab="Set Image" key="3">
								<div class="clearfix">
									<Upload {...props}>
										<Icon type="plus"/>
										<div className="ant-upload-text">Upload photo</div>
									</Upload>
									<Modal visible ={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
										<img alt="preview" src={this.state.previewImage}/>
									</Modal>
								</div>
							</TabPane>
						</Tabs>
					</Col>
					<Col span={2}></Col>
				</Row>
				<PCFooter/>
			</div>
		);
	};
}
