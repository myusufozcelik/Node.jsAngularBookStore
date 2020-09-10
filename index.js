let express = require('express')
let bodyParser = require('body-parser')
let mongoose = require('mongoose');
const dotenv = require('dotenv');
let cors = require('cors')
let apiRouter = require('./api-router')
dotenv.config();
// env içerisindeki değişkenleri okunabilir hale getiririz.

let port = process.env.port
let dbcon = process.env.cloud_mongodb_con;

let app = new express();

app.use(express.static('uploads')) // klasördeki resimlere erişmek için

// app.use ile middleware yapısını oluştururz
// corsu middleware olarak appe ekleyelim
app.use(cors()); // api ya bağlantı gerçekleşmesi için corsu yazmamız gerekli
app.use(bodyParser.urlencoded({
    extended:true
}))
// key value gibi değerleri urlencoded parse eder
//Encode(kodlanmış/şifrelenmiş) edilmiş urller üzerinde Body-Parser’ı kullanmak istiyorsanız eğer “extended” özelliğine true değerini vermeniz yeterlidir.

//json tipindeki değerleri json parse eder.
app.use(bodyParser.json());
//JSON veri tipinde gelecek olan dataların kullanılabilmesi için bu tanımlamanın yapılması gerekmektedir.

//Vt bağlantısı için;

mongoose.connect(dbcon,{
    useNewUrlParser:true,
    useUnifiedTopology:true

})
// Db connection string olarak geliyor(dbcon) stringi parse edebilmek için 
// useNewUrlParser true deriz, useUnifiedTopology: true ise
// Node.js yeni bir manager engeed kullanır. Bunu kullanabilmek için veririz.
// Belirtmesekte hata vermez sadece uyarı alırız.

var con = mongoose.connection; // bağlantıyı gerçekleştirdik
if(!con) console.log("mongoDB'ye bağlanılamadı")
else console.log("mongoDB'ye başarıyla bağlanıldı.")

// Uygulamanın ayağa kalktığını anlamak için bir get isteği alalım
//http://localhost/api karşılaşırsak buradaki api çalışsın

app.use("/api",apiRouter)

app.get('/',(req,res)=> {
    res.send("Hello World")
})

app.listen(port,()=> {
    console.log("node.js server çalışıyor")
})

