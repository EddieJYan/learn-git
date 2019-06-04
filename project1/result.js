#! /usr/bin/env node

var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs");

var domainName = getIPAdress(),
    portCode = 443;

/**
 * 获取本机IP地址
 * @method getIPAdress
 * @return {string} IP字符串
 */
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

//创建服务
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
                default:
                    res.writeHead(200, {
                        "Content-Type": "application/octet-stream"
                    });

            }

            fs.readFile(pathname, function (err, data) {
                res.end(data);
            });
        }else{
            //404
            res.writeHead(404, {
                "Content-Type": "text/html;charset=UTF-8"
            });
            res.end("<div style='text-align:center'><img style='border-radius:100%' src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514523473427&di=77a8881c53af6c3d558b791a0d1ff3c1&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Fface%2F69e50a1cdde2692b314966e35dd99acf970a9cb2.jpg'><h1>404</h1><p>网址不存在啊！哈哈！！</p></div>");
        }
    })


}).listen(portCode, domainName);

console.log("Server running at " + domainName + ":" + portCode + "/");