import fetch from 'node-fetch';

async function testFirestoreRest() {
  const projectId = "malala-my-id";
  const customDb = "ai-studio-malaladiscoverwe-562e18f6-b088-4083-a613-a873b9667b3f";
  
  console.log("=== Testing (default) database via REST ===");
  try {
    const urlDefault = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/destinations`;
    const res = await fetch(urlDefault);
    const data: any = await res.json();
    console.log(`(default) HTTP status: ${res.status}`);
    if (res.ok) {
      console.log(`(default) documents count: ${data.documents ? data.documents.length : 0}`);
      if (data.documents && data.documents.length > 0) {
        console.log(`Sample doc:`, data.documents[0].name);
      }
    } else {
      console.log(`(default) error:`, JSON.stringify(data));
    }
  } catch (e: any) {
    console.error(`(default) fetch error:`, e.message);
  }

  console.log("\n=== Testing custom database via REST ===");
  try {
    const urlCustom = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${customDb}/documents/destinations`;
    const res = await fetch(urlCustom);
    const data: any = await res.json();
    console.log(`(${customDb}) HTTP status: ${res.status}`);
    if (res.ok) {
      console.log(`(${customDb}) documents count: ${data.documents ? data.documents.length : 0}`);
      if (data.documents && data.documents.length > 0) {
        console.log(`Sample doc:`, data.documents[0].name);
      }
    } else {
      console.log(`(${customDb}) error:`, JSON.stringify(data));
    }
  } catch (e: any) {
    console.error(`(${customDb}) fetch error:`, e.message);
  }
}

testFirestoreRest();
