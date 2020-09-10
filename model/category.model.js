var mongoose = require('mongoose')

var schema = mongoose.Schema;

// Vt tablo karşılığı mongodb'de collection, satırların karşılığı döküman
//table => collection
// row=> document
// Id yazmıyoruz çünkü Id mongodb tarafından oluşturuluyor.
var categorySchema = new schema({
    name: {
        type:String, required:true
    },
    created: {
        type:Date, 
        default: () => {
            return new Date()
        } // her bir kayıt olduğunda yeni bir tarih eklensin.(dönsün)
        
    }
})

// category collectionu schema ya göre oluşsun
// vt oluşan isme göre referansı veririz. 
module.exports = mongoose.model("category",categorySchema)