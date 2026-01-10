async function test() {
  const formData = new FormData();
  formData.append("text", "I want a simple to-do list app.");
  
  try {
    const res = await fetch("http://localhost:3000/api/refine", {
      method: "POST",
      body: formData
    });
    
    if (res.ok) {
      console.log("SUCCESS: API responded with 200 OK");
      const json = await res.json();
      console.log("Structured Output:", JSON.stringify(json.structured, null, 2));
    } else {
      console.error("ERROR: API responded with status", res.status);
      const text = await res.text();
      console.error("Response:", text);
    }
  } catch (e) {
    console.error("NETWORK ERROR:", e.message);
  }
}

test();
