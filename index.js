const api = require('./api');
const symbol = process.env.SYMBOL;
setInterval(async () => {
        let buy = 0 , sell = 0;
        // console.log('teste');
        const result = await api.depth(symbol);

        if(result.bids && result.bids.length){

            console.log(`Highest Buy: ${result.bids[0][0]}`);
             buy = parseInt(result.bids[0][0]);

        }

        if(result.asks && result.asks.length){

            console.log(`Lowest Sell: ${result.asks[0][0]}`);

             sell = parseInt(result.asks[0][0]);
        }
        
        if(sell < 200000){
            console.log('COMPRAAA');
            let account = await api.accountInfo();
            
            let coins = account.balances.filter(b => symbol.indexOf(b.asset) != -1);
            console.log('POSIÇÃO DA CARTEIRA');
            console.log(coins);
        }

        else if(buy > 230000){
            console.log('VENDEER');
        }else{
            console.log('Esperando Mercado movimentar');
        }
        // console.log(await api.exchangeInfo());
  

}, process.env.CRAWLER_INTERNAL)