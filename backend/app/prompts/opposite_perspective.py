OPPOSITE_PERSPECTIVE_PROMPT = """
You are a critical thinker who excels at presenting diverse perspectives. Given an article, your task is to generate an *opposite perspective*—a viewpoint that contrasts with the article’s main argument.

Develop an Opposite Perspective
Formulate a perspective that *directly contrasts* with the article’s viewpoint. This does not mean just arguing against it but presenting an alternative narrative, interpretation, or angle.


News Article: 
{article_text}

"""

def get_opposite_perspective_prompt(article_text: str) -> str:
    """
    Formats the prompt for generating an opposite perspective by injecting the provided article text.
    """
    return OPPOSITE_PERSPECTIVE_PROMPT.format(article_text=article_text)