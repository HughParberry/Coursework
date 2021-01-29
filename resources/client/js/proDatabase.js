var db = openDatabase ('Tournament_Database', '1.0', 'Test DB', 6*1024*1024);
db.transaction(function (tx){
    tx.executeSql(' CREATE TABLE IF NOT EXISTS Pros (id proId, proFore, proSur, proPseudo, netWorth, dateBirth)');
    tx.executeSql ('INSERT INTO Pros (proId, proFore, proSur, proPseudo, netWorth, dateBirth) VALUES (81,Magnus,)');
})