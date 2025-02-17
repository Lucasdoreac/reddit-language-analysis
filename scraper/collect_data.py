import praw
import pandas as pd
import json
import configparser
from datetime import datetime
from pathlib import Path

def load_config():
    """Load configuration from config.ini"""
    config = configparser.ConfigParser()
    config.read('config.ini')
    return config

def init_reddit(config):
    """Initialize Reddit API connection"""
    return praw.Reddit(
        client_id=config['reddit']['client_id'],
        client_secret=config['reddit']['client_secret'],
        user_agent=config['reddit']['user_agent']
    )

def collect_submissions(reddit, terms, subreddits=None, limit=1000):
    """Collect Reddit submissions containing specified terms"""
    data = []
    
    for term in terms:
        for submission in reddit.subreddit('all').search(term, limit=limit):
            if subreddits and submission.subreddit.display_name not in subreddits:
                continue
                
            data.append({
                'id': submission.id,
                'title': submission.title,
                'text': submission.selftext,
                'subreddit': submission.subreddit.display_name,
                'author': str(submission.author),
                'created_utc': datetime.fromtimestamp(submission.created_utc),
                'score': submission.score,
                'term': term
            })
    
    return pd.DataFrame(data)

def collect_comments(reddit, submission_ids, limit=1000):
    """Collect comments from specified submissions"""
    comments_data = []
    
    for submission_id in submission_ids:
        submission = reddit.submission(id=submission_id)
        submission.comments.replace_more(limit=None)
        
        for comment in submission.comments.list():
            comments_data.append({
                'comment_id': comment.id,
                'submission_id': submission_id,
                'text': comment.body,
                'author': str(comment.author),
                'created_utc': datetime.fromtimestamp(comment.created_utc),
                'score': comment.score,
                'parent_id': comment.parent_id
            })
            
            if len(comments_data) >= limit:
                break
    
    return pd.DataFrame(comments_data)

def main():
    # Load configuration
    config = load_config()
    
    # Initialize Reddit connection
    reddit = init_reddit(config)
    
    # Load terms to search for
    with open('data/terms.json', 'r') as f:
        terms = json.load(f)
    
    # Collect submissions
    submissions_df = collect_submissions(reddit, terms['terms'])
    
    # Collect comments from these submissions
    comments_df = collect_comments(reddit, submissions_df['id'].tolist())
    
    # Save to CSV
    timestamp = datetime.now().strftime("%Y%m%d")
    output_dir = Path(config['paths']['data_dir'])
    output_dir.mkdir(exist_ok=True)
    
    submissions_df.to_csv(output_dir / f'submissions_{timestamp}.csv', index=False)
    comments_df.to_csv(output_dir / f'comments_{timestamp}.csv', index=False)

if __name__ == '__main__':
    main()