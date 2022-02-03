 const {model, Schema} = require('mongoose')

const category= new Schema({
    name:{type:String, required:true, unique:true},
    childrenCategories:[{type:Schema.Types.ObjectId, ref:'Category'}],
    parentCategories:[{type:Schema.Types.ObjectId, ref:'Category'}]
})

module.exports=model('Category', category)