#! /usr/bin/env node

var http = require("http"),
    https = require("https"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    crypto = require("crypto"),
    c = require('child_process');
    //iconv = require("iconv-lite");

var domainName = getIPAdress(),
    portCode = 443;

//对其他服务器进行请求
function getApiData(url, callback) {
    console.log("向API服务请求数据中...");
    var op = newFunction(url);

    var req = http.request(op, function (res) {
        var recvData = "";
        res.on('data', function (chunk) {
            recvData += chunk;
        });
        res.on('end', function () {
            if (callback) {
                callback(null, JSON.parse(recvData));
            }
        });
    });
    req.on('error', function (e) {
        if (callback) {
            callback(e, null);
        }
    });
    req.end();
}
var tokenTimeout = 0;
var ticketData;
//获取微信accessToken
function getWxTokenApi(appid, secret, callback) {

    if( tokenTimeout <= new Date().getTime() ){//过期则重新获取
        //"https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + appid + "&secret=" + secret + "&code=" + code + "&grant_type=authorization_code";
        let _url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`;        

        _httpsGet(_url,function(res){
            tokenTimeout = new Date().getTime() + (parseInt(res["expires_in"],10) * 1000); 
            _url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${res["access_token"]}&type=jsapi`;
            _httpsGet(_url,function(res){
                ticketData = {
                    "timestamp":parseInt(new Date().getTime() / 1000) + '',
                    "nonceStr":Math.random().toString(36).substr(2, 15),
                    "ticket":res["ticket"],
                };
                callback(ticketData);             

            });//获取JS ticket
        });//获取token

    }else{
        callback(ticketData);
    }
}


// 计算签名方法
function calcSignature(ticket, noncestr, ts, url) {
    var str = 'jsapi_ticket=' + ticket + '&noncestr=' + noncestr + '&timestamp='+ ts +'&url=' + url;
    
    var sha1 = crypto.createHash('sha1');
    sha1.update(str);
    return sha1.digest('hex');
}



//https请求
function _httpsGet(_url, callback){
    var req = https.get(_url, function (res) {
        var datas = [];
        var size = 0;
        res.on('data', function (data) {
            datas.push(data);
            size += data.length;
            //process.stdout.write(data);  
        });
        res.on("end", function () {            
            var buff = Buffer.concat(datas, size);
            callback( JSON.parse( buff.toString() ) );  //iconv.decode(buff, "utf8"); //转码//var result = buff.toString();//不需要转编码,直接tostring
        });
    }).on("error", function (err) {
        console.log(err);
        //Logger.error(err.stack);
        //callback.apply(null);
    });
    req.end();
}

function newFunction(url) {
    return {
        host: '192.168.0.59',
        port: '18009',
        method: 'GET',
        path: url
    };
}

function getIPAdress() {
    let result = "localhost";
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                result = alias.address;
            }
        }
    }
    return result;
}
http.createServer(function (req, res) {
    var pathname = __dirname + url.parse(req.url).pathname;

    if (path.extname(pathname) == "") {
        pathname += "/";
    }

    if (pathname.charAt(pathname.length - 1) == "/") {
        pathname += "index.html";
    }

    fs.exists(pathname, function (exists) {
        if (exists) {
            switch (path.extname(pathname)) {
                case ".html":
                    res.writeHead(200, {
                        "Content-Type": "text/html"
                    });
                    break;
                case ".js":
                    res.writeHead(200, {
                        "Content-Type": "text/javascript"
                    });
                    break;
                case ".css":
                    res.writeHead(200, {
                        "Content-Type": "text/css"
                    });
                    break;
                case ".gif":
                    res.writeHead(200, {
                        "Content-Type": "image/gif"
                    });
                    break;
                case ".jpg":
                    res.writeHead(200, {
                        "Content-Type": "image/jpeg"
                    });
                    break;
                case ".png":
                    res.writeHead(200, {
                        "Content-Type": "image/png"
                    });
                    break;
                case ".svg":
                    res.writeHead(200, {
                        "Content-Type": "image/Svg+Xml"
                    });
                    break;
                case ".mp3":
                    res.writeHead(200,{
                        "Content-Type": "audio/mp3"                        
                    });
                    break;
                default:
                    res.writeHead(200, {
                        "Content-Type": "application/octet-stream"
                    });
            }

            fs.readFile(pathname, function (err, data) {
                res.end(data);
            });
        } else {
            //接口模拟
            var data = null;
            var iurl = url.parse(req.url);
            switch (iurl.pathname) {
                case "/GetValid":

                    data = {
                        "errcode": 0,
                        "errmsg": "success"
                    };
  
                    setTimeout(function () {     
                        res.writeHead(200, {
                            'Content-Type': 'application/json'
                        });
                        res.end(JSON.stringify(data));

                    }, 2000);
                    break;

                case "/Login":
                    data = {
                        "errcode": 1,
                        "errmsg": "账号和密码不正确"
                    }
                    res.writeHead(200, {
                        "Content-Type": "application/json;charset=utf-8",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "X-Requested-With",
                        "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
                        "X-Powered-By": ' 3.2.1'
                    });
                    res.end(JSON.stringify(data));

                    break;
                    //代理获取其他服务器API信息 并返回
                case "/getdd":
                    getApiData("/cc_softcall/ATClient.ashx?callback=?&rand=01559185250826976&cmd=ATGetCallInfo&uid=8606&ext=8925&key=&ntype=1", function (obj, data) {

                        res.writeHead(200, {
                            "Content-Type": "application/json;charset=utf-8",
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Headers": "X-Requested-With",
                            "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
                            "X-Powered-By": ' 3.2.1'
                        });
                        res.end(JSON.stringify(data));
                    });
                    break;

                case "/getconfig":
                    getWxTokenApi("wx5159f359d518140c", "9a6a9e1c74a81d57592d8e8d66ee9302", function (result) {
                        var iurl = req.url.split('?')[1] ? req.url.split('?')[1].split('=')[1] ? req.url.split('?')[1].split('=')[1] : "" :"";
                        let _wxConfig = {
                            "appId": "wx5159f359d518140c", // 必填，公众号的唯一标识
                            "timestamp": result.timestamp, // 必填，生成签名的时间戳
                            "nonceStr": result.nonceStr, // 必填，生成签名的随机串
                            "signature": calcSignature(result.ticket, result.nonceStr, result.timestamp, iurl) // 必填，签名，见附录1
                        };              
                        
                        res.writeHead(200, {
                            "Content-Type": "application/json;charset=utf-8",
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Headers": "X-Requested-With",
                            "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
                            "X-Powered-By": ' 3.2.1'
                        });
                        res.end(JSON.stringify(_wxConfig));
                    });
                    break;
                default:
                    res.writeHead(200, {
                        "Content-Type": "text/html;charset=UTF-8"
                    });
                    res.end("<div style='text-align:center'><img style='border-radius:100%' src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514523473427&di=77a8881c53af6c3d558b791a0d1ff3c1&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Fface%2F69e50a1cdde2692b314966e35dd99acf970a9cb2.jpg'><h1>网址不存在笨蛋！！</h1></div>");
                    break;
            }
        }
    });

}).listen(portCode, domainName);

console.log("Server running at " + domainName + ":" + portCode + "/");

//运行typescript
// console.log("typescript watch init...");
// c.exec('tsc -w', function (err, stdout, stderr) {
//     if (err) {
//         console.log('get weather api error:' + stderr);
//     } else {
//         var data = JSON.parse(stdout);
//         console.log(data.data);
//     }
// });

//打开默认浏览器
c.exec("start http://" + domainName + ":" + portCode + "/"); // 前面是浏览器安装目录，后面是打开的链接


// https 服务
// var options = {
// 	key : fs.readFileSync('ssh_key.pem'),   //读出 sytly 文件？
// 	cert : fs.readFileSync('ssh_cert.pem'),   //同步读出 SSL 证书
// }
 
// const server = https.createServer(options ,(req, res) => {  //监听到请求后，回调 function   req 请求相关的信息（如：从哪来过来的，类型是get还是post等信息）
// 	// res 告诉服务器给这个请求响应的内容
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');  // 返回的请求头  200 成功  文本内容Content-Type   是 text/plain
//   res.end('Hello World\n');  //返回的内容，改变内容的重启服务 ctrl+c关掉， 再重启 node server.js
// });
 
// //listen 监听 来自 127.0.0.1 3000 的请求
 
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

