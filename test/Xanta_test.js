const Xanta = artifacts.require("Xanta");
require("chai").use(require("chai-as-promised")).should();


contract('Xanta', ([owner,recevier]) => {

let xanta;
  beforeEach(async()=>{
    xanta = await Xanta.new();
  })

  describe("test",()=> {
  it('should be the same name', async () => {
    const xantaname = await xanta.name();
    xantaname.should.equal('Xanta');
  })
  it('should be the same symbole', async () => {
    const xantasymbole = await xanta.symbole();
    xantasymbole.should.equal('XNT');
  })
  it('should be the same decimal', async () => {
    const xantadecimals = await xanta.decimals();
    xantadecimals.toString().should.equal("5");
  })
  it('should be the same total', async () => {
    const xantatotalSupply = await xanta.totalSupply();
    xantatotalSupply.toString().should.equal("10000000");
    console.log(xantatotalSupply);
  })
});
describe("test transfer",()=>{
  it('balanceOf first Time',async()=>{
    let balanceOf;
    balanceOf= await xanta.balanceOf(owner);
    //console.log("the balance of owner is : --------------------",balanceOf.toString());
    balanceOf= await xanta.balanceOf(recevier);
    //console.log("the balance of recevier is : --------------------",balanceOf.toString());

    await xanta.transfer(recevier,10000000);

    balanceOf= await xanta.balanceOf(owner);
    //console.log("the balance of owner is : **************************",balanceOf.toString());
    balanceOf= await xanta.balanceOf(recevier);
    //console.log("the balance of recevier is : *************************",balanceOf.toString());

  })
  it('test event', async()=>{
    const result = await xanta.transfer(recevier,10000000);
    const log = result.logs[0];
    log.event.should.equal("Transfer");
    result.receipt.from.toString().should.equal(owner.toLowerCase());
  })
  it('invalide recevier or invalid value',async()=>{
    await xanta.transfer(0x0,10000000).should.be.rejected;
    //await xanta.transfer(recevier,1000000).should.be.rejectedWith("owner value is invalid");
  })
  it('invalide recevier or invalid value',async()=>{
    //await xanta.transfer(0x0,10000000).should.be.rejectedWith("receiver address is invalid");
    await xanta.transfer(recevier,100000000).should.be.rejected;
  })
})
})
