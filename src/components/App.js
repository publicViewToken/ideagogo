import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import ideagogoad from '../ideagogoad.png'
import gif from '../fasterr.gif'
import anim from '../ideaanim.gif'
import logo from '../logo.png'
import logosm from '../logosm.png'
import Color from '../abis/ideagogo.json'
import images from '../components/images'




 function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}








class App extends Component {

//add for images
//style={{ backgroundImage: `url(${logosm})` }}


  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

 



  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()
    const networkData = Color.networks[networkId]
    if(networkData) {
      const abi = Color.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      this.setState({ contract })
      const totalSupply = await contract.methods.totalSupply().call()
      this.setState({ totalSupply })

       for (var i = 1; i <= totalSupply; i++) {
        const name = await contract.methods.showName(i-1).call()
        this.setState({
          names: [...this.state.names, name]
        })
      }
     
      for (var i = 1; i <= totalSupply; i++) {
        const idea = await contract.methods.showMessage(i-1).call()
        this.setState({
          ideas: [...this.state.ideas, idea]
        })
      }
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  mint = (name, msg) => {
    this.state.contract.methods.mint(name,msg).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({
        ideas: [...this.state.ideas, name]
      })
    })
  }

   fund = (id) => {                               
    this.state.contract.methods.giveKudos(id).send({ from: this.state.account , value:0.005*10**18}) //test send 0.005
    .once('receipt', (receipt) => {
      
    })
  }

  constructor(props) {
      var today = new Date(),

    time =    today.getHours() + ':' + today.getMinutes();


    super(props)
    this.state = {
      account: '',
      contract: null,
      totalSupply: 0,
       currentTime: time,
      ideas: [],
      names:[]
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href=""
            target="_blank"
            rel="noopener noreferrer"
          >
            IdeaGoGo 
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white"><span id="account">{this.state.account}</span></small>
            </li>
          </ul>
        </nav>

         


        <div className="container-fluid mt-5 text-center">
        
         <img src={ideagogoad}  width = '900' height = '200'/>
        
          
           
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">

           
        <div className="">
        <div>
        Fund Idea
        </div>
         <form onSubmit={(event) => {
                  event.preventDefault()
                  const id = this.name.value
                  
                  this.fund(id)
                }}>
                  <input
                    type='number'
                    min = '0'
                    
                    
                    className='form-control mb-1'
                    placeholder='Idea #'
                    ref={(input) => { this.id = input }}
                  />
                   <input
                    type='submit'
                    className='btn btn-block btn-primary'
                    value='Fund'
                  />
                 
                   </form>
                    </div>

               



              <div className="content mr-auto ml-auto">





                <h1></h1>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const name = this.name.value
                  const msg = this.msg.value
                  this.mint(name, msg)
                }}>
                  <input
                    type='text'
                 
                    maxlength='20'
                    
                    className='form-control mb-1'
                    placeholder='name of idea'
                    ref={(input) => { this.name = input }}
                  />
                   <textarea
                    type='text'
                    min = '0'
                    maxlength='1000'
                    className='form-control mb-1 '
                    placeholder='idea description'
                    ref={(msgg) => { this.msg = msgg}}
                  />
                  <input
                    type='submit'
                    className='btn btn-block btn-primary'
                    value='Publish Idea'
                  />
                </form>
              </div>
            </main>
          </div>
          <hr/>
          <div className="row text-center">
            { this.state.names.map((name, key) => {
              return(
                <div key={key} className="col-md-2 mb-2">
                  <div className="token"   style={{ backgroundImage: `url(${images[getRandomInt(3)]})` }}  ></div>
                  <div>Idea {key}</div>
                   <div>
                   <button disabled className="ownerbutton text-white" style={{ backgroundColor:"#C2C0C4" }} >
                   {name}
                   </button >
                   </div>
                   

                   <div>
                   <div data-tip data-for="registersecret">
                   <button  className="ownerbutton text-white" style={{ backgroundColor:"#C2C0C4" }} onClick={value => alert("- "+ this.state.ideas[key] )}>
             Description
        </button>
      </div>
      
    </div>

    

                </div>





              )
            })}
          </div>




        </div>
      </div>
    );
  }
}

export default App;
