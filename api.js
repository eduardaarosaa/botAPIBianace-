const axios = require('axios');
const base = process.env.API_URL;
const queryString = require('querystring');
const crypto = require('crypto');

const apikey = process.env.API_KEY;
const secretykey = process.env.SECRET_KEY;


async function privateCall(path, data = {}, method = 'GET'){

    const timestamp = Date.now();
    const signature = crypto.createHmac('sha256', secretykey)
        .update(`${queryString.stringify({...data,timestamp})}`)
        .digest('hex');

    const newData = {...data,timestamp, signature};
    const qs = `?${queryString.stringify(newData)}`;

    try {
        const result = await axios({
            method,
            url: `${base}${path}${qs}`,
            headers:{
                "X-MBX-APIKEY": apikey
            }
        })

        return result.data;
        
    } catch (error) {
        console.log(error);
    }

}
async function accountInfo(){

    return privateCall('account');
}

async function publicCall(path, data, method = 'GET')
{
    try{
        let qs = data ? `?${queryString.stringify(data)}`: "";
        let result = await axios({
            method: 'GET',
            url: `${base}${path}${qs}`
        })

        return result.data;

    }catch(err){
        console.log(err);
    }
}
//bids = compra
//asks = venda
async function time(){
    return publicCall("time");
}

async function depth(symbol = 'BTCBRL', limit = 5){
    return publicCall('depth', {symbol, limit})
}

async function exchangeInfo(){
    return publicCall('exchangeInfo');
}

module.exports = {time, depth, exchangeInfo, accountInfo}