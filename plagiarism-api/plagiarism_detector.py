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

# Finite Automaton State Representation for N-grams
def finite_automaton_match(input_text, ngrams):
    """
    Checks if an input text contains any of the given n-grams using a Finite Automaton (FA) approach.
    """
    matched_ngrams = []
    
    for ngram in ngrams:
        current_state = 0  # Start state
        ngram_words = ngram.split()  # Break the n-gram into words
        
        # Process each word in the input text
        for word in input_text.split():
            if word == ngram_words[current_state]:  # Match the current state with input word
                current_state += 1  # Transition to the next state
                if current_state == len(ngram_words):  # If all words in n-gram are matched
                    matched_ngrams.append(ngram)  # Successfully matched the n-gram
                    break  # No need to continue checking for this n-gram
            else:
                current_state = 0  # Reset to start state if words don't match
    
    return matched_ngrams


def check_plagiarism(input_text):
    input_text = clean_text(input_text)
    input_ngrams = get_ngrams(input_text)

    matched = []

    # Check for exact matches using FA
    for ngram in input_ngrams:
        matches = finite_automaton_match(input_text, reference_corpus)
        matched.extend(matches)
    
    # Check for similar matches using SequenceMatcher
    for reference in reference_corpus:
        ref = clean_text(reference)
        ref_ngrams = get_ngrams(ref)

        for input_ngram in input_ngrams:
            for ref_ngram in ref_ngrams:
                similarity = SequenceMatcher(None, input_ngram, ref_ngram).ratio()
                if similarity > 0.8:  # Tuneable threshold for similarity
                    matched.append(input_ngram)
                    break

    return list(set(matched))  # Remove duplicates