const express = require("express");
const { GoogleGenAI } = require("@google/genai");
const dotenv = require("dotenv");
const router = require("express").Router();

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post('/generate', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    // const response = await result.response;
    console.log(result.text);
    const text = result.text;
    res.json({ text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gemini request failed' });
  }
});

module.exports = router;
