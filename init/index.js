const mongoose=require('mongoose');
const initData=require('./data.js');
const Listing=require("../models/listing.js");
main().then(()=>{
    console.log("connection successfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"65462ab94e8521fa1caceb1e"}));
     Listing.insertMany(initData.data);
    console.log("Data was initialized");
}
initDB();