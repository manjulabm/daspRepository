
var infolog;
//var responsedataset = require("../Transformation/responseconstructor.js");
var DBdatetime = new Date();
_ = require('lodash');
var logger = require("../logging/logger");
 var conn=require("../connections/db-connections.js");
var datetime = new Date(),
 responseComposer = require("../transformation/response-composer.js"),
 publishtodatabase =  require("./posttodb.js");
  callVoucherifyfunction =  require("./createVoucherifyCampaign.js");
   updatevoucheridindatabase =  require("./updateVoucherid.js");
  var https = require('https');


    var mysql = require('mysql');
  exports.categorywiseproductcontroller = function(req,callback) {
    var reqObject = req,
  config = _.get(reqObject, "config", ''),
  //isLoggingEnabled = _.get(config, "logenableflag", '0') === "1",
  headers = _.get(reqObject, "headers", {}),
  body = _.get(reqObject, "body", {});


  //var ProductDetailsTransform =require("../transformation/createCampaignTransformer.js");
  
  var responsestring;


    var connstring = req.config;
    var inputrequest = req.body;
    var campaignid = inputrequest.offerCampaignId;


  console.log(JSON.stringify(inputrequest));


    var pool =conn.getConnectionPoolForCampaignDatabase(connstring);
       pool.getConnection(function(err, connection) {
if(err) {    

        var errstring =  err.message;
    console.log("Error connecting to dasp database "+ err.message);
         } 
        else {
                    console.log('CALL createDASPCampaign("'+campaignid+'","'+inputrequest.channelId+'","'+inputrequest.channelType+'","'+inputrequest.source+'","'+inputrequest.country+'","'+inputrequest.state+'","'+inputrequest.city+'","'+inputrequest.storeId+'","'+inputrequest.loyaltyType+'","'+inputrequest.startDate+'","'+inputrequest.endDate+'","'+inputrequest.discountType+'","'+inputrequest.discountAmount+'","'+inputrequest.redemptionLimit+'","'+inputrequest.voucherPatteren+'","'+inputrequest.productImgURL+'","'+inputrequest.templateId+'","'+inputrequest.logoUrl+'","'+inputrequest.offerTitle+'","'+inputrequest.offerDescription+'","'+inputrequest.voucherCount+'","'+inputrequest.budgetAllocated+'","'+inputrequest.objective+'")');
                   connection.query('CALL createDASPCampaign("'+campaignid+'","'+inputrequest.channelId+'","'+inputrequest.channelType+'","'+inputrequest.source+'","'+inputrequest.country+'","'+inputrequest.state+'","'+inputrequest.city+'","'+inputrequest.storeId+'","'+inputrequest.loyaltyType+'","'+inputrequest.startDate+'","'+inputrequest.endDate+'","'+inputrequest.discountType+'","'+inputrequest.discountAmount+'","'+inputrequest.redemptionLimit+'","'+inputrequest.voucherPatteren+'","'+inputrequest.productImgURL+'","'+inputrequest.templateId+'","'+inputrequest.logoUrl+'","'+inputrequest.offerTitle+'","'+inputrequest.offerDescription+'","'+inputrequest.voucherCount+'","'+inputrequest.budgetAllocated+'","'+inputrequest.objective+'")',

                function(err,rows,returnvalue){
                    if(err){
                         console.log('Error occured while executing query in DAP DB' + err.message); 
                         callback(null, connection, responseComposer(0));
                        
                     }
                    else
                    {

     
                    var stringvalue = JSON.stringify({'Data':rows[0]});
                    var proximitycampaignid = JSON.parse(stringvalue);
                      campaignid = proximitycampaignid.Data[0].campaignid_out;
                    console.log("********campaign id*************" + proximitycampaignid.Data[0].campaignid_out);

                    if(proximitycampaignid.Data[0].campaignid_out === 0 || proximitycampaignid.Data[0].campaignid_out === '0'){
                        callback(null, connection, responseComposer(0,0));


                  }else{
                      //handle duplicate camaign offer name
                    

    console.log(inputrequest.products.length);
    var productlength= inputrequest.products.length;
     
       for (i=0; i<productlength ; i++){
             // console.log('CALL createDASPCampaign("'+campaignid+'","'+inputrequest.channelId+'","'+inputrequest.source+'","'+inputrequest.country+'","'+inputrequest.state+'","'+inputrequest.city+'","'+inputrequest.storeId+'","'+inputrequest.products[i].productId+'","'+inputrequest.products[i].productName+'","'+inputrequest.products[i].productType+'","'+inputrequest.loyaltyType+'","'+inputrequest.startDate+'","'+inputrequest.endDate+'","'+inputrequest.discountType+'","'+inputrequest.discountVal+'","'+inputrequest.redemptionLimit+'","'+inputrequest.voucherPatteren+'","'+inputrequest.productImgURL+'","'+inputrequest.templateId+'","'+inputrequest.logoUrl+'","'+inputrequest.offerTitle+'","'+inputrequest.offerDescription+'","'+inputrequest.offerDescription+'")');
              console.log( "i " + i);
        publishtodatabase.publishTodb(i,productlength,campaignid,inputrequest,connstring,function(err,res){

          if(err){

          }else{

            console.log("Response from callback: " +res);
            console.log( "i " + i);
            console.log( "length " +  inputrequest.products.length);
          
         if(res === 'exitLoop'){
              console.log("exiting from loop" + i); 
              if( (inputrequest.offerCampaignId=== 0 || inputrequest.offerCampaignId=== '0') && inputrequest.objective === 'offer'){
              callVoucherifyfunction.callVoucherify(req,campaignid,function(error, vcampaignid)
              {
                if(err){

                      updatevoucheridindatabase.updatevoucheridindatabase(0,campaignid,'failed',connstring,function(err,updateres){
                      
                       callback(null, connection, responseComposer(0,'Error at voucherify for offercampaignid' + campaignid ));                 

                    })                 

                }else{

                    updatevoucheridindatabase.updatevoucheridindatabase(vcampaignid,campaignid,'created',connstring,function(err,updateres){
                      if(err){
                         callback(null, connection, responseComposer(0,'voucherify id upation failed for offercampaignid'+ campaignid));

                      }else{
                        callback(null, connection, responseComposer(1,campaignid));

                      }

                    })
                 

                }

              });
          }else{
            //  response for updatation.

            callback(null, connection, responseComposer(1,campaignid));
          }

      
             
                    }
           
}

        });
       
   
              
                    }


                  }
                  

                                                            
                    }
                  }
                ); 


               
        }
});


   



   };

