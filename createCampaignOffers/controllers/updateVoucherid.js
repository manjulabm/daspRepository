var conn=require("../connections/db-connections.js");
exports.updatevoucheridindatabase = function(voucherid,campaignid,status,connstring,callback){



var pool =conn.getConnectionPoolForCampaignDatabase(connstring);
       pool.getConnection(function(err, connection1) {
if(err) {    

        var errstring =  err.message;
    console.log("Error connecting to dasp database "+ err.message);
         } 
        else {


console.log('CALL updatevoucherid("'+voucherid+'","'+campaignid+'")');
    connection1.query('CALL updatevoucherid("'+voucherid+'","'+status+'","'+campaignid+'")',

                function(err,rows,returnvalue){
                    if(err){
                         console.log('Error occured while executing query in DAP DB' + err.message); 
                     
                        callback(err,null);
                        
                     }
                    else
                    { 

                                  //console.log("********campaign id*************" + proximitycampaignid.Data[0].campaignid_out);
                    callback(null,'success');
                                        
                    }}
                );

} });
};