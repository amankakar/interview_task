"strict ";
const fs = require("fs");
const { send } = require("process");

module.exports = class Erc20 {
  constructor(name, symbol, total_supplay, owner, decimal) {
    let ercIntialze = {
      name: name,
      symbol: symbol,
      total_supplay: total_supplay,
      owner: owner,
      decimal: decimal,
      balances: { owner: total_supplay },
    };
    let data = JSON.stringify(ercIntialze);
    fs.writeFileSync("erc20.json", data);
    let balances = {
      key: "1",
      balance: total_supplay - 2000,
    };
    let balances_array = [];
    balances_array.push(balances);
    let balance1 = {
      key: "2",
      balance: "2000",
    };
    balances_array.push(balance1);

    // let data_balance = JSON.stringify(balances_array);
    // fs.writeFileSync('balances.json', data_balance);
  }

  balanceOf(address) {
    let balance = JSON.parse(fs.readFileSync("balances.json"));
    for (let i = 0; i < balance.length; i++) {
      if (balance[i].key == address) {
        return balance[i].balance;
      }
      if (i == balance.length - 1) {
        return "not found";
      }
    }
  }

  get_total_supplay() {
    let erc20 = JSON.parse(fs.readFileSync("erc20.json"));
    return erc20.total_supplay;
  }

  transfer(sender, receiver, tokens) {
    let sender_update, receiver_update;
    let balance = JSON.parse(fs.readFileSync("balances.json"));

    if (this.balanceOf(sender) === "not found") {
      return "sender not found ";
    } else if (parseFloat(this.balanceOf(sender) < parseFloat(tokens))) {
      return "token exceeded";
    } else if (this.balanceOf(receiver) === "not found") {
      return "receiver not found";
    } else {
      for (let i = 0; i < balance.length; i++) {
        if (balance[i].key == sender) {
          sender_update = parseFloat(balance[i].balance) - parseFloat(tokens);
          balance[i].balance = sender_update;
        }
        if (balance[i].key == receiver) {
          receiver_update = parseFloat(balance[i].balance) + parseFloat(tokens);
          balance[i].balance = receiver_update;
          // return "done"
        }
        if (i == balance.length - 1) {
          let data_balance = JSON.stringify(balance);

          fs.writeFileSync("balances.json", data_balance);
        }
      }
      return true;
    }
  }

  approve(sender, delegate, numTokens) {
    let allowed = JSON.parse(fs.readFileSync("allowed.json"));

    let allowed_new = {
      sender: sender,
      delegate: delegate,
      numTokens: numTokens,
    };
    allowed.push(allowed_new);
    let data_balance = JSON.stringify(allowed);
    fs.writeFileSync("allowed.json", data_balance);
    let allowed1 = JSON.parse(fs.readFileSync("allowed.json"));
    return true;
  }

  allowance(owner, delegate) {
    let allowed = JSON.parse(fs.readFileSync("allowed.json"));
    for (let i = 0; i < allowed.length; i++) {
      // return allowed;
      if (allowed[i].sender == owner && allowed[i].delegate == delegate) {
        return allowed[i].numTokens;
      }
    }
    return "no Allownace Found";
  }

  transferFrom(owner, buyer, numTokens, sender) {
    if (parseFloat(this.balanceOf(owner)) < numTokens) {
      return "can not send tokens";
    }
    if (parseFloat(this.allowance(owner, sender)) < numTokens) {
      return "you are not allowed to send tokens";
    }
   
    this.transfer(owner, buyer, numTokens);
    return true;
  }

  burn(owner, noTokens) {
    let erc20 = JSON.parse(fs.readFileSync("erc20.json"));
    if (erc20.owner == owner) {
      let balance = JSON.parse(fs.readFileSync("balances.json"));
      for (let i = 0; i < balance.length; i++) {
        if (balance[i].key == owner) {
          balance[i].balance =
            parseFloat(balance[i].balance) - parseFloat(noTokens);
        }
        if (i == balance.length - 1) {
          let data_balance = JSON.stringify(balance);

          fs.writeFileSync("balances.json", data_balance);
        }
      }
      erc20.total_supplay =
        parseFloat(erc20.total_supplay) - parseFloat(noTokens);
      let data = JSON.stringify(erc20);
      fs.writeFileSync("erc20.json", data);
    } else {
      return " you are not owner of contract";
    }
    return true;
  }
  mint(owner, noTokens) {
    let erc20 = JSON.parse(fs.readFileSync("erc20.json"));
    if (erc20.owner == owner) {
      let balance = JSON.parse(fs.readFileSync("balances.json"));
      for (let i = 0; i < balance.length; i++) {
        if (balance[i].key == owner) {
          balance[i].balance =
            parseFloat(balance[i].balance) + parseFloat(noTokens);
        }
        if (i == balance.length - 1) {
          let data_balance = JSON.stringify(balance);

          fs.writeFileSync("balances.json", data_balance);
        }
      }
      erc20.total_supplay =
        parseFloat(erc20.total_supplay) + parseFloat(noTokens);
      let data = JSON.stringify(erc20);
      fs.writeFileSync("erc20.json", data);
    } else {
      return " you are not owner of contract";
    }
    return true;
  }
};

