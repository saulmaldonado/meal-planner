import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUser, registerUser} from '../../redux/reducers/userReducer';

class GuestLanding extends Component{
    constructor(){
        super();

        this.state = {
            message: '',
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            password: '',
            passwordconfirm: '',
            household_size: 1
        }
        this.handleUserInput=this.handleUserInput.bind(this);
        this.handleUserRegistration=this.handleUserRegistration.bind(this);
    }

    // reset message
    componentDidMount() {
        this.props.getUser();
    }

    handleUserInput = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleUserRegistration = () => {
        //compare retype password to password of user
        const {first_name, last_name, username, email, password, passwordconfirm, household_size} = this.state;
        if (password === passwordconfirm) {
            this.setState({first_name: '', last_name: '', username: '', email: '', password: '', passwordconfirm: ''})
            this.props.registerUser(username, password, email, first_name, last_name, household_size);
        } else {
            this.setState({message: "Passwords do not match."})
        }
    }
    render() {
        let familySize = [];
        for (let i = 1; i <= 10; i++) {
            familySize.push(i);
        } 
        return (
            <div id="GuestLanding">
                <div className = "names">
                    <input placeholder="First name" name="first_name" value={this.state.first_name} onChange={this.handleUserInput} />
                    <input placeholder="Last name" name="last_name" value={this.state.last_name} onChange={this.handleUserInput} />
                </div>
                <input placeholder="username" name="username" value={this.state.username} onChange={this.handleUserInput} />
                <input placeholder="Email address" name="email" value={this.state.email} onChange={this.handleUserInput} />
                <input placeholder="Password" name="password" type="password" value={this.state.password} onChange={this.handleUserInput} />
                <input placeholder="Retype password" name="passwordconfirm" type="password" value={this.state.passwordconfirm} onChange={this.handleUserInput} />
                <div className = "household">
                    <h4>How many people you are cooking for. This can be changed later.</h4>
                    <select id="householdSizeSelect" onChange={e => {this.setState({household_size: e.target.value})}}>
                        {familySize.map((element, index) => {
                            return(
                                <option key={index} value={element}>{element}</option>
                            )
                        })}
                    </select>
                </div>
                <button className="register" onClick={this.handleUserRegistration}>Register</button>
                {this.props.message}
            </div>
        )
    }
}

// this page should not appear if the user is logged in
const mapStateToProps = reduxState => {
    return {
        user_id: reduxState.user.user_id,
        message: reduxState.user.message
    }
}

//login user and logout user are located in the navigation component; not needed here
export default connect(mapStateToProps, {getUser, registerUser})(GuestLanding)