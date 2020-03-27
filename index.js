var util = require('util');
var fs = require("fs");
var async = require("async");
var BlogP = require('./blog_p');

//          (_    ,_,    _) 
//          / `'--) (--'` \
//         /  _,-'\_/'-,_  \
//        /.-'     "     '-.\
//         Julia Orion Smith

catalogo=[]
num=1;
spArray=["init"];




BlogP.enlist(5,function(resArray,links){
    console.log(links)
    if(links.length>0){
      catalogo.concat(resArray);
      BlogP.crawl(links);
    }
    else{
        console.log("VOID");
    }
});

function docBot(entradas){

}


// BlogP.crawl(1,function(resArray, nameArray){
//  console.log("@@@@@@@@",resArray,"@@@@@@@@",nameArray)

// });


// async.whilst(
//     function test(cb) { cb(null, spArray.length >0 ); },
//     function iter(callback) {

//         BlogP.enlist(num,function(resArray){
//         	console.log(num,resArray.length)
//         	num++;
//         	spArray=resArray;
//         	catalogo.concat(resArray);
//         	callback(null, resArray);
//         });
//         // setTimeout(function() {
//         //     callback(null, count);
//         // }, 1000);
//     },
//     function (err, n) {
//     	fs.writeFileSync('data2C.json', JSON.stringify(catalogo, null, 2) , 'utf-8');
//         // 5 seconds have passed, n = 5
//     }
// );


// BlogP.enlist(1,function(resArray){




// 	if(resArray.length>0){
// 		catalogo.concat(resArray);

// 	}

	
// });

// BlogP.crawl(1,function(resArray, nameArray){
// 	console.log("@@@@@@@@",resArray,"@@@@@@@@",nameArray)

// });