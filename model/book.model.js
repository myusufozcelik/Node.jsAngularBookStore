var mongoose = require('mongoose')
var category = require('./category.model')
// book ile ilişkili olduğundan categoryi de aldık

var bookSchema = mongoose.Schema({ 
 title: {
     type:String, require:true
 },
 author: {
     type:String, require:true
 },
 price: {
     type:Number, require:true
 },
 stock: {
     type:Number, require:true
 },

 picture: {
     type:String, require:true
 },
 created: {
     type:Date, default:() => { return new Date() }
 },
 // Referans vermek için;
 categoryBy: {
     type:mongoose.Schema.Types.ObjectId,
     ref:"category"
 }
 // ObjectId ile (primary key gibi düşünebiliriz) ulaşırız.
})




module.exports = mongoose.model("book",bookSchema)