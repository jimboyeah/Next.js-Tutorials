// import sq3, {verbose} from 'sqlite3'
// https://github.com/mapbox/node-sqlite3


export function Field(name?: string, initValue?: any) {
    return function (target: any, propertyKey: string/* , descriptor: PropertyDescriptor */) {
        let isf = typeof target[propertyKey] === 'function'
        if(isf) throw "@Field meta only use for member not function";
        initValue && (target[propertyKey] = initValue)
        console.log(`Field[${propertyKey||name}]`, target, propertyKey);
    }
}

export function ID() {
    return Field('id')
}

export enum Order { 
    ASC = "asc",
    DEC = "dec",
}

export class Model {
    static order: Order
    static orderBy: string
    static offset: {start:number, size:number}
    static groupBy: string
    constructor(){ }

    executeSQL(sql: string){ }
    delete(){ }
    update(){ }
}


/* 
var db = new sqlite3.Database(db_path);
db.run("CREATE TABLE foo (id INT, txt TEXT)");
db.run("BEGIN TRANSACTION");
var stmt = db.prepare("INSERT INTO foo VALUES(?, ?)");
for (var i = 0; i < count; i++) {
 stmt.run(i, randomString());
}
db.run("COMMIT TRANSACTION");
*/

// let Sqlite3 = verbose()
// // let db = new Sqlite3.Database(':memory:');
// let db = new sq3.Database('demo.db',() => {
//     db.run("if not exists create table test(name varchar(15))",function(){
//         db.run("insert into test values('Hello sqlite!')",function(){
//             db.all("select * from test",function(err,res){
//                 if(!err)
//                 console.log("sqlite",JSON.stringify(res));
//                 else
//                 console.log("sqlite",err);
//             });
//         })
//     })
// })

// db.serialize(function() {
//   db.run("IF NOT EXISTS CREATE TABLE lorem (info TEXT)");

//   let stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//   for (let i = 0; i < 10; i++) {
//       stmt.run("Ipsum " + i);
//   }
//   stmt.finalize();

//   db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
//       console.log(row.id + ": " + row.info);
//   });
// });
// // db.each("sql", () => {}).each("sql")
// // let stm = db.prepare("sql", () => {})
// // stm.run((err)=>{})
// db.close();
