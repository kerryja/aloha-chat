import React, { Component } from "react";
import "./RoomList.css";

class RoomList extends Component {
	constructor(props) {
		super(props);

		this.roomsRef = this.props.firebase.database().ref("rooms");
		this.createRoom = this.createRoom.bind(this);

		this.state = {
			rooms: [],
			newRoomName: ""
		};
	}

	componentDidMount() {
		this.roomsRef.on("child_added", snapshot => {
			const room = snapshot.val();
			room.key = snapshot.key;
			this.setState({ rooms: this.state.rooms.concat(room) });
		});
	}

	createRoom() {
		this.roomsRef.push({ name: this.state.newRoomName });
		this.setState({ name: "" });
	}

	handleChange(e) {
		const newName = e.target.value;
		this.setState({ newRoomName: newName });
	}

	handleSubmit(e) {
		e.preventDefault();
		if (!this.state.newRoomName) {
			return;
		}
		this.createRoom(this.state.newRoomName);
		this.setState({ newRoomName: "" });
	}

	handleRoomClick(room) {
		this.props.setActiveRoom(room);
	}

	render() {
		return (
			<section>
				<ul className="rooms">
					{this.state.rooms.map((room, index) => {
						return (
							<li key={index} className={this.props.activeRoom.name === room.name ? "active-room" : "other-room"}>
								<a href="#" onClick={() => this.handleRoomClick(room)}> {room.name} </a>
							</li>
						);
					})}
				</ul>
				<form id="create-room" onSubmit={e => this.handleSubmit(e)}>
					<div>
						<input class="room-input" type="text" name="newRoomName" value={this.state.newRoomName} onChange={e => this.handleChange(e)} placeholder="  Create a new room" />
						<button type="submit">+</button>
					</div>
				</form>

				<div className="emojis">
					<span>🌴</span>
					<span>🌺</span>
					<span>🍹</span>
					<span>🕶️</span>
					<span>☀️</span>
				</div>
			</section>
		);
	}
}

export default RoomList;
