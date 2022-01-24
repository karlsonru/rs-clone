import connecton from "./connect_db.js"; 

connecton(async function(collection, query) {
  let result = await collection.find()
  console.log(typeof result)
  //console.log(result.length)
  // console.log(result);
  await result.forEach(res => console.log(res));
  return result; 
})



