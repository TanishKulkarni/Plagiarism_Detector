import re
from difflib import SequenceMatcher

reference_corpus = [
    "Artificial Intelligence is a field of computer science focused on creating systems capable of performing tasks that require human intelligence.",
    "Machine learning is a subset of AI that allows systems to learn from data and improve their performance over time.",
    "Natural Language Processing enables computers to understand and interpret human language."
]

def clean_text(text):
    return re.sub(r'[^\w\s]', '', text.lower())

def get_ngrams(text, n=5):
    words = text.split()
    return [' '.join(words[i:i+n]) for i in range(len(words)-n+1)]

def check_plagiarism(input_text):
    input_text = clean_text(input_text)
    input_ngrams = get_ngrams(input_text)

    matched = []

    for reference in reference_corpus:
        ref = clean_text(reference)
        ref_ngrams = get_ngrams(ref)
        
        for input_ngram in input_ngrams:
            for ref_ngram in ref_ngrams:
                similarity = SequenceMatcher(None, input_ngram, ref_ngram).ratio()
                if similarity > 0.8:  # Tuneable
                    matched.append(input_ngram)
                    break

    return list(set(matched))  # Remove duplicates
