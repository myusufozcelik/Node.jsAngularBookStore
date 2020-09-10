

const Book = require('../model/book.model')
const response = require('../response')
const {validationResult} = require('express-validator')
const multer = require('multer'); // Resim yükleme işini yönetir.
let path = require('path') // gelen dosyanın uzantısı almak için oluşturduk
let bookFileName = null; 
let mystorage = multer.diskStorage({ //cb-> callback, req->request, file-> gelen dosya
    destination:function(req,file,cb) {
        
        // her şeyi kabul ettiğimiz için null girdik eğer örn; sadece jpegleri kabul etseydik bir değişken oluşturup gerekli veriyi yazıp onu null yerine yazardık
        cb(null,"./uploads");
    },
    filename : function(req,file,cb) {
        // iki tane aynı isimli dosya girilirse bir önceki silip yeni geleni kaydeder 
        // bu yüzden her gelene yeni bir dosya adı vermemiz lazım tarih+adı nı verdik. 
        bookFileName = Date.now()+path.extname(file.originalname)
        
        cb(null,bookFileName);

    }
    // api-router da kullanacağımız için exports edelim
    
})

exports.upload = multer( {
    storage : mystorage
})

// exports. yaparak dış dünyaya açarız.
exports.list = (req,res) => { 
    // {} tüm datayı almamızı sağlar. Sıralamayı created sütununa göre yapar. en son oluşturulanları alırız.
    Book.find({}).sort({created: -1}).populate("categoryBy")
    .exec((err,books)=> {
        if(err) {
            return new response(null,err).error500(res)
        }

        return new response(books,null).success(res);
    }) 
    // -1 dersek sondan başa , 1 dersek ilk eklenenden son eklenene sıralar
    // categoryBy'ı populate ile alırız.
    // exec ile populate işlemini gerçekleştirir.
}


exports.getById = (req,res) => { // id ye sahip category de gelsin o yüzden populate yazarız
    Book.findById(req.params.book_id).populate("categoryBy").exec((err,book) => {
            if(err)  {
                // kitabı almaya çalışırken hata atarsa;
                return new response(null,err).error500(res)
            }
            if(book) {
                new response(book,null).success(res);
            }
            else {
                new response().notFound(res);
            }

    })
}


exports.listByCategoryId = (req,res) => {
    let _id = req.params.category_id; 
    // categoryBy'ı id olanları bul
    Book.find({categoryBy:_id}).populate("categoryBy").exec((err,books)=> {
        if(err) {
            return new response(null,err).error500(res)
        }

        return new response(books,null).success(res);

    })
}

exports.create = (req,res) => {
    


    let errors  = validationResult(req)
    if(!errors.isEmpty()) {
        return new response(null,errors.array()).error400(res); 
    }
    

    // Gelen json olacağı için yakalamamız lazım. app.use(bodyParser.json)
const {title,author,price,stock,picture,categoryBy} = req.body;
// title,author,price... bunları parse etmesi için yazdık
let book = new Book();
book.title = title;
book.author = author;
book.price = price;
book.stock = stock;
book.picture = picture;
book.categoryBy = categoryBy._id; // categoryBy mongo tarafında id yi tutar. O yüzden id yi eşitliyoruz.

// save kısmında tek hata olabilir. ya hata vardır ya da yoktur
book.save((err)=> {
    if(err) {
        return new response(null,err).error500(res);
    }
    return new response(book,null).created(res);
})

}

// PUT http://localhost/api/book/12312 
exports.update = (req,res) => {


    let errors  = validationResult(req)
    if(!errors.isEmpty()) {
        return new response(null,errors.array()).error400(res); 
    }
    


    Book.findById(req.params.book_id,(err,book) => {
        if(err) {
            return new response(null,err).error500(res)
        }
        if(!book) {
            return new response().notFound(res);
        }
        
        const {title,author,price,stock,picture,categoryBy} = req.body;
            
       // Eğer book nesnesi varsa güncelleme işlemi yaparız.

       book.title = title;
       book.author = author;
       book.price = price;
       book.stock = stock;
       book.picture = picture;
       book.categoryBy = categoryBy._id;

        book.save((err)=>{
            if(err) {
                return new response(null,err).error500(res);
            }
            return new response(book,null).success(res);
        })
    })
}

exports.delete = (req,res) => {
    let _id = req.params.book_id; // request parametresinden id yi alırız
    Book.findOneAndDelete({_id: _id}, (err,book)=> {
        if(err) {
            return new response(null,err).error500(res);
        }
        if(!book) {
            return new response().notFound(res)
        }
        return new response(book,null).success(res)
    })
}

exports.saveImage = (req,res) => {
    console.log("I'm here")
    try {
        res.status(200).json({
            status:true,
            url:`http://localhost:${process.env.port}/${bookFileName}`})
    }
    catch(err) {
        res.status(500).send(err)
    }
}