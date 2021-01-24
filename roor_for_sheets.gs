function apiKey() {
  var key = 'YOUR KEY';
  return key;
}

function sendSMS() {
  
  var sheet = SpreadsheetApp.getActiveSheet();
  var key = apiKey();
  var sendPhone = '14245351118';
  var endPhone = '18185368267';
  var message = 'This is a test.';
  var SendSMS = 'https://roor.gynetix.com/standard/api/post/manualTXT/key/'
  var apiRequest = SendSMS + key + "/response/json/?to=+" + endPhone + "&from=+" + sendPhone + "&message=" + message;
  
  //var response = UrlFetchApp.fetch(apiRequest);
  
  Logger.log(response.getContentText());

}


function GetConvo() {
  
  var sheet = SpreadsheetApp.getActiveSheet();
  var key = apiKey();
  var endPhone = '18185368267';
  var GetConvo = 'https://roor.gynetix.com/standard/api/messenger/getConversation/key/';
  var apiRequest = GetConvo + key + "/response/json/?phone=" + endPhone;
  
  var response = UrlFetchApp.fetch(apiRequest);
  var json = response.getContentText();
  var text = JSON.parse(json);
  
  sheet.getRange(sheet.getLastRow() + 1,1).setValue([json]);
  
  //Logger.log(json);
  
}



function GetCampaigns() {
  
  var sheet = SpreadsheetApp.getActiveSheet();
  var key = apiKey();
  var GetCampaigns = 'https://roor.gynetix.com/standard/api/v1/getCampaignList/key/';
  var stdate = '2020-01-01';
  var endate = '2020-02-11'; //optional
  var apiRequest = GetCampaigns + key + "/response/json/startdate/" + stdate + '/enddate/' + endate; //optional add enddate
  var response = UrlFetchApp.fetch(apiRequest);
  var json = response.getContentText();
  var data = JSON.parse(json);
  return data;

}

function GetCampaignCount() {
  
  var data = GetCampaigns();
  var count = data["count"];
  return count;
}
 
function GetCampaignIDs() {
  
  var data = GetCampaigns();
  var campaigns = data["campaigns"];
  var cpid = [];
  for (var index in campaigns)
  {
    cpid.push(campaigns[index]["cpid"]);
  };
  return cpid;
}

function GetCampaignReport() {
  
  var sheet = SpreadsheetApp.getActiveSheet();
  var count = GetCampaignCount();
  var cpid = GetCampaignIDs();
  for (var i = 0; i< count; i++)
  {
  sheet.getRange(i+1,1).setValue([cpid[i]])
  };
}


function GetCampaignDetail() {
  
  var sheet = SpreadsheetApp.getActiveSheet();
  var key = apiKey();
  var GetCampaignDetail = 'https://roor.gynetix.com/standard/api/v1/getCampaignDetails/key/';
  var cpid = 103920
  var apiRequest = GetCampaignDetail + key + "/response/json/cpid/" + cpid;
  var response = UrlFetchApp.fetch(apiRequest);
  var json = response.getContentText();
  var data = JSON.parse(json);
  
  Logger.log(data["results"]["daily"])
  
}





