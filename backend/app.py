from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
import json
import datetime
import requests
#import custom function

from chef import text_summary

app = Flask(__name__) 
CORS(app)   # CORS: Allows your API to be accessed from different domains.


# Route /chef: This is an endpoint that accepts POST requests.
@app.route('/chef', methods=['POST'])
def summarize_text():

# Get the text from the request body
    text = request.json['text']
    isNew = request.json['isNew']

    # : Calls the text_summary function with the text and isNew flag.
    response = text_summary(text, isNew)

    #  Sends back the summarized text as a JSON response.
    return jsonify({"response": response})

NEWS_API_KEY = '460479ede489408c8da194b6638e7d16'

@app.route('/news', methods=['GET'])
def get_news():
    query = request.args.get('query', 'apple')  # Default query is 'apple'
    days = int(request.args.get('days', 1))  # Default is 1 day

    today = datetime.datetime.today().strftime('%Y-%m-%d')
    from_date = (datetime.datetime.today() - datetime.timedelta(days=days)).strftime('%Y-%m-%d')

    url = f"https://newsapi.org/v2/everything?q={query}&from={from_date}&to={today}&sortBy=popularity&language=en&apiKey={NEWS_API_KEY}"

    try:
        response = requests.get(url)
        articles = response.json().get('articles', [])[:10]  # Limit to 10 articles
        return jsonify(articles)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
# runs the app 
if __name__ == '__main__':
    app.run(debug=True, port=5000)