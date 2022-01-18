import { connectDB as connecton } from "./connect_db"; 

connecton(async function(collection) {
  let result = await collection.insertOne({
    'test' : 'hello_world!'
  })
  return result; 
})

