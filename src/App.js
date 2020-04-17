import React from 'react';
import { Spin } from 'antd';
import axios from 'axios';
import Users from './components/Users';
import carb from './assets/images/grain.png'
import protein from './assets/images/fried-egg.png'
import fat from './assets/images/fat.png'

class ShowUsers extends React.Component {

  state = {
    users: null,
  }

   componentDidMount (){
     axios.get(`https://fitness-7d3ba.firebaseio.com/users.json`)
     .then(res => {
        const fetchUsers = [];
        for ( let key in res.data ) {
            fetchUsers.push({
                ...res.data[key],
            });
        }
        let users = this.state.users;
        users = fetchUsers;
        this.setState({
          users: users
        })
     })    
  }

    render () {
      
      const { users } = this.state;

      return (
        <div>
          <Users >
            <div className="show-users mt-5">
              <div className="row">
                {users === null ? <Spin /> : users.map((val, index) => (
                  <div key={index} className="col-lg-6 mb-4" data-id={index}>
                    <div className="show-user">
                      <div className="row justify-content-between px-3 align-content-center mb-3">
                        <h2>
                          {val.goal === 'bulk' ? 'Bulking' : val.goal === 'maintain' ? 'Maintaining' : 'Cutting'} 
                          <span>
                              {
                              val.weightUnit === 'kg' ? ((val.weight * 2.204) * (val.rate === 'heigh' ? 15 : val.rate === 'moderate' ? 14 : 13) + (val.goal === 'bulk' ? 500 : val.goal === 'maintain' ? 0 : 0 - 350)).toFixed(0) : 
                              (val.weight * (val.rate === 'heigh' ? 15 : val.rate === 'moderate' ? 14 : 13) + (val.goal === 'bulk' ? 500 : val.goal === 'maintain' ? 0 : 0 - 350)).toFixed(0)
                              }   
                          </span>
                          cal
                        </h2>
                        {/* <div className="tooltip d-flex align-items-center">
                          <i className="fas fa-trash close" onClick={() => this.deleteUser(val.username)}></i>
                        </div> */}
                      </div>
                      <h4>{val.username} - <span>{val.gender}</span></h4>
                      <h4>This is your calories for {val.goal === 'bulk' ? 'Bulking' : val.goal === 'maintain' ? 'Maintaining' : 'Cutting'} which your main macros (Carbohydrates, Protein, Fat) will be:</h4>
                      <div className="row mt-4 macros justify-content-between px-1">
                        <div className="d-flex align-items-center justify-content-center">
                          <img src={carb} alt="carp" className="mr-2"/>
                          <span>
                            {
                              val.weightUnit === 'kg' ? (((val.weight * 2.204) * (val.rate === 'heigh' ? 15 : val.rate === 'moderate' ? 14 : 13) + (val.goal === 'bulk' ? 500 : val.goal === 'maintain' ? 0 : 0 - 350) - ((val.weight * 2.204) * (1) * 4 + (val.weight * 2.204) * (0.3) * 9)).toFixed(0) / 4).toFixed(0) : 
                              (((val.weight * (val.rate === 'heigh' ? 15 : val.rate === 'moderate' ? 14 : 13) + (val.goal === 'bulk' ? 500 : val.goal === 'maintain' ? 0 : 0 - 350)) - (val.weight * 1 * 4 + val.weight * 0.3 * 9)).toFixed(0) / 4).toFixed(0)
                            }g Carb
                          </span>
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                          <img src={protein} alt="protein" className="mr-2"/>
                          <span>{val.weightUnit === 'kg' ? ((val.weight * 2.204) * (0.9)).toFixed(0): (val.weight * 0.9).toFixed(0)}g Protein</span>
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                          <img src={fat} alt="fat" className="mr-2"/>
                          <span>
                            {val.weightUnit === 'kg' ? ((val.weight * 2.204) * (0.3)).toFixed(0): (val.weight * 0.3).toFixed(0)}g Fat
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Users>
        </div>
      )
    }
}

export default ShowUsers;
