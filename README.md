# Reddit Language Analysis Project

A research project analyzing language patterns and coded terms on Reddit using Natural Language Processing (NLP) techniques.

## Project Overview

This project aims to analyze language patterns and usage trends on Reddit through:
- Automated data collection using Reddit's API
- Natural Language Processing analysis
- Data visualization and statistical analysis
- Web-based results presentation

## Repository Structure

```
/scraper        - Reddit data collection scripts
/data           - Dataset storage (raw and processed)
/analysis       - NLP and statistical analysis notebooks
/visualization  - Data visualization scripts
/docs           - Project documentation and website
```

## Setup and Installation

1. Clone the repository:
```bash
git clone https://github.com/Lucasdoreac/reddit-language-analysis.git
cd reddit-language-analysis
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure Reddit API credentials:
- Copy `config.example.ini` to `config.ini`
- Add your Reddit API credentials

## Usage

1. Data Collection:
```bash
python scraper/collect_data.py
```

2. Run Analysis:
- Navigate to the `analysis` directory
- Run Jupyter notebooks in sequence

3. Generate Visualizations:
```bash
python visualization/generate_charts.py
```

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on how to submit pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Reddit API and PRAW documentation
- Research papers and references cited in documentation