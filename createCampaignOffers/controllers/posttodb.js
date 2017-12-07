var conn=require("../connections/db-connections.js");
exports.publishTodb = function(i,productlength,campaignid,req,connstring,callback){

  var inputrequest = req;

var pool =conn.getConnectionPoolForCampaignDatabase(connstring);
       pool.getConnection(function(err, connection1) {
if(err) {    

        var errstring =  err.message;
    console.log("Error connecting to dasp database "+ err.message);
         } 
        else {


console.log('CALL createCampaignProductLocationMapping("'+campaignid+'","'+inputrequest.channelId+'","'+inputrequest.channelType+'","'+inputrequest.source+'","'+inputrequest.country+'","'+inputrequest.state+'","'+inputrequest.city+'","'+inputrequest.storeId+'","'+inputrequest.products[i].productId+'","'+inputrequest.products[i].productName+'","'+inputrequest.products[i].productType+'","'+inputrequest.loyaltyType+'","'+inputrequest.startDate+'","'+inputrequest.endDate+'","'+inputrequest.discountType+'","'+inputrequest.discountAmount+'","'+inputrequest.redemptionLimit+'","'+inputrequest.voucherPatteren+'","'+inputrequest.productImgURL+'","'+inputrequest.templateId+'","'+inputrequest.logoUrl+'","'+inputrequest.offerTitle+'","'+inputrequest.offerDescription+'","'+inputrequest.voucherCount+'","'+inputrequest.products[i].subCategory+'","'+inputrequest.products[i].category+'","'+inputrequest.products[i].subDepartment+'","'+inputrequest.products[i].department+'","'+inputrequest.products[i].subCategoryName+'","'+inputrequest.products[i].categoryName+'","'+inputrequest.products[i].subDepartmentName+'","'+inputrequest.products[i].departmentName+'")');
    connection1.query('CALL createCampaignProductLocationMapping("'+campaignid+'","'+inputrequest.channelId+'","'+inputrequest.channelType+'","'+inputrequest.source+'","'+inputrequest.country+'","'+inputrequest.state+'","'+inputrequest.city+'","'+inputrequest.storeId+'","'+inputrequest.products[i].productId+'","'+inputrequest.products[i].productName+'","'+inputrequest.products[i].productType+'","'+inputrequest.loyaltyType+'","'+inputrequest.startDate+'","'+inputrequest.endDate+'","'+inputrequest.discountType+'","'+inputrequest.discountAmount+'","'+inputrequest.redemptionLimit+'","'+inputrequest.voucherPatteren+'","'+inputrequest.productImgURL+'","'+inputrequest.templateId+'","'+inputrequest.logoUrl+'","'+inputrequest.offerTitle+'","'+inputrequest.offerDescription+'","'+inputrequest.voucherCount+'","'+inputrequest.products[i].subCategory+'","'+inputrequest.products[i].category+'","'+inputrequest.products[i].subDepartment+'","'+inputrequest.products[i].department+'","'+inputrequest.products[i].subCategoryName+'","'+inputrequest.products[i].categoryName+'","'+inputrequest.products[i].subDepartmentName+'","'+inputrequest.products[i].departmentName+'")',

                function(err,rows,returnvalue){
                    if(err){
                         console.log('Error occured while executing query in DAP DB' + err.message); 
                     
                        callback(err,null);
                        
                     }
                    else
                    { 

               if(i === productlength-1){
              console.log("exiting from loop" + i); 
              connection1.release();                                                                                  
                 
              callback(null, 'exitLoop');
                    };
                    //console.log("********campaign id*************" + proximitycampaignid.Data[0].campaignid_out);
                    callback(null,'success');
                                        
                    }}
                );

} });
};