// category modelini alalım bu model üzerinden mongodb datalarını alırız.

const response = require('../response')
const { request } = require('express')

const {validationResult} = require('express-validator')

const Category = require('../model/category.model')


// tüm kategori listesini döndür


// GET: http://localhost/api/category
exports.list = (req,res) => {
    // Category de ki tüm datayı almak için;
// ilk parametrede hiçbir şey göndermezsek bütün datayı getir deriz.
// Category.find ile tüm datayı döndürürüz.(Mongoose fonksiyonudur)
Category.find({},(err,categories)=> {
        if(err) {
            // ilk parametre data, ikinci parametre error alırdı.
            // Hata old. için data olmayacağından dolayı null veririz.
        return new response(null,err).error500(res)
        }
// dataya categories kısmını, hataya null verdik.
        return new response(categories,null).success(res)
    }) 
}

// id ye göre kategori döndürelim;
//GET: http://localhost:api/category/12312
exports.getById = (req,res) => {
    // findById mongoose fonksiyonudur. Id ye göre datayı verir.
    // requestteki parametrenin categoryId si 
    //category_id kısmını biz oluşturmadık mongodb kendisi tabloadı_id şeklinde oluşturur
    // yani category_id olarak id kısmını temsil eder
    Category.findById(req.params.category_id,(err,category) => {
        if(err) {// response(null,null) değerine sahip olur
            // fakat biz default olarak yazmıştık. O yüzden yazmamıza gerek yok
           return new response().error500(res)
        }

        if(category) {
            return new response(category,null).success(res);
        }

        else {
            // kategori yoksa
            return new response().notFound(res);
        }
       
    })
}

//POST : http://localhost/api/category
exports.create = (req,res) => {

    //validation resulta req parametresini verince api tarafında tanımladığımız check kısmında kontrol eder
    // hata var ise hatayı döndürür
    let errors  = validationResult(req)
    if(!errors.isEmpty()) {
        return new response(null,errors.array()).error400(res); 
    }


    // yeni bir data kaydedeceğimiz için yeni bir nesne örneği alırız.
    let category = new Category();
    // gelen requestin body üzerindeki name datasını alırız.
    category.name = req.body.name;
    // Category bir model olduğundan(category.model den ) dolayı hazır metotlarla gelir. save de onlardan biridir.
    category.save((err)=> {
        // kaydetmezse sadece hatayı alırız. 
        if(err) 
            return new response(null,err).error500(res)
        
        return new response(category,null).created(res)
    })
}

//PUT : http://localhost/api/category/12312
exports.update = (req,res) => {
    //findById mongoose paketinden gelir


    let errors  = validationResult(req)
    if(!errors.isEmpty()) {
        return new response(null,errors.array()).error400(res); 
    }
    
    Category.findById(req.params.category_id,(err,category)=> {
        if(err) {
            return new response(null,err).error500(res)
        }

        if(!category) {
            return new response().notFound(res)
        }
        // category.name güncelledik
        category.name = req.body.name;

        category.save((err)=> {
            if(err) {
                return new response(null,err).error500(res);
            }
            return new response(category,null).success(res)

        })
    })
}

// DELETE: http://localhost/api/category/12312
exports.delete = (req,res) => {
    //mongodb fonk. findOneAndDelete ile id yi bulup silebiliriz.
    //mongodb de id _ ile başlar. o yüzden _id dedik (table name olm. için _id oldu)
    Category.findOneAndDelete({_id:req.params.category_id},(err,category)=> {
        if(err) { // vt ye bağlanamadıysa
            return new response(null,err).error500(res);
        }
        // İd yi çekti fakat bu id ye karşılık gelen category_id yoksa 
        if(!category) { // response tarafında default olarak null yazdığımız için response(null,null) değerinde demek
            return new response().notFound(res)
        }
        return new response(category,null).success(res);
    })
}

