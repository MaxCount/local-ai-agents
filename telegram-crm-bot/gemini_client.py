"""Gemini AI client for parsing and OCR."""
import json
import os
from io import BytesIO
from typing import Optional

import google.generativeai as genai
from PIL import Image

from prompts import PARSE_LEAD_PROMPT, PARSE_VISITING_CARD_PROMPT


class GeminiClient:
    """Client for Gemini AI operations."""

    def __init__(self, api_key: str):
        """Initialize the Gemini client with API key."""
        genai.configure(api_key=api_key)
        self.text_model = genai.GenerativeModel("gemini-1.5-flash")
        self.vision_model = genai.GenerativeModel("gemini-1.5-flash")

    def parse_lead_text(self, text: str) -> dict:
        """
        Parse unstructured lead text into structured data.

        Args:
            text: Unstructured text containing lead information

        Returns:
            Dictionary with parsed lead data
        """
        response = self.text_model.generate_content(
            [PARSE_LEAD_PROMPT, f"\n\nВходной текст для парсинга:\n{text}"]
        )
        return self._parse_json_response(response.text)

    def parse_visiting_card(self, image_data: bytes, additional_text: str = "") -> dict:
        """
        Parse visiting card image using OCR.

        Args:
            image_data: Raw bytes of the visiting card image
            additional_text: Optional additional text from user comment

        Returns:
            Dictionary with parsed visiting card data
        """
        image = Image.open(BytesIO(image_data))

        prompt = PARSE_VISITING_CARD_PROMPT
        if additional_text:
            prompt += f"\n\nДополнительная информация от пользователя:\n{additional_text}"

        response = self.vision_model.generate_content(
            [prompt, image]
        )
        return self._parse_json_response(response.text)

    def _parse_json_response(self, response_text: str) -> dict:
        """Parse JSON from Gemini response, handling potential formatting issues."""
        try:
            text = response_text.strip()
            if text.startswith("```json"):
                text = text[7:]
            elif text.startswith("```"):
                text = text[3:]
            if text.endswith("```"):
                text = text[:-3]

            text = text.strip()
            return json.loads(text)
        except json.JSONDecodeError as e:
            return {"error": f"Failed to parse JSON: {e}", "raw_text": response_text}
