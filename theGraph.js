const fs = require('fs');
const fastcsv = require('fast-csv');

const AlchemyWeb3 = require("@alch/alchemy-web3");
const web3 = AlchemyWeb3.createAlchemyWeb3('https://rpc.ankr.com/arbitrum');

const contractABI = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newBeneficiary","type":"address"}],"name":"BeneficiaryChanged","type":"event"},{"anonymous":false,"inputs":[],"name":"LockAccepted","type":"event"},{"anonymous":false,"inputs":[],"name":"LockCanceled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_oldManager","type":"address"},{"indexed":true,"internalType":"address","name":"_newManager","type":"address"}],"name":"ManagerUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[],"name":"TokenDestinationsApproved","type":"event"},{"anonymous":false,"inputs":[],"name":"TokenDestinationsRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beneficiary","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensReleased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beneficiary","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beneficiary","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensWithdrawn","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"acceptLock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"amountPerPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"approveProtocol","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"availableAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"beneficiary","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cancelLock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newBeneficiary","type":"address"}],"name":"changeBeneficiary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"currentBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"duration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"endTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_manager","type":"address"},{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_beneficiary","type":"address"},{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_managedAmount","type":"uint256"},{"internalType":"uint256","name":"_startTime","type":"uint256"},{"internalType":"uint256","name":"_endTime","type":"uint256"},{"internalType":"uint256","name":"_periods","type":"uint256"},{"internalType":"uint256","name":"_releaseStartTime","type":"uint256"},{"internalType":"uint256","name":"_vestingCliffTime","type":"uint256"},{"internalType":"enum IGraphTokenLock.Revocability","name":"_revocable","type":"uint8"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_manager","type":"address"},{"internalType":"address","name":"_token","type":"address"},{"components":[{"internalType":"address","name":"l1Address","type":"address"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"beneficiary","type":"address"},{"internalType":"uint256","name":"managedAmount","type":"uint256"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"}],"internalType":"struct L2GraphTokenLockManager.TransferredWalletData","name":"_walletData","type":"tuple"}],"name":"initializeFromL1","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isAccepted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isInitialized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isRevoked","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"managedAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"manager","outputs":[{"internalType":"contract IGraphTokenLockManager","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"passedPeriods","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"periodDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"periods","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"releasableAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"release","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"releaseStartTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"releasedAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"revocable","outputs":[{"internalType":"enum IGraphTokenLock.Revocability","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"revoke","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"revokeProtocol","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"revokedAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_newManager","type":"address"}],"name":"setManager","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sinceStartTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"surplusAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalOutstandingAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"usedAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vestedAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vestingCliffTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdrawSurplus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];

let addrs = [];

function eip55(addr) {
    //Converting an address to EIP-55 format
    let eipAddr = web3.utils.toChecksumAddress(addr);
    return eipAddr;
}

async function isContract(addr) {
    //Get the code at a specific address.
    let code = await web3.eth.getCode(addr);
    //true if the address is a contract
    return code !== '0x';
}

async function start(addrs) {
    let addresses = [];

    for(i = 0; i < addrs.length; i++) {
        let result;
        
        if (await isContract(addrs[i])) {
            let contract = new web3.eth.Contract(contractABI, addrs[i]);
            result = await contract.methods.beneficiary().call();
            console.log(`Address: ${addrs[i]} - Beneficiary: ${result}`);
        } else {
            result = addrs[i];
            console.log(`Address: ${addrs[i]} - Beneficiary: -//-`);
        }

        addresses.push([addrs[i], result]);
    }

    fastcsv
        .writeToPath('output.csv', addresses, {
            headers: ['Address', 'Beneficiary'],
            delimiter: ';'
        })
        .on('finish', () => {
            console.log('Writing csv is complete.');
        });
}

fs.createReadStream('addr.csv')
    .pipe(fastcsv.parse({ headers: false }))
    .on('data', (row) => {
        addrs.push(eip55(row[0]));
    })
    .on('end', () => {
        console.log('Reading csv is complete.');
        start(addrs);
    });
