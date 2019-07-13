import React, { Component } from "react";
import Moment from "moment";
import "./MessageList.css";


class MessageList extends Component {
	constructor(props) {
		super(props);

		this.messagesRef = this.props.firebase.database().ref("messages");

		this.state = {
			messages: [],
			newMessage: ""
		};
	}

	componentDidMount() {
		this.messagesRef.on("child_added", snapshot => {
			const message = snapshot.val();
			message.key = snapshot.key;
			this.setState({ messages: this.state.messages.concat(message) });
		});
	}

	handleChange(e) {
		this.setState({ newMessage: e.target.value });
	}

	createMessage() {
		this.messagesRef.push({
			sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
			content: this.state.newMessage,
			roomId: this.props.activeRoom.key,
			username: this.props.username
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		if (!this.state.newMessage) {
			return;
		}
		this.createMessage(this.state.newMessage);
		this.setState({ newMessage: "" });
	}

	handleChange(e) {
		const newName = e.target.value;
		this.setState({ newMessage: newName });
	}

	render() {
		return (
			<section>
				<div className="message-container">
					<ul id="message-content">
						{this.state.messages
							.filter(message => message.roomId === this.props.activeRoom.key)
							.map((message, index) => {
								return (
									<li key={index} className={this.props.username === message.username ? "messge-me" : "message-other"}>
										<span className="username">{message.username}</span>
										<span className="sentAt">{Moment.unix(message.sentAt / 1000).format(
											"h:mm a"
										)}:</span>
										<span className="content">{message.content}</span>
									</li>
								);
							})}
					</ul>
					<form id="create-message" class="" onSubmit={e => this.handleSubmit(e)}>
						<div>
							<input className="message-input" type="text" name="newMessage" value={this.state.newMessage} onChange={e => this.handleChange(e)} placeholder=" Write your message here" />
							<button type="submit" class="fas fa-angle-double-right"></button>
						</div>
					</form>
				</div>
			</section>
		);
	}
}

export default MessageList;






