//          (_    ,_,    _) 
//          / `'--) (--'` \
//         /  _,-'\_/'-,_  \
//        /.-'     "     '-.\
//         Julia Orion Smith

var Crawler = require("crawler");
var csv = require("fast-csv");
var fs = require("fs");

var NUM="0";

exports.enlist = function (num, cb){
    var c = new Crawler({
        maxConnections : 10,
        // This will be called for each crawled page
        callback : function (error, res, done) {
            info=[];
            links=[];
            if(error){
                console.log(error);
                cb([error])
            }else{
                var $ = res.$;
                // $ is Cheerio by default
                //a lean implementation of core jQuery designed specifically for the server
                $("article").each(function( index ) {
                    date=$(this).find("time").attr("date");
                    link='https://www.gob.mx'+$(this).find(".small-link").attr("href");
                    title=$(this).find("h2").text();
                    img=$(this).find("img").text();
                    info.push({"date":date,"link":link,"title":title,"img":img})
                    links.push(link);
                      //console.log( date, link, title, img );
                });
                //console.log($(".small-link").text());
                NUM=num;
                cb(info,links);
            }

            done();
        }
    });
    
    c.queue('https://www.gob.mx/presidencia/es/archivo/articulos?idiom=es&order=DESC&page='+num);
}

exports.crawl=function (links){

    var c = new Crawler({
        rateLimit: 2000,
        // This will be called for each crawled page
        callback : function (error, res, done) {
            info=[];
            autores={}
            LINKS=[];
            if(error){
                console.log(error);
                //cb([error])
            }else{
                var $ = res.$;
                // $ is Cheerio by default
                //a lean implementation of core jQuery designed specifically for the server
                title=$(".bottom-buffer").text();
                subtitle=$("h2").text();
                fuente=$(".border-box").find("dl:nth-child(2)").text();
                date=$(".border-box dd:nth-child(4)").html();//find("dl:nth-child(2)").find("dd").text();//title.split("|")[1];
                uri=res.options.uri.split("/");
                ursiSTR=uri[uri.length - 1];
                //console.log("URI",ursiSTR)
                ursiSTR=ursiSTR.split("?")[0];
                AUTOR="";

                $(".article-body p").each(function( index ) {


                    autor=$(this).find("strong").text();
                    nombre=autor;
                    cargo="";
                    if(autor.length>0){
                        if( autor.includes(',') ){
                            nombre=autor.split(",")[0].trim()
                            cargo=autor.split(",")[1].trim()
                            
                        }
                        else{
                            
                        }
                        
                        AUTOR=autor.replace(':','').trim();
                        if(cargo.length>0){
                            AUTOR=nombre;
                        }

                    }
                   if(!autores[AUTOR]){
                                autores[AUTOR]={"cargo":cargo, "nombre":nombre, "apariciones":0}
                            }
                            autores[AUTOR]["apariciones"]+=1;
                    info.push({autor:AUTOR, info:$(this).text()})
                    
                });
                
            }
            fs.writeFileSync('BLOG_P/'+date+"_"+ursiSTR+'.json', JSON.stringify({"articulo":info,"url":res.options.uri,"metadata":{ "date":date,"fuente":fuente,"title":title, "subtitle":subtitle }}, null, 2) , 'utf-8');
            //console.log(date+ursiSTR)
            done();
            //cb({"articulo":info,"metadata":{ "date":date,"title":title.split("|")[0] }},autores,LINKS);
        }
    });

    c.queue(links);
}


function writer(){

}
