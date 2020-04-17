import React from 'react';
import 'antd/dist/antd.css';
import { Button, Form, Input, Select, Radio, message } from 'antd';
import axios from 'axios'
import uniqueId from 'react-html-id';
import male from '../assets/images/male.png'
import female from '../assets/images/female.png'
import strong from '../assets/images/strong.png'
import weight from '../assets/images/weight.png'
import weightTwo from '../assets/images/weight (1).png'

class Users extends React.Component {

  constructor() {
    super();
    uniqueId.enableUniqueIds(this)
    this.state = {
      loading: false,
    }
  }

   submit =  (values)  => {
    this.setState({
        loading: true
    })
    axios.post(`https://fitness-7d3ba.firebaseio.com/users.json` , {...values})
    .then(res => {
        if (res.status === 200) {
            this.setState({
                loading: false
            })
            window.location.reload();
            message.success('User Has Been Add Successfully');
        } else {
            return null
        }
    })
  };


    render () {

      const { Option } = Select,
            { loading } = this.state
      
      return (
        <div className="mainWrapper">
          <div className="over">
            <div className="container">
              <div className="newUser">
                <div className="row">
                  <div className="col-md-12">
                    <div className="user">
                      <h4>User information's</h4>
                      <Form onFinish={this.submit}>
                        <div className="row">
                          <div className="col-md-6">
                            <Form.Item   name="username"  rules={[{ required: true, message: 'Please input your full name!' }]}>
                              <Input size="large" placeholder="Full Name*"/>
                            </Form.Item>
                          </div>
                          <div className="col-md-6">
                            <Form.Item  name="Age"  rules={[{ required: true, message: 'Please input your age' }]}>
                              <Input size="large" placeholder="Age*" type="number"/>
                            </Form.Item>
                          </div>
                          <div className="col-md-12 mb-4" >
                            <h5>Choose Your Gender</h5>
                            <Form.Item name="gender" rules={[{ required: true, message: "Please choose your gender", }]} className="mb-0">
                              <Radio.Group value="male">
                                <Radio value="male"><img src={male} className="mr-1" alt="male" /> Male</Radio>
                                <Radio value="female"><img src={female} className="mr-1" alt="female" /> Female</Radio>
                              </Radio.Group>
                            </Form.Item>
                          </div>
                          <div className="col-md-12">
                            <h5>Select Your Macros Goal</h5>
                            <Form.Item name="goal" rules={[{ required: true, message: "Please select your macros goal", initialValue: "bulk" }]}>
                              <Select size="large"   className="select-items" placeholder="Macros Goal*" allowClear>
                                <Option value="bulk"><img src={strong} className="select-img mr-1" alt="bulk" /> Bulking</Option>
                                <Option value="maintain"><img src={weight} className="select-img mr-1" alt="bulk" /> Maintaining</Option>
                                <Option value="cut"><img src={weightTwo} className="Mask Group 2 mr-1" alt="bulk" /> Cutting</Option>
                              </Select>
                            </Form.Item>
                          </div>
                          <div className="col-md-12">
                            <h5>Select Your Activities Rate</h5>
                            <Form.Item name="rate" rules={[{ required: true, message: "Please select your activities Rate", initialValue: "heigh"}]}>
                              <Select size="large"  className="select-items" placeholder="Activities Rate*" allowClear>
                                <Option value="heigh"><i className="fas fa-arrow-up mr-1" ></i> Heigh</Option>
                                <Option value="moderate"><i className="fas fa-equals mr-1" ></i> Moderate</Option>
                                <Option value="low"><i className="fas fa-arrow-down mr-1"></i> Low</Option>
                              </Select>
                            </Form.Item>
                          </div>
                          <div className="col-md-12 mb-4">
                            <div className="row">
                              <div className="col-md-5 mb-md-0 mb-2">
                                <Form.Item  className="mb-0" name="weight"  rules={[{ required: true, message: 'Please enter your weight!' }]}>
                                  <Input type="number" size="large" placeholder="Enter your weight*"/>
                                </Form.Item>
                              </div>
                              <div className="col-md-7 d-flex align-items-center">
                                <Form.Item name="weightUnit" rules={[{ required: true, message: "Please choose weight unit", initialValue: "lb" }]} className="mb-0">
                                  <Radio.Group >
                                    <Radio value="lb">Pounds(lb)</Radio>
                                    <Radio value="kg">Kilogram(KG)</Radio>
                                  </Radio.Group>
                                </Form.Item>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 mb-4">
                            <div className="row">
                              <div className="col-md-5 mb-md-0 mb-2">
                                <Form.Item  className="mb-0" name="height"  rules={[{ required: true, message: 'Please enter your height!' }]}>
                                  <Input type="number" size="large" placeholder="Enter your height*"/>
                                </Form.Item>
                              </div>
                              <div className="col-md-7 d-flex align-items-center">
                                <Form.Item name="heightUnit" rules={[{ required: true, message: "Please choose height unit", initialValue: "cm" }]} className="mb-0">
                                  <Radio.Group >
                                    <Radio value="cm">Centimeter(CM)</Radio>
                                    <Radio value="in">Inches(IN)</Radio>
                                  </Radio.Group>
                                </Form.Item>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <Form.Item className="mb-0">
                              <Button  loading={loading} className="submit btnPrimary" type="primary" htmlType="submit">
                                Submit
                              </Button>
                            </Form.Item>
                          </div>
                        </div>
                      </Form>
                    </div>
                </div>
              </div>
            </div>
            {this.props.children}
          </div>
        </div>
        </div>
      );
    }
}


export default Users;
