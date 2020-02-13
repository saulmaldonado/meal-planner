import React, {Component} from 'react';
import axios from 'axios'
import SearchItem from './SearchItem';
import ListItem from './ListItem';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class GroceryList extends Component{
    constructor(){
        super();
        this.state = {
            searchInput: '',
            searchResults: [],
            list: [],
            editMode: false
        }
    }
    getSearchResults = () => {
         axios.post('/api/ingredient/search', {searchPhrase: this.state.searchInput})
                .then(res => {
                    this.setState({
                        searchResults: res.data
                    })
                })
                .catch(err => console.log(err.response.data))
    }

    addToList = async(ingredient) => {
        let price = await axios.post('/api/ingredient/price', {id: ingredient.id, amount: ingredient.amount, unit:ingredient.unit})
                            .then(res => res.data)

                            
        this.setState({
            list: [...this.state.list, {...ingredient, price: price}]
        })
        console.log(this.state.list);
    }
    
    removeItem = (i) => {
        let list = this.state.list.slice()

        list.splice(i, 1)

        this.setState({
            list : list 
        })
    }

    saveChanges = (i, amount) => {
        let list = this.state.list.slice(i)

        list.splice(i, 1, {...this.state.list[i], amount: amount})

        this.setState({
            list: list
        })
    }

    handleInputChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value 
      })
    }
    render(){

        if(!this.props.user_id){
            return <Redirect to='/' />
        }

        let searchResults = this.state.searchResults.map((ele, i) => {
            return(
                <SearchItem name={ele.name} image={ele.image} possibleUnits={ele.possibleUnits} addToList={this.addToList} id={ele.id} key={i} />
            )
        })
        let list = this.state.list.map((ele, i) => {
            return (
                <ListItem name={ele.name} image={ele.image} amount={ele.amount} unit={ele.unit} price={ele.price} i={i} key={i} saveChanges={this.saveChanges} removeItem={this.removeItem}/>
            )
        })
        return (
            <div>
                <ul>
                    {searchResults}
                </ul>
                GroceryList
                <input name='searchInput' onChange={this.handleInputChange}/> 
                <button onClick={this.getSearchResults}>search</button>
                <ul>
                    {list}
                </ul>
                <div className="addToListDatabase">
                    {/* After adding items to the local list, add them to the list_item list,
                    tying the items in that local list to the user_id */}
                    {/* <button onClick={} */}
                </div>
            </div>
        )
    } 
}

const mapStateToProps = (reduxState) => {
    return {
        user_id: reduxState.user.user_id       
    }
}

export default connect(mapStateToProps)(GroceryList)