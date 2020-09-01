const app = require('express')();
const cmd = require('node-cmd');
const bodyParser = require('body-parser');
const Joi = require('joi');
const FileType = require('file-type');
const randomstring = require('randomstring');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS
const Ddos = require('ddos');
const get_ip = require('ipware')().get_ip;
const helmet = require('helmet');
const redis = require("redis");

const schema = Joi.object({
    file: Joi
        .string()
        .base64()
        .required()
})

const options = {
    abortEarly: true,
    allowUnknown: false,
    convert: false
}

const bodyParserOptions = {
    inflate: true,
    limit: '14mb',
    type: 'application/octet-stream'
}

const port = process.env.PORT || 443;
const httpPort = process.env.HTTP_PORT || 80;
const fileStoragePath = process.env.STORAGE || "/tmp/"
const ddos = new Ddos({burst: 15, limit: 30, whitelist: ['172.17.0.1']})
const fileTypes = ['png', 'jpg', 'heic', 'gif', 'm4a', 'mp4', 'tif', 'mp2', 'mp3', 'docx', 'pptx', 'xlsx', 'bmp', 'ogg', 'wav', 'avi', 'wmv', 'jpeg']
app.use(ddos.express)

if(process.env.PROD != undefined){
    var privateKey = require('fs').readFileSync('./certificates/privkey.pem', 'utf8');
    var certificate = require('fs').readFileSync('./certificates/cert.pem', 'utf8');
    var ca = require('fs').readFileSync('./certificates/chain.pem');
    var credentials = {key: privateKey, cert: certificate, ca: ca}
    var client = redis.createClient({host: '172.17.0.1', port: '6379'});

    app.use(redirectToHTTPS([/3mghupyalwu7gub3ncpe3tcynf54y2bliylnh6gbslrlib4liwsqlgyd\.onion/], []))
}else{
    var client = redis.createClient({host: '127.0.0.1', port: '6379'});
}

app.use(helmet({contentSecurityPolicy: false}));
app.use((req, res, next) => {
    if(req.method == 'POST' && req.originalUrl == '/api/strip'){
        let ip = get_ip(req).clientIp

        if(ip != '::ffff:172.17.0.1'){
            if(ip == null){
                client.get('null', (err, reply) => {
                    if(reply == null){client.setex('null', 86400, '1'); next()}
                    if(parseInt(reply) == 10){client.TTL('null', (err, reply) => {res.json({ status: 'LIMIT_REACHED', ttl: parseInt(reply) })})}
                    if(parseInt(reply) < 10){client.incr('null'); next();}
                })
            }else{
                client.get(ip, (err, reply) => {
                    if(reply == null){client.setex(ip, 86400, '1'); next()}
                    if(parseInt(reply) == 10){client.TTL(ip, (err, reply) => {res.json({ status: 'LIMIT_REACHED', ttl: parseInt(reply) })})}
                    if(parseInt(reply) < 10){client.incr(ip); next();}
                })
            }

        }else{
            client.get(ip, (err, reply) => {
                if(reply == null){client.setex(ip, 86400, '1'); next()}
                if(parseInt(reply) == 500){client.TTL(ip, (err, reply) => {res.json({ status: 'LIMIT_REACHED', ttl: parseInt(reply) })})}
                if(parseInt(reply) < 500){client.incr(ip); next();}
            })
        }
    }else{
        next()
    }
})
app.use(bodyParser.raw(bodyParserOptions));
app.use((req, res, next) => {
    if(req.originalUrl.charAt(65) != ''){
        res.socket.destroy();
    }

    let byteSize = 0;
    let jsonData = ''

    req.on('data', (data) => {
        byteSize += Buffer.byteLength(data)
        jsonData += data.toString();

        if(byteSize >= 14000000){
            res.socket.destroy()
        }
    });

    req.on('end', () => {
        if(req.method == 'POST'){req.body = JSON.parse(jsonData)}
        next();
    })
})
app.use((req, res, next) => {
    if(req.method == 'POST'){
        var {value, error} = schema.validate(req.body, options);

        if(error){
            console.log(error)
            res.end()
        }else{
            next()
        }
    }else{
        next()
    }
})
app.use(require('express').static("public/"))

app.get('/', (req, res) => {
    res.sendFile("index.html", { root: "public/" })
})

app.get('/download/:file', (req, res) => {
    let safeFileName = req.params.file.replace(/^(\.\.(\/|\\|$))+/, '');
    let requestedFile = fileStoragePath + safeFileName;

    if(require('fs').existsSync(requestedFile)){
        let downloadingFile = fileStoragePath + "downloading" + safeFileName;

        require('fs').copyFileSync(requestedFile, downloadingFile);
        require('fs').unlinkSync(requestedFile);

        let fileStream = require('fs').createReadStream(downloadingFile);

        let maxDownloadTimeout = setTimeout(() => {
            try{
                require('fs').unlinkSync(downloadingFile);
                res.json({status: 'MAX_DOWNLOAD_TIME'})
                fileStream.destroy();
            }catch{}
        }, 2100000);

        fileStream.pipe(res).on('finish', () => {
            clearTimeout(maxDownloadTimeout);
            fileStream.destroy();
            try{
                require('fs').unlinkSync(downloadingFile);
            }catch{}
        })
    }else{
        res.json({ status: 'FILE_NOT_EXIST' })
    }
})

app.post('/api/strip', (req, res) => {
    var fileBuffer = Buffer.from(req.body.file, 'base64');

    FileType.fromBuffer(fileBuffer)
    .then((result) => {
        if(result != undefined && fileTypes.indexOf(result.ext) >= 0){
            var imageName = randomstring.generate({length: '50', charset: 'alphabetic'});
            var filePath = `${fileStoragePath}${imageName}.${fileTypes[fileTypes.indexOf(result.ext)]}`;

            try{
                require('fs').writeFileSync(filePath, fileBuffer);
            }catch{
                res.json({status: 'SERVER_ERR'})
            }

            cmd.get(`mat2 --inplace ${filePath}`, () => {
                setTimeout(() => {
                    try{
                        require('fs').unlinkSync(filePath);
                    }catch{}
                }, 180000);

                res.json({status: 'OK', file: `${imageName}.${fileTypes[fileTypes.indexOf(result.ext)]}`})
            })

        }else{
            res.json({status: 'BAD_FILE_TYPE'})
        }
    })
    .catch((err) => {
        console.log(err);
        res.json({status: 'BAD_REQUEST'})
    })
})

app.get('*', (req, res) => {res.redirect('/')})

if(process.env.PROD != undefined){
    require('https').createServer(credentials, app).listen(port, () => {
        console.log(`HTTPS app listening on PORT ${port}`)
    })
}
app.listen(httpPort, () => {
    console.log(`HTTP listening on PORT ${httpPort}`)
})