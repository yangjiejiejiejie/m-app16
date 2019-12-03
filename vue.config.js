module.exports={
    devServer:{
        before(app){
          let data=require('./mock/mock.json')
          app.get('/getData',(req,res)=>{
               res.send({
                   data:data
               })
          })
        }
    }
}