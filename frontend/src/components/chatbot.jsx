import React, { useState } from 'react';
import { products } from '../assets/assets'; // adjust path as needed

// Basic policy data
const policyData = {
  returns: "At WearWave, our return policy allows you to return items within 30 days of purchase...",
  exchanges: "Exchanges are available within 30 days for items that are unused and in their original packaging...",
  billing: "For billing inquiries, please contact billing@wearwave.com...",
  shipping: "We offer standard shipping within 3-5 business days on all orders...",
  delivery: "Delivery details, including tracking information, are provided in your order confirmation email..."
};

// 1) Helper to find a product by name or ID
function findProductByQuery(userQuery) {
  const lowerQuery = userQuery.toLowerCase();

  // Match by ID first
  let matchedProduct = products.find(prod => lowerQuery.includes(prod._id.toLowerCase()));
  // If not found, match by name
  if (!matchedProduct) {
    matchedProduct = products.find(prod => lowerQuery.includes(prod.name.toLowerCase()));
  }
  return matchedProduct || null;
}

// 2) Build the prompt with dynamic product context if found
function buildPrompt(userQuery) {
  const matchedProduct = findProductByQuery(userQuery);

  let productContext = '';
  if (matchedProduct) {
    productContext = `
Product Found:
Name: ${matchedProduct.name}
Category: ${matchedProduct.category}
Sub-Category: ${matchedProduct.subCategory}
Price: $${matchedProduct.price}
Sizes: ${matchedProduct.sizes.join(', ')}
Description: ${matchedProduct.description}

Please reference the above product details if relevant to the user's query.
`;
  }

  return `
You are an AI customer support assistant for WearWave, a premium e-commerce clothing website offering apparel for kids, men, and women. Your role is to help customers by answering their inquiries in a clear, friendly, and detailed manner while reflecting WearWave’s brand voice.

${productContext}

Policy Data:
1) Returns:
   - ${policyData.returns}
2) Exchanges:
   - ${policyData.exchanges}
3) Billing:
   - ${policyData.billing}
4) Shipping:
   - ${policyData.shipping}
5) Delivery:
   - ${policyData.delivery}

Common product-related questions include:
  • "What sizes and colors are available for [Product Name]?"
  • "Is [Product Name] in stock?"
  • "Can you provide more details on [Product Name]?"

Customer Query: "${userQuery}"

Now, please provide a focused, friendly, and specific response based on the user’s query and the above context. If the user’s question is about the identified product, incorporate the product details. Otherwise, stick to the relevant policy or general info.
`;
}

// 3) Gemini API details
const GEMINI_API_KEY = "AIzaSyAXZo70C22UzyQCKkV5-6Z9ddt9unDki7k";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const Chatbot = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleQuery = async (e) => {
    e.preventDefault();
    setLoading(true);

    const prompt = buildPrompt(query);

    try {
      const res = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        })
      });

      const data = await res.json();
      console.log("Gemini API response:", JSON.stringify(data, null, 2));

      // Extract the generated text from data
      const aiResponse = (
        data.candidates &&
        data.candidates[0] &&
        data.candidates[0].content &&
        data.candidates[0].content.parts &&
        data.candidates[0].content.parts[0] &&
        data.candidates[0].content.parts[0].text
      );

      setResponse(aiResponse || "I'm sorry, I couldn't generate a response. Please try again.");
    } catch (error) {
      console.error("Error fetching from Gemini API:", error);
      setResponse("There was an error processing your request. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="chatbot border p-4 rounded shadow-md max-w-md mx-auto mt-8">
      <h3 className="text-xl font-bold mb-4">Ask WearWave Support</h3>
      <form onSubmit={handleQuery}>
        <input
          type="text"
          className="border rounded p-2 w-full"
          placeholder="Ask about returns, shipping, or a specific product..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="mt-2 bg-black text-white px-4 py-2" disabled={loading}>
          {loading ? "Please wait..." : "Ask"}
        </button>
      </form>
      {response && <div className="mt-4 p-2 bg-gray-100 rounded">{response}</div>}
    </div>
  );
};

export default Chatbot;
