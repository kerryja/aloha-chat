import React, { Component } from "react";
import "./User.css"

class User extends Component {
	constructor(props) {
		super(props);

		this.state = {
			signedIn: false
		};
	}

	handleSignIn() {
		if (this.state.signedIn) {
			this.props.firebase.auth().signOut();
			this.setState({ signedIn: false });
		} else {
			const provider = new this.props.firebase.auth.GoogleAuthProvider();
			this.props.firebase.auth().signInWithPopup(provider);
			this.setState({ signedIn: true });
		}
	}

	componentDidMount() {
		this.props.firebase.auth().onAuthStateChanged(user => {
			this.props.setUser(user);
		});
	}

	render() {
		return (
			<div className="greeting">
				<p>Hello, {this.props.user ? this.props.user.displayName : "Guest"}!</p>
				<button onClick={() => this.handleSignIn()}>{this.state.signedIn ? "Sign Out" : "Sign In"}</button>
			</div>
		);
	}
}

export default User;
