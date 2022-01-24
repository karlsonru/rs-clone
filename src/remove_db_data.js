import connecton from "./connect_db.js"; 

connecton(async function(collection) {
  let result = await collection.deleteMany({
    '_id' : { $exists: true },
  })
  console.log(typeof result)
  //console.log(result.length)
  // console.log(result);
  await result.forEach(res => console.log(res));
  return result; 
})

