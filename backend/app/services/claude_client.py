"""
Anthropic Claude API client for generating care plans.
Simple, modular wrapper around the Anthropic SDK.
"""
from anthropic import Anthropic, APIError
from app.config import settings
from app.utils.logger import setup_logger

logger = setup_logger(__name__, settings.log_level)


class ClaudeClient:
    """Client for interacting with Anthropic Claude API."""

    def __init__(self) -> None:
        """Initialize the Claude API client."""
        self.client = Anthropic(api_key=settings.anthropic_api_key)
        self.model = "claude-sonnet-4-20250514"
        logger.info(f"Claude API client initialized with model: {self.model}")

    async def generate_completion(
        self, system_prompt: str, user_prompt: str, max_tokens: int = 4000
    ) -> str:
        """
        Generate a completion from Claude API.

        Args:
            system_prompt: System prompt to set context
            user_prompt: User prompt with the actual request
            max_tokens: Maximum tokens to generate

        Returns:
            Generated text from Claude

        Raises:
            APIError: If the API request fails
        """
        try:
            logger.info("Sending request to Claude API")
            logger.debug(f"System prompt length: {len(system_prompt)} chars")
            logger.debug(f"User prompt length: {len(user_prompt)} chars")

            response = self.client.messages.create(
                model=self.model,
                max_tokens=max_tokens,
                system=system_prompt,
                messages=[{"role": "user", "content": user_prompt}],
            )

            # Extract text from response
            content = response.content[0].text if response.content else ""

            logger.info(
                f"Claude API response received | "
                f"Model={response.model} | "
                f"Tokens={response.usage.input_tokens + response.usage.output_tokens}"
            )

            return content

        except APIError as e:
            logger.error(f"Claude API error: {e}")
            raise


# Global client instance
claude_client = ClaudeClient()
