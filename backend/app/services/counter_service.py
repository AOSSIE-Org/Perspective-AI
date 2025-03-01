import requests
from app.prompts.opposite_perspective import get_opposite_perspective_prompt
from dotenv import load_dotenv
import os

load_dotenv()
hf_token = os.getenv("HF_TOKEN")

PERSPECTIVE_URL = "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1"
headers = {"Authorization": f"Bearer {hf_token}"}

def generate_opposite_perspective(article_text):
    final_prompt = get_opposite_perspective_prompt(article_text)
    json_prompt = {"inputs": final_prompt}
    response = requests.post(PERSPECTIVE_URL, headers=headers, json=json_prompt)
    result = response.json()[0]["generated_text"]
    # Extract only the generated perspective after the cue
    if "Opposite Perspective:" in result:
        perspective = result.split("Opposite Perspective:")[-1].strip()
    else:
        perspective = result.strip()
    return perspective

	
