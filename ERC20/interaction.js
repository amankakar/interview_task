// import Erc20 from './erc20'

const fs = require('fs');
const Erc20 = require('./erc20');


function intialize (){
    let erc = new Erc20('tokens' , 'RNS'  , '1000000' , '1' , '18');
    // erc.create('tokens' , 'RNS'  , '1000000' , '1' , '18')
    console.log(erc.balanceOf('1'));
    console.log(erc.get_total_supplay())
    console.log(erc.transfer('1' , '2' , '1000'))
    console.log(erc.approve('2' , '1' , '200'))
    // console.log(erc.approve('1' , '2' , '200'))
    console.log(erc.allowance('1' ,'2'))
    console.log(erc.transferFrom('1' , '2' , '100' , '2'))
    console.log(erc.burn('1' , '10000'));
    console.log(erc.balanceOf('1'));
    console.log(erc.mint('1' , '10000'));
    console.log(erc.balanceOf('1'))


//   console.log(erc.balanceOf('1')

}
intialize()

exports= intialize