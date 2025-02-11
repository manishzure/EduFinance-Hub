# Import necessary modules
import google.generativeai as genai
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Configure Google Generative AI with API key
api_key = os.getenv("GENERATIVEAI_API_KEY")
genai.configure(api_key=api_key)

# Global variable to maintain chat session
chat = None

# Generation configuration and safety settings
generation_config = {
    "temperature": 0.9,
    "top_p": 0.5,
    "top_k": 5,
    "max_output_tokens": 1000,
}

safety_settings = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
]

# Function to handle text summary requests
def text_summary(text, isNew=False):
    global chat
    
    if isNew or chat is None:  # Start a new chat session
        model = genai.GenerativeModel(
            model_name="gemini-pro",
            generation_config=generation_config,
            safety_settings=safety_settings
        )
        chat = model.start_chat()
        chat.send_message("""
        Act as a financial advisor and generate financial summaries in a structured and tabular format. Follow these guidelines strictly:

        - Start each section with a clear title in <strong> tags.
        - For key metrics, use a table with two columns: one for the metric name and one for its value.
        - Use bullet points only for listing risks and growth prospects.
        - Ensure each section is clearly separated with line breaks.
        - Do not use bold or italic formatting (, *), except for the specified HTML tags.

        Example format:

        <strong>Company Overview</strong><br/>
        <p>Company Name: {Company Name}</p>
        <p>Description: {Company Description}</p>
        <br/><br/>

        <strong>Stock Performance</strong><br/>
        <p>Apple Inc. (AAPL) is a highly valued stock...</p>
        <br/><br/>

        <strong>Key Metrics</strong><br/>
        <table>
            <tr>
                <th>Metric</th>
                <th>Value</th>
            </tr>
            <tr>
                <td>Market Capitalization</td>
                <td>$2.7 trillion</td>
            </tr>
            <tr>
                <td>Stock Price</td>
                <td>$170 per share</td>
            </tr>
            <tr>
                <td>EPS (TTM)</td>
                <td>$6.15</td>
            </tr>
            <tr>
                <td>P/E Ratio</td>
                <td>24.34</td>
            </tr>
        </table>
        <br/><br/>

        <strong>Growth Prospects</strong><br/>
        <ul>
            <li>iPhone sales growth in emerging markets.</li>
            <li>Expansion of services revenue.</li>
            <li>Increased demand for wearable devices.</li>
            <li>Development of AR/VR technologies.</li>
        </ul>
        <br/><br/>

        <strong>Risks</strong><br/>
        <ul>
            <li>Competition from other technology companies.</li>
            <li>Dependence on iPhone sales.</li>
            <li>Economic downturns.</li>
            <li>Supply chain disruptions and geopolitical risks.</li>
        </ul>
        <br/><br/>

        <strong>Overall</strong><br/>
        <p>Apple Inc. is a financially strong company with a history of innovation...</p>
        <br/><br/>
        """)

    # Send message and return response
    response = chat.send_message(text)
    return response.text
