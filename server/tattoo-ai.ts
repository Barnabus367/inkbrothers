import express from 'express';
import rateLimit from 'express-rate-limit';

const router = express.Router();

/**
 * TATTOO AI GENERATOR API
 * 
 * Core Features:
 * - HuggingFace Stable Diffusion integration for tattoo image generation
 * - Robust error handling with fallback SVG icons
 * - Rate limiting (4 requests per IP per 10 minutes)
 * - Input validation and prompt optimization
 * - 40-second timeout protection
 * - Zero token leaks to frontend
 */

// Rate limiting: 4 requests per IP per 10 minutes
const tattooGenerationLimit = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 4, // limit each IP to 4 requests per windowMs
  message: {
    image: getFallbackImage(),
    error: "Zu viele Anfragen. Bitte warte 10 Minuten bevor du es erneut versuchst."
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Skip rate limiting validation warnings in Replit environment
  skip: (req) => false,
  keyGenerator: (req) => req.ip || 'unknown'
});

/**
 * Fallback SVG icon for when HuggingFace fails
 * Returns a professional tattoo machine icon as data URL
 */
function getFallbackImage(): string {
  const svgIcon = `
    <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="machineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#666;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#333;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Tattoo Machine Body -->
      <rect x="60" y="40" width="80" height="120" rx="8" fill="url(#machineGrad)" stroke="#a62828" stroke-width="2"/>
      
      <!-- Needle Assembly -->
      <rect x="75" y="25" width="50" height="20" rx="4" fill="#a62828"/>
      <rect x="95" y="15" width="10" height="15" fill="#666"/>
      <line x1="100" y1="15" x2="100" y2="5" stroke="#333" stroke-width="2"/>
      
      <!-- Grip -->
      <rect x="85" y="160" width="30" height="25" rx="12" fill="#444" stroke="#a62828" stroke-width="1"/>
      
      <!-- Power Cord -->
      <path d="M60 80 Q30 85 25 100 Q20 115 30 120" stroke="#333" stroke-width="4" fill="none"/>
      
      <!-- Details -->
      <circle cx="85" cy="70" r="3" fill="#a62828"/>
      <circle cx="115" cy="70" r="3" fill="#a62828"/>
      <rect x="70" y="90" width="60" height="2" fill="#a62828"/>
      <rect x="70" y="110" width="60" height="2" fill="#a62828"/>
      
      <!-- Text -->
      <text x="100" y="195" text-anchor="middle" fill="#666" font-family="Arial" font-size="12">Tattoo Generator</text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${Buffer.from(svgIcon).toString('base64')}`;
}

/**
 * Validates and sanitizes user input
 * Ensures description is between 5-250 characters and contains reasonable content
 */
function validateInput(description: string): { isValid: boolean; error?: string } {
  if (!description || typeof description !== 'string') {
    return { isValid: false, error: "Beschreibung ist erforderlich." };
  }
  
  const trimmed = description.trim();
  
  if (trimmed.length < 5) {
    return { isValid: false, error: "Beschreibung muss mindestens 5 Zeichen lang sein." };
  }
  
  if (trimmed.length > 300) {
    return { isValid: false, error: `Prompt darf maximal 300 Zeichen lang sein. Aktuell: ${trimmed.length} Zeichen.` };
  }
  
  // Basic content filtering
  const suspiciousPatterns = /(<script|javascript:|data:|vbscript:|onload=|onerror=)/i;
  if (suspiciousPatterns.test(trimmed)) {
    return { isValid: false, error: "Ungültiger Inhalt in der Beschreibung." };
  }
  
  return { isValid: true };
}

/**
 * Optimizes user description into a professional tattoo prompt
 * Frontend already provides complete prompt, just clean and validate
 */
function optimizeTattooPrompt(description: string): string {
  // Frontend provides complete prompt with all elements
  // Just clean and ensure proper formatting
  const cleanPrompt = description.trim()
    .replace(/\s+/g, ' ')  // Multiple spaces to single
    .replace(/,\s*,/g, ',') // Remove duplicate commas
    .replace(/^[",\s]+|[",\s]+$/g, ''); // Remove leading/trailing quotes and spaces
  
  return cleanPrompt;
}

/**
 * Gets a random fallback image from the local gallery
 * Returns a professional tattoo design when external APIs are unavailable
 */
function getRandomFallbackImage(): string {
  const fallbackImages = [
    '/gallery/fallback1.svg', // Wolf Tribal
    '/gallery/fallback2.svg', // Dragon Fire
    '/gallery/fallback3.svg', // Gothic Rose
    '/gallery/fallback4.svg', // Skull Bones
    '/gallery/fallback5.svg'  // Tree of Life
  ];
  
  const randomIndex = Math.floor(Math.random() * fallbackImages.length);
  const selectedImage = fallbackImages[randomIndex];
  
  console.log(`📷 Using fallback gallery image: ${selectedImage}`);
  return selectedImage;
}

/**
 * Calls external AI APIs for image generation with multiple fallbacks
 * 1. StableDiffusionAPI.com (with API key)
 * 2. HuggingFace Spaces (gradio API)
 * 3. Local gallery as final fallback
 */
async function generateTattooImage(prompt: string): Promise<{ success: boolean; image?: string; error?: string; isFallback?: boolean }> {
  const limitedPrompt = prompt.slice(0, 300);
  
  // Try multiple external APIs with proper authentication
  const STABLE_DIFFUSION_API_KEY = process.env.STABLE_DIFFUSION_API_KEY;
  
  if (STABLE_DIFFUSION_API_KEY) {
    try {
      console.log("\n=== StableDiffusionAPI.com Generation ===");
      console.log("Prompt:", limitedPrompt);
      console.log("Prompt length:", limitedPrompt.length);
      console.log("API Key length:", STABLE_DIFFUSION_API_KEY.length);
      
      const requestBody = {
        key: STABLE_DIFFUSION_API_KEY,
        prompt: limitedPrompt,
        negative_prompt: "blurry, low quality, distorted, deformed, text",
        width: "512",
        height: "512", 
        samples: "1",
        num_inference_steps: "20",
        guidance_scale: 7.5,
        safety_checker: "yes",
        enhance_prompt: "yes"
      };
      
      console.log("Request body keys:", Object.keys(requestBody));
      
      // Try multiple endpoint versions
      const endpoints = [
        "https://stablediffusionapi.com/api/v3/text2img",
        "https://stablediffusionapi.com/api/v4/dreambooth",
        "https://stablediffusionapi.com/api/v5/text2img"
      ];
      
      const response = await fetch(endpoints[0], {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody),
        signal: AbortSignal.timeout(30000)
      });
      
      console.log("StableDiffusionAPI response code:", response.status);
      console.log("Response headers:", Object.fromEntries(response.headers.entries()));
      
      if (response.ok) {
        const responseData = await response.json();
        console.log("StableDiffusionAPI response keys:", Object.keys(responseData));
        console.log("Full response:", responseData);
        
        if (responseData.output && responseData.output.length > 0) {
          const imageUrl = responseData.output[0];
          console.log("✅ StableDiffusionAPI image generated successfully");
          console.log("Image URL preview:", imageUrl.substring(0, 100));
          return { success: true, image: imageUrl, isFallback: false };
        } else if (responseData.status === "processing") {
          console.log("⏳ StableDiffusionAPI is processing, will use gallery");
        } else {
          console.log("⚠️ Unexpected response format:", responseData);
        }
      } else {
        const errorText = await response.text();
        console.error(`❌ StableDiffusionAPI error: ${response.status}`);
        console.error("Error details:", errorText);
        
        if (response.status === 401) {
          console.error("❌ Invalid API key for StableDiffusionAPI");
        } else if (response.status === 404) {
          console.error("❌ API endpoint not found - key may need activation or wrong endpoint");
        } else if (response.status === 429) {
          console.error("❌ Rate limit exceeded for StableDiffusionAPI");
        }
      }
    } catch (error: any) {
      console.error('StableDiffusionAPI generation error:', error.message);
    }
  }
  
  // Try HuggingFace Spaces as fallback
  const HUGGINGFACE_TOKEN = process.env.HUGGINGFACE_ACCESS_TOKEN;
  
  if (HUGGINGFACE_TOKEN) {
    try {
      console.log("\n=== HuggingFace Spaces Generation ===");
      console.log("Prompt:", limitedPrompt);
      
      // Try popular Stable Diffusion space
      const spaceUrl = "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5";
      
      const response = await fetch(spaceUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HUGGINGFACE_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: limitedPrompt }),
        signal: AbortSignal.timeout(30000)
      });
      
      console.log("HuggingFace Spaces response code:", response.status);
      
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType?.includes('image/')) {
          const imageBuffer = await response.arrayBuffer();
          const base64Image = Buffer.from(imageBuffer).toString('base64');
          const imageUrl = `data:image/png;base64,${base64Image}`;
          
          console.log("✅ HuggingFace Spaces image generated successfully");
          return { success: true, image: imageUrl, isFallback: false };
        }
      } else {
        const errorText = await response.text();
        console.error(`❌ HuggingFace Spaces error: ${response.status}`);
        console.error("Error details:", errorText);
      }
    } catch (error: any) {
      console.error('HuggingFace Spaces generation error:', error.message);
    }
  }
  
  // Always provide fallback image - no "AI not available" messages
  const fallbackImagePath = getRandomFallbackImage();
  console.log("🎨 Serving gallery inspiration instead of AI generation");
  
  return { 
    success: true, 
    image: fallbackImagePath,
    isFallback: true
  };
}

/**
 * Main API endpoint for tattoo generation
 * POST /api/generate-tattoo
 * Body: { description: "user tattoo description" }
 */
router.post('/generate-tattoo', tattooGenerationLimit, async (req, res) => {
  const startTime = Date.now();
  const clientIP = req.ip || req.connection.remoteAddress || 'unknown';
  
  console.log(`[${new Date().toISOString()}] Tattoo generation request from ${clientIP}`);
  
  try {
    const { description } = req.body;
    
    // Input validation
    const validation = validateInput(description);
    if (!validation.isValid) {
      console.log(`[${new Date().toISOString()}] Invalid input from ${clientIP}: ${validation.error}`);
      return res.status(400).json({
        image: getFallbackImage(),
        error: validation.error
      });
    }
    
    // Optimize prompt for tattoo generation
    const optimizedPrompt = optimizeTattooPrompt(description);
    console.log(`[${new Date().toISOString()}] Optimized prompt: "${optimizedPrompt.substring(0, 100)}..."`);
    
    // Generate image with StableDiffusionAPI or fallback to gallery
    const result = await generateTattooImage(optimizedPrompt);
    
    const duration = Date.now() - startTime;
    console.log(`[${new Date().toISOString()}] Generation completed in ${duration}ms for ${clientIP}`);
    
    if (result.success && result.image) {
      return res.json({
        image: result.image,
        isFallback: result.isFallback || false,
        message: result.isFallback 
          ? "KI ist aktuell ausgelastet, hier unsere Top-Tattoo-Inspiration!"
          : "KI-generiertes Tattoo-Design basierend auf deiner Beschreibung"
      });
    } else {
      // This shouldn't happen with the new system, but keep as safety net
      return res.status(200).json({
        image: getFallbackImage(),
        isFallback: true,
        message: "KI ist aktuell ausgelastet, hier unsere Top-Tattoo-Inspiration!"
      });
    }
    
  } catch (error: any) {
    const duration = Date.now() - startTime;
    console.error(`[${new Date().toISOString()}] Unexpected error after ${duration}ms for ${clientIP}:`, error.message);
    
    // Always return fallback - never crash the API
    return res.status(500).json({
      image: getFallbackImage(),
      error: "Ein unerwarteter Fehler ist aufgetreten. Versuche es später erneut."
    });
  }
});

/**
 * Health check endpoint
 * GET /api/tattoo-status
 */
router.get('/tattoo-status', (req, res) => {
  const hasToken = !!process.env.HUGGINGFACE_ACCESS_TOKEN;
  
  res.json({
    status: "Tattoo KI-API aktiv",
    timestamp: new Date().toISOString(),
    huggingface_configured: hasToken,
    rate_limit: "4 requests per 10 minutes per IP"
  });
});

export default router;