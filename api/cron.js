export default async function handler(req, res) {
  try {
    // Tumhare Render server ka /ping route
    const response = await fetch('https://backendofuniwhisper.onrender.com/ping');
    
    if (response.ok) {
      console.log("Render Server ko successfully jaga diya!");
      return res.status(200).json({ success: true, message: "Pinged Render successfully" });
    } else {
      return res.status(500).json({ success: false, message: "Render server ping failed" });
    }
  } catch (error) {
    console.error("Ping Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}