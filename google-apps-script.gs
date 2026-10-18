/**
 * Google Apps Script — RSVP form handler
 * 
 * SETUP:
 * 1. Open your Google Sheet (create one if needed)
 * 2. Add these headers in Row 1:
 *    A1: Timestamp | B1: Name | C1: Phone | D1: Attending | E1: Party Size | F1: Events | G1: Song | H1: Advice
 * 3. Go to Extensions → Apps Script
 * 4. Delete any existing code and paste this entire file
 * 5. Click Save (💾)
 * 6. Click Deploy → New deployment
 *    - Click the gear icon ⚙️ next to "Select type" → choose "Web app"
 *    - Description: "RSVP Handler"
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone"  ← THIS IS CRITICAL (not "Anyone with Google Account")
 * 7. Click "Deploy"
 * 8. Authorize the app when prompted (Review Permissions → your account → Allow)
 * 9. Copy the Web app URL (https://script.google.com/macros/s/.../exec)
 * 10. Paste that URL into SHEET_ENDPOINT in index.js
 *
 * IMPORTANT: Every time you edit this script, you must create a NEW deployment
 * (Deploy → New deployment) for changes to take effect on the /exec URL.
 * OR: Deploy → Manage deployments → edit the existing one → bump version to "New version"
 */

 function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse parameters — handle both e.parameter and e.postData for robustness
    var params = e.parameter || {};
    
    // If e.parameter is empty, try parsing from postData (form-urlencoded body)
    if ((!params.name) && e.postData && e.postData.contents) {
      var parts = e.postData.contents.split('&');
      for (var i = 0; i < parts.length; i++) {
        var kv = parts[i].split('=');
        if (kv.length === 2) {
          params[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1].replace(/\+/g, ' '));
        }
      }
    }
    
    var name = params.name || '';
    var phone = params.phone || '';
    var attending = params.attending || '';
    var party = params.party || '';
    var song = params.song || '';
    var events = params.events || '';
    var advice = params.advice || '';
    
    // Only write if we have at least a name (prevent empty/garbage rows)
    if (!name) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'error', message: 'Name is required' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    sheet.appendRow([
      new Date(),    // Timestamp
      name,          // Name
      phone,         // Phone
      attending,     // Attending
      party,         // Party Size
      song,          // Song Request
      events,        // Events
      advice         // Advice
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'RSVP saved' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// doGet handler — some browsers/forms redirect POST to GET for Apps Script
function doGet(e) {
  return doPost(e);
}

// Also handle GET requests (for testing in browser)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'RSVP endpoint is live. Use POST to submit.' }))
    .setMimeType(ContentService.MimeType.JSON);
}
