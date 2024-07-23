# Genetic Disorder Prediction App

## Table of Content
  * [Overview](#overview)
  * [Demo](#demo)
  * [Motivation](#motivation)
  * [Installation](#installation)
  * [Technologies Used](#technologies-used)
  * [Directory Tree](#directory-tree)
  * [To Do](#to-do)
  * [Bug / Feature Request](#bug--feature-request)
  * [Team](#team)
  * [License](#license)
  * [Credits](#credits)


## Overview


## Installation

> [!Imp]
> ### Environment Variables
> Create a `.env` file in the backend directory to store your environment variables:
> ```
> MONGO_URI=mongodb://localhost:27017/genetic_disorder_db
> FLASK_APP=run.py
> FLASK_ENV=development
> ```

### 1. Clone the Repository

```sh
git clone https://github.com/Deveshu04/Genetic-Disorder-Prediction-App.git
cd Genetic-Disorder-Prediction-App
```

### 2. Set Up the Backend (Flask)

1. Create and activate a virtual environment:
    ```
    python3 -m venv env         # python -m venv env on Windows
    source venv/bin/activate    # .\venv\Scripts\activate on Windows
    ```

2. Install dependencies:
    ```
    pip install -r requirements.txt
    ```

3. Start MongoDB (Ensure MongoDB is installed and running on your system):
    ```
    mongod
    ```

4. Run the Flask server:
    ```
    flask run
    ````

### 3. Set Up the Frontend (Next.js)
1. Install dependencies:
    ```
    npm install
    ```

2. Start the Next.js development server:
    ```
    npm run dev
    ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.



## Technologies Used
- Node.js
- Next.js
- Tailwind CSS
- Flask
- Scikit-learn

## Directory Tree
```
.
├── app/
│   ├── globals.css
│   ├── favicon.ico
│   ├── layout.tsx
│   └── page.tsx
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── routes.py
│   │   ├── models/
│   │   │   ├── model.pkl
│   │   │   └── preprocess.py
│   │   ├── notebooks/
│   │   │   └── analysis.ipynb
│   ├── venv/
│   ├── requirements.txt
│   └── run.py
├── README.md
├── next.config.mjs
├── next-env.d.tx
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── .eslintrc.json
└── .gitignore
```