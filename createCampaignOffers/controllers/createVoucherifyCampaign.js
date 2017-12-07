  var https = require('https');
exports.callVoucherify = function(req,campaignid,callback){

	              console.log("exiting from loop" + i); 

var jsonObject = JSON.stringify({

  "name": req.body.offerTitle,
  "start_date": req.body.startDate,
  "expiration_date": req.body.endDate,
  "vouchers_count": req.body.voucherCount,
  "voucher": {
    "type": "DISCOUNT_VOUCHER",
    "discount": {
      "percent_off": req.body.discountAmount,
      "type": req.body.discountType
    },
    "redemption": {
      "quantity": req.body.redemptionLimit
    },
    "code_config": {
      "pattern": req.body.voucherPattern
    }
  },
  "metadata": {
     "source" : req.body.source,
     "proximityCampaignId"  : campaignid,
     "channelid" : req.body.channelId,
     "loyaltyType"  : req.body.loyaltyType,
      "productImgURL" : req.body.productImgURL,
      "redemptionLimit": req.body.redemptionLimit,
     "templateID"  : req.body.templateId,
      "logoUrl" : req.body.logoUrl,
      "offerTitle" : req.body.offerTitle,
      "offerDescription" : req.body.offerDescription,
      "budgetAllocated"  : req.body.budgetAllocated
     }
 

});
jsonObject = jsonObject.replace("percent_off",req.body.discountType.toLowerCase()+"_off");
console.log("jsonObject :: "+jsonObject);

var options = {
                  "method": "POST",
                  "hostname": "api.voucherify.io",
                  "port": null,
                  "path": "/v1/campaigns",
                  "headers": {
                           "content-type": "application/json",
                            "X-App-Id":process.env.voucherifyApplicationId,
                            "X-App-Token":process.env.voucherifyClientSecretKey
                           //"X-App-Id": "c5c3ff14-24e6-4cf9-a146-1533e2721ce3",
                           //"X-App-Token" : "f499a336-9589-43c6-b5a2-e6c6b64183d5"
                                  }
                        };

  var reqPost = https.request(options, function(res) {
  console.log("response: " +  res);
  var chunks = [];
     res.on('data', function(campiagnDtls) {
       chunks.push(campiagnDtls);
       process.stdout.write(" D " + campiagnDtls);
      console.info('\n\nCall completed');
        
    });

    res.on("end", function () {
      var responseObject = JSON.parse(chunks);
      console.log("responseObject   "+ JSON.stringify(responseObject));
      stringres =  JSON.stringify({'Data':responseObject});
objRes = JSON.parse(stringres);

      console.log("responseObject   "+ JSON.stringify(responseObject));
      i
      	if(objRes.Data.code === 400) {
      // console.log("voucherifyid   "+ objRes.Data.id);


        callback('Duplicate entry detected in voucherify', null);
    
}else{
    		console.log("voucherifyid   "+ objRes.Data.id);
    		 callback(null, objRes.Data.id);


    }
    });
 
});
reqPost.write(jsonObject); 
reqPost.end();
reqPost.on('error', function(e) {
    console.error(e);

     callback(e, null);
}); 

};